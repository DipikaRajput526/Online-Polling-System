from django.db import models
from django.conf import settings
from django.utils import timezone


class Poll(models.Model):
    """Poll model for managing elections/polls"""
    
    title = models.CharField(max_length=255)
    description = models.TextField()
    created_by = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE, related_name='created_polls')
    start_date = models.DateTimeField()
    end_date = models.DateTimeField()
    is_published = models.BooleanField(default=False)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
    
    class Meta:
        db_table = 'polls'
        ordering = ['-created_at']
    
    def __str__(self):
        return self.title
    
    def is_active(self):
        """Check if poll is currently active"""
        now = timezone.now()
        return self.is_published and self.start_date <= now <= self.end_date
    
    def has_ended(self):
        """Check if poll has ended"""
        return timezone.now() > self.end_date
    
    def has_started(self):
        """Check if poll has started"""
        return timezone.now() >= self.start_date


class Candidate(models.Model):
    """Candidate/Option model for polls"""
    
    poll = models.ForeignKey(Poll, on_delete=models.CASCADE, related_name='candidates')
    name = models.CharField(max_length=255)
    party = models.CharField(max_length=255, blank=True, null=True)
    symbol = models.CharField(max_length=100, blank=True, null=True)
    description = models.TextField(blank=True, null=True)
    order = models.IntegerField(default=0)
    created_at = models.DateTimeField(auto_now_add=True)
    
    class Meta:
        db_table = 'candidates'
        ordering = ['poll', 'order', 'name']
        unique_together = [['poll', 'name']]
    
    def __str__(self):
        return f"{self.name} - {self.poll.title}"
