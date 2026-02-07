from rest_framework import serializers
from .models import Result
from polls.serializers import CandidateSerializer


class ResultSerializer(serializers.ModelSerializer):
    """Serializer for Result model"""
    candidate = CandidateSerializer(read_only=True)
    poll_title = serializers.CharField(source='poll.title', read_only=True)
    
    class Meta:
        model = Result
        fields = ('id', 'poll', 'poll_title', 'candidate', 'vote_count', 
                  'percentage', 'is_winner', 'published_at', 'updated_at')
        read_only_fields = ('id', 'vote_count', 'percentage', 'is_winner', 
                            'published_at', 'updated_at')


class LiveResultSerializer(serializers.ModelSerializer):
    """Serializer for live results"""
    candidate_name = serializers.CharField(source='candidate.name', read_only=True)
    candidate_party = serializers.CharField(source='candidate.party', read_only=True)
    
    class Meta:
        model = Result
        fields = ('candidate_name', 'candidate_party', 'vote_count', 'percentage')


class FinalResultSerializer(serializers.ModelSerializer):
    """Serializer for final results"""
    candidate = CandidateSerializer(read_only=True)
    poll_title = serializers.CharField(source='poll.title', read_only=True)
    
    class Meta:
        model = Result
        fields = ('poll_title', 'candidate', 'vote_count', 'percentage', 
                  'is_winner', 'published_at')
