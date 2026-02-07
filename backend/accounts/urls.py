from django.urls import path
from .views import (
    RegisterView, LoginView, VerifyOTPView, ProfileView,
    AdminUserListView, AdminBlockUserView
)

urlpatterns = [
    # Authentication
    path('auth/register', RegisterView.as_view(), name='register'),
    path('auth/login', LoginView.as_view(), name='login'),
    path('auth/verify-otp', VerifyOTPView.as_view(), name='verify-otp'),
    path('auth/profile', ProfileView.as_view(), name='profile'),
    
    # Admin user management
    path('admin/users', AdminUserListView.as_view(), name='admin-users'),
    path('admin/users/<int:user_id>/block', AdminBlockUserView.as_view(), name='admin-block-user'),
]
