from rest_framework import status, generics
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated
from django.db import IntegrityError
from .models import Vote
from .serializers import (
    VoteCastSerializer, VoteHistorySerializer, VoteReceiptSerializer
)
from accounts.permissions import IsVoter, IsNotBlocked, IsVerified
from audit.models import AuditLog


class CastVoteView(APIView):
    """Cast vote (Voter only)"""
    permission_classes = [IsAuthenticated, IsVoter, IsVerified, IsNotBlocked]
    
    def post(self, request):
        serializer = VoteCastSerializer(data=request.data)
        if serializer.is_valid():
            poll = serializer.validated_data['poll']
            candidate = serializer.validated_data['candidate']
            
            # Check if user already voted in this poll
            if Vote.objects.filter(voter=request.user, poll=poll).exists():
                return Response({
                    'error': 'You have already voted in this poll'
                }, status=status.HTTP_400_BAD_REQUEST)
            
            # Get IP address
            x_forwarded_for = request.META.get('HTTP_X_FORWARDED_FOR')
            if x_forwarded_for:
                ip_address = x_forwarded_for.split(',')[0]
            else:
                ip_address = request.META.get('REMOTE_ADDR')
            
            # Create vote
            try:
                vote = Vote.objects.create(
                    voter=request.user,
                    poll=poll,
                    candidate=candidate,
                    ip_address=ip_address
                )
            except IntegrityError:
                return Response({
                    'error': 'You have already voted in this poll'
                }, status=status.HTTP_400_BAD_REQUEST)
            
            # Log action
            AuditLog.log_action(
                request.user, 
                'vote_cast', 
                'vote', 
                vote.id, 
                request,
                details={'poll_id': poll.id, 'candidate_id': candidate.id}
            )
            
            return Response({
                'message': 'Vote cast successfully',
                'receipt_id': vote.receipt_id,
                'poll_title': poll.title,
                'candidate_name': candidate.name,
                'voted_at': vote.voted_at
            }, status=status.HTTP_201_CREATED)
        
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


class VoteHistoryView(generics.ListAPIView):
    """Get voter's voting history"""
    permission_classes = [IsAuthenticated, IsVoter]
    serializer_class = VoteHistorySerializer
    
    def get_queryset(self):
        return Vote.objects.filter(voter=self.request.user)


class VoteReceiptView(APIView):
    """Get vote receipt by receipt ID"""
    permission_classes = [IsAuthenticated]
    
    def get(self, request, receipt_id):
        try:
            vote = Vote.objects.get(receipt_id=receipt_id)
        except Vote.DoesNotExist:
            return Response({
                'error': 'Receipt not found'
            }, status=status.HTTP_404_NOT_FOUND)
        
        # Only allow voter to see their own receipt or admin to see any
        if request.user.role != 'admin' and vote.voter != request.user:
            return Response({
                'error': 'You do not have permission to view this receipt'
            }, status=status.HTTP_403_FORBIDDEN)
        
        serializer = VoteReceiptSerializer(vote)
        return Response(serializer.data, status=status.HTTP_200_OK)
