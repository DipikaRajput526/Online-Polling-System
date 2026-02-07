from rest_framework import status, generics
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated
from .models import Poll, Candidate
from .serializers import (
    PollSerializer, PollCreateSerializer, PollUpdateSerializer,
    CandidateSerializer, CandidateCreateSerializer
)
from accounts.permissions import IsAdmin, IsVoter
from audit.models import AuditLog


class PollListView(generics.ListAPIView):
    """List polls - Active polls for voters, all polls for admins"""
    permission_classes = [IsAuthenticated]
    serializer_class = PollSerializer
    
    def get_queryset(self):
        user = self.request.user
        if user.role == 'admin':
            return Poll.objects.all()
        else:
            # Voters see only published polls
            return Poll.objects.filter(is_published=True)


class PollDetailView(generics.RetrieveAPIView):
    """Get poll details"""
    permission_classes = [IsAuthenticated]
    serializer_class = PollSerializer
    queryset = Poll.objects.all()


class PollCreateView(APIView):
    """Create poll (Admin only)"""
    permission_classes = [IsAuthenticated, IsAdmin]
    
    def post(self, request):
        serializer = PollCreateSerializer(data=request.data)
        if serializer.is_valid():
            poll = serializer.save(created_by=request.user)
            
            # Log action
            AuditLog.log_action(request.user, 'poll_create', 'poll', poll.id, request)
            
            return Response({
                'message': 'Poll created successfully',
                'poll': PollSerializer(poll).data
            }, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


class PollUpdateView(APIView):
    """Update poll (Admin only)"""
    permission_classes = [IsAuthenticated, IsAdmin]
    
    def put(self, request, poll_id):
        try:
            poll = Poll.objects.get(id=poll_id)
        except Poll.DoesNotExist:
            return Response({
                'error': 'Poll not found'
            }, status=status.HTTP_404_NOT_FOUND)
        
        # Don't allow updates if poll has started
        if poll.has_started():
            return Response({
                'error': 'Cannot update poll after it has started'
            }, status=status.HTTP_400_BAD_REQUEST)
        
        serializer = PollUpdateSerializer(poll, data=request.data, partial=True)
        if serializer.is_valid():
            poll = serializer.save()
            
            # Log action
            AuditLog.log_action(request.user, 'poll_update', 'poll', poll.id, request)
            
            return Response({
                'message': 'Poll updated successfully',
                'poll': PollSerializer(poll).data
            }, status=status.HTTP_200_OK)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


class PollDeleteView(APIView):
    """Delete poll (Admin only)"""
    permission_classes = [IsAuthenticated, IsAdmin]
    
    def delete(self, request, poll_id):
        try:
            poll = Poll.objects.get(id=poll_id)
        except Poll.DoesNotExist:
            return Response({
                'error': 'Poll not found'
            }, status=status.HTTP_404_NOT_FOUND)
        
        # Don't allow deletion if poll has started
        if poll.has_started():
            return Response({
                'error': 'Cannot delete poll after it has started'
            }, status=status.HTTP_400_BAD_REQUEST)
        
        poll_id = poll.id
        poll.delete()
        
        # Log action
        AuditLog.log_action(request.user, 'poll_delete', 'poll', poll_id, request)
        
        return Response({
            'message': 'Poll deleted successfully'
        }, status=status.HTTP_200_OK)


class PollPublishView(APIView):
    """Publish/Unpublish poll (Admin only)"""
    permission_classes = [IsAuthenticated, IsAdmin]
    
    def post(self, request, poll_id):
        try:
            poll = Poll.objects.get(id=poll_id)
        except Poll.DoesNotExist:
            return Response({
                'error': 'Poll not found'
            }, status=status.HTTP_404_NOT_FOUND)
        
        # Toggle publish status
        poll.is_published = not poll.is_published
        poll.save()
        
        # Log action
        AuditLog.log_action(request.user, 'poll_publish', 'poll', poll.id, request)
        
        return Response({
            'message': f'Poll {"published" if poll.is_published else "unpublished"} successfully',
            'poll': PollSerializer(poll).data
        }, status=status.HTTP_200_OK)


class CandidateAddView(APIView):
    """Add candidate to poll (Admin only)"""
    permission_classes = [IsAuthenticated, IsAdmin]
    
    def post(self, request, poll_id):
        try:
            poll = Poll.objects.get(id=poll_id)
        except Poll.DoesNotExist:
            return Response({
                'error': 'Poll not found'
            }, status=status.HTTP_404_NOT_FOUND)
        
        # Don't allow adding candidates if poll has started
        if poll.has_started():
            return Response({
                'error': 'Cannot add candidates after poll has started'
            }, status=status.HTTP_400_BAD_REQUEST)
        
        serializer = CandidateCreateSerializer(data=request.data)
        if serializer.is_valid():
            candidate = serializer.save(poll=poll)
            
            # Log action
            AuditLog.log_action(request.user, 'candidate_add', 'candidate', candidate.id, request)
            
            return Response({
                'message': 'Candidate added successfully',
                'candidate': CandidateSerializer(candidate).data
            }, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


class CandidateRemoveView(APIView):
    """Remove candidate from poll (Admin only)"""
    permission_classes = [IsAuthenticated, IsAdmin]
    
    def delete(self, request, candidate_id):
        try:
            candidate = Candidate.objects.get(id=candidate_id)
        except Candidate.DoesNotExist:
            return Response({
                'error': 'Candidate not found'
            }, status=status.HTTP_404_NOT_FOUND)
        
        # Don't allow removal if poll has started
        if candidate.poll.has_started():
            return Response({
                'error': 'Cannot remove candidates after poll has started'
            }, status=status.HTTP_400_BAD_REQUEST)
        
        candidate_id = candidate.id
        candidate.delete()
        
        # Log action
        AuditLog.log_action(request.user, 'candidate_remove', 'candidate', candidate_id, request)
        
        return Response({
            'message': 'Candidate removed successfully'
        }, status=status.HTTP_200_OK)
