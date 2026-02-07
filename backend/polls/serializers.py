from rest_framework import serializers
from .models import Poll, Candidate
from django.utils import timezone


class CandidateSerializer(serializers.ModelSerializer):
    """Serializer for Candidate model"""
    class Meta:
        model = Candidate
        fields = ('id', 'name', 'party', 'symbol', 'description', 'order', 'created_at')
        read_only_fields = ('id', 'created_at')


class PollSerializer(serializers.ModelSerializer):
    """Serializer for Poll model with nested candidates"""
    candidates = CandidateSerializer(many=True, read_only=True)
    created_by_username = serializers.CharField(source='created_by.username', read_only=True)
    is_active = serializers.SerializerMethodField()
    has_ended = serializers.SerializerMethodField()
    
    class Meta:
        model = Poll
        fields = ('id', 'title', 'description', 'created_by', 'created_by_username', 
                  'start_date', 'end_date', 'is_published', 'is_active', 'has_ended',
                  'candidates', 'created_at', 'updated_at')
        read_only_fields = ('id', 'created_by', 'created_at', 'updated_at')
    
    def get_is_active(self, obj):
        return obj.is_active()
    
    def get_has_ended(self, obj):
        return obj.has_ended()


class PollCreateSerializer(serializers.ModelSerializer):
    """Serializer for creating polls"""
    class Meta:
        model = Poll
        fields = ('title', 'description', 'start_date', 'end_date')
    
    def validate(self, attrs):
        if attrs['start_date'] >= attrs['end_date']:
            raise serializers.ValidationError("End date must be after start date")
        if attrs['start_date'] < timezone.now():
            raise serializers.ValidationError("Start date cannot be in the past")
        return attrs


class PollUpdateSerializer(serializers.ModelSerializer):
    """Serializer for updating polls"""
    class Meta:
        model = Poll
        fields = ('title', 'description', 'start_date', 'end_date', 'is_published')
    
    def validate(self, attrs):
        if 'start_date' in attrs and 'end_date' in attrs:
            if attrs['start_date'] >= attrs['end_date']:
                raise serializers.ValidationError("End date must be after start date")
        return attrs


class CandidateCreateSerializer(serializers.ModelSerializer):
    """Serializer for creating candidates"""
    class Meta:
        model = Candidate
        fields = ('name', 'party', 'symbol', 'description', 'order')
