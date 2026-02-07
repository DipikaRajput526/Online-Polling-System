from django.db import models
from django.conf import settings


class AuditLog(models.Model):
    """Audit log model for tracking user and admin actions"""
    
    ACTION_CHOICES = [
        ('register', 'User Registration'),
        ('login', 'User Login'),
        ('logout', 'User Logout'),
        ('verify_otp', 'OTP Verification'),
        ('vote_cast', 'Vote Cast'),
        ('poll_create', 'Poll Created'),
        ('poll_update', 'Poll Updated'),
        ('poll_delete', 'Poll Deleted'),
        ('poll_publish', 'Poll Published'),
        ('candidate_add', 'Candidate Added'),
        ('candidate_remove', 'Candidate Removed'),
        ('user_block', 'User Blocked'),
        ('user_unblock', 'User Unblocked'),
        ('results_publish', 'Results Published'),
    ]
    
    user = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.SET_NULL, null=True, related_name='audit_logs')
    action = models.CharField(max_length=50, choices=ACTION_CHOICES)
    entity_type = models.CharField(max_length=50, null=True, blank=True)  # e.g., 'poll', 'vote', 'user'
    entity_id = models.IntegerField(null=True, blank=True)
    ip_address = models.GenericIPAddressField(null=True, blank=True)
    user_agent = models.TextField(null=True, blank=True)
    timestamp = models.DateTimeField(auto_now_add=True)
    details = models.JSONField(null=True, blank=True)  # Additional context
    
    class Meta:
        db_table = 'audit_logs'
        ordering = ['-timestamp']
        indexes = [
            models.Index(fields=['user', 'timestamp']),
            models.Index(fields=['action', 'timestamp']),
            models.Index(fields=['entity_type', 'entity_id']),
        ]
    
    def __str__(self):
        user_str = self.user.username if self.user else 'Anonymous'
        return f"{user_str} - {self.get_action_display()} at {self.timestamp}"
    
    @staticmethod
    def log_action(user, action, entity_type=None, entity_id=None, request=None, details=None):
        """Helper method to create audit log entries"""
        ip_address = None
        user_agent = None
        
        if request:
            # Get IP address
            x_forwarded_for = request.META.get('HTTP_X_FORWARDED_FOR')
            if x_forwarded_for:
                ip_address = x_forwarded_for.split(',')[0]
            else:
                ip_address = request.META.get('REMOTE_ADDR')
            
            # Get user agent
            user_agent = request.META.get('HTTP_USER_AGENT', '')
        
        return AuditLog.objects.create(
            user=user,
            action=action,
            entity_type=entity_type,
            entity_id=entity_id,
            ip_address=ip_address,
            user_agent=user_agent,
            details=details
        )
