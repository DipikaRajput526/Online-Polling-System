from django.contrib.auth.models import AbstractUser
from django.db import models
from django.utils import timezone
import hashlib
import random
from datetime import timedelta


class User(AbstractUser):
    """Custom User model with role-based access and Aadhaar verification"""
    
    ROLE_CHOICES = [
        ('voter', 'Voter'),
        ('admin', 'Admin'),
    ]
    
    role = models.CharField(max_length=10, choices=ROLE_CHOICES, default='voter')
    aadhaar_hash = models.CharField(max_length=64, unique=True, null=True, blank=True)
    phone = models.CharField(max_length=15, unique=True)
    is_blocked = models.BooleanField(default=False)
    is_verified = models.BooleanField(default=False)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
    
    class Meta:
        db_table = 'users'
        ordering = ['-created_at']
    
    def __str__(self):
        return f"{self.username} ({self.role})"
    
    def set_aadhaar(self, aadhaar_number):
        """Hash and store Aadhaar number"""
        self.aadhaar_hash = hashlib.sha256(str(aadhaar_number).encode()).hexdigest()
    
    def verify_aadhaar(self, aadhaar_number):
        """Verify Aadhaar number against stored hash"""
        return self.aadhaar_hash == hashlib.sha256(str(aadhaar_number).encode()).hexdigest()


class OTP(models.Model):
    """OTP model for user verification"""
    
    user = models.ForeignKey(User, on_delete=models.CASCADE, related_name='otps')
    otp_code = models.CharField(max_length=6)
    created_at = models.DateTimeField(auto_now_add=True)
    expires_at = models.DateTimeField()
    is_used = models.BooleanField(default=False)
    
    class Meta:
        db_table = 'otps'
        ordering = ['-created_at']
    
    def __str__(self):
        return f"OTP for {self.user.username} - {self.otp_code}"
    
    def save(self, *args, **kwargs):
        if not self.expires_at:
            self.expires_at = timezone.now() + timedelta(minutes=10)
        super().save(*args, **kwargs)
    
    def is_valid(self):
        """Check if OTP is still valid"""
        return not self.is_used and timezone.now() < self.expires_at
    
    @staticmethod
    def generate_otp():
        """Generate a 6-digit OTP"""
        return str(random.randint(100000, 999999))
