from rest_framework import status, generics
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated
from django.utils import timezone
from .models import Result
from polls.models import Poll
from .serializers import ResultSerializer, LiveResultSerializer, FinalResultSerializer
from accounts.permissions import IsAdmin


class LiveResultsView(generics.ListAPIView):
    """Get live results for all active polls"""
    permission_classes = [IsAuthenticated]
    serializer_class = ResultSerializer
    
    def get_queryset(self):
        # Get all polls that have ended
        ended_polls = Poll.objects.filter(end_date__lt=timezone.now())
        return Result.objects.filter(poll__in=ended_polls)


class FinalResultsView(generics.ListAPIView):
    """Get final published results"""
    permission_classes = [IsAuthenticated]
    serializer_class = FinalResultSerializer
    
    def get_queryset(self):
        return Result.objects.filter(published_at__isnull=False)


class PollResultsView(APIView):
    """Get results for a specific poll"""
    permission_classes = [IsAuthenticated]
    
    def get(self, request, poll_id):
        try:
            poll = Poll.objects.get(id=poll_id)
        except Poll.DoesNotExist:
            return Response({
                'error': 'Poll not found'
            }, status=status.HTTP_404_NOT_FOUND)
        
        # Check if poll has ended
        if not poll.has_ended():
            return Response({
                'error': 'Results not available yet. Poll is still active.'
            }, status=status.HTTP_400_BAD_REQUEST)
        
        # Calculate results if not already calculated
        results = Result.objects.filter(poll=poll)
        if not results.exists():
            Result.calculate_results(poll)
            results = Result.objects.filter(poll=poll)
        
        serializer = ResultSerializer(results, many=True)
        return Response({
            'poll_id': poll.id,
            'poll_title': poll.title,
            'results': serializer.data
        }, status=status.HTTP_200_OK)


class PublishResultsView(APIView):
    """Publish final results for a poll (Admin only)"""
    permission_classes = [IsAuthenticated, IsAdmin]
    
    def post(self, request):
        poll_id = request.data.get('poll_id')
        
        if not poll_id:
            return Response({
                'error': 'poll_id is required'
            }, status=status.HTTP_400_BAD_REQUEST)
        
        try:
            poll = Poll.objects.get(id=poll_id)
        except Poll.DoesNotExist:
            return Response({
                'error': 'Poll not found'
            }, status=status.HTTP_404_NOT_FOUND)
        
        # Check if poll has ended
        if not poll.has_ended():
            return Response({
                'error': 'Cannot publish results. Poll is still active.'
            }, status=status.HTTP_400_BAD_REQUEST)
        
        # Calculate and publish results
        Result.calculate_results(poll)
        results = Result.objects.filter(poll=poll)
        
        # Mark as published
        now = timezone.now()
        results.update(published_at=now)
        
        # Log action
        from audit.models import AuditLog
        AuditLog.log_action(
            request.user, 
            'results_publish', 
            'poll', 
            poll.id, 
            request
        )
        
        return Response({
            'message': 'Results published successfully',
            'poll_id': poll.id,
            'poll_title': poll.title,
            'published_at': now
        }, status=status.HTTP_200_OK)
