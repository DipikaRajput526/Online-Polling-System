from django.db import models
from django.conf import settings
from polls.models import Poll, Candidate
import uuid


class Vote(models.Model):
    """Vote model with one-vote-per-poll enforcement"""
    
    voter = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE, related_name='votes')
    poll = models.ForeignKey(Poll, on_delete=models.CASCADE, related_name='votes')
    candidate = models.ForeignKey(Candidate, on_delete=models.CASCADE, related_name='votes')
    receipt_id = models.CharField(max_length=36, unique=True, editable=False)
    voted_at = models.DateTimeField(auto_now_add=True)
    ip_address = models.GenericIPAddressField(null=True, blank=True)
    
    class Meta:
        db_table = 'votes'
        ordering = ['-voted_at']
        unique_together = [['voter', 'poll']]  # One vote per poll per voter
        indexes = [
            models.Index(fields=['receipt_id']),
            models.Index(fields=['voter', 'poll']),
        ]
    
    def __str__(self):
        return f"Vote by {self.voter.username} in {self.poll.title}"
    
    def save(self, *args, **kwargs):
        if not self.receipt_id:
            self.receipt_id = str(uuid.uuid4())
        super().save(*args, **kwargs)
