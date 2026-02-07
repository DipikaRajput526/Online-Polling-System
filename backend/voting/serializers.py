from rest_framework import serializers
from .models import Vote
from polls.models import Poll, Candidate


class VoteSerializer(serializers.ModelSerializer):
    """Serializer for Vote model"""
    poll_title = serializers.CharField(source='poll.title', read_only=True)
    candidate_name = serializers.CharField(source='candidate.name', read_only=True)
    
    class Meta:
        model = Vote
        fields = ('id', 'poll', 'poll_title', 'candidate', 'candidate_name', 
                  'receipt_id', 'voted_at')
        read_only_fields = ('id', 'receipt_id', 'voted_at')


class VoteCastSerializer(serializers.Serializer):
    """Serializer for casting a vote"""
    poll_id = serializers.IntegerField()
    candidate_id = serializers.IntegerField()
    
    def validate(self, attrs):
        poll_id = attrs.get('poll_id')
        candidate_id = attrs.get('candidate_id')
        
        # Check if poll exists
        try:
            poll = Poll.objects.get(id=poll_id)
        except Poll.DoesNotExist:
            raise serializers.ValidationError("Poll does not exist")
        
        # Check if poll is active
        if not poll.is_active():
            raise serializers.ValidationError("Poll is not active")
        
        # Check if candidate exists and belongs to this poll
        try:
            candidate = Candidate.objects.get(id=candidate_id, poll=poll)
        except Candidate.DoesNotExist:
            raise serializers.ValidationError("Candidate does not exist in this poll")
        
        attrs['poll'] = poll
        attrs['candidate'] = candidate
        return attrs


class VoteHistorySerializer(serializers.ModelSerializer):
    """Serializer for vote history"""
    poll_title = serializers.CharField(source='poll.title', read_only=True)
    candidate_name = serializers.CharField(source='candidate.name', read_only=True)
    
    class Meta:
        model = Vote
        fields = ('poll_title', 'candidate_name', 'receipt_id', 'voted_at')


class VoteReceiptSerializer(serializers.ModelSerializer):
    """Serializer for vote receipt"""
    poll_title = serializers.CharField(source='poll.title', read_only=True)
    candidate_name = serializers.CharField(source='candidate.name', read_only=True)
    voter_username = serializers.CharField(source='voter.username', read_only=True)
    
    class Meta:
        model = Vote
        fields = ('receipt_id', 'poll_title', 'candidate_name', 'voter_username', 'voted_at')
