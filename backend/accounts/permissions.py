from rest_framework.permissions import BasePermission


class IsVoter(BasePermission):
    """
    Permission class to check if user is a Voter
    """
    def has_permission(self, request, view):
        return request.user and request.user.is_authenticated and request.user.role == 'voter'


class IsAdmin(BasePermission):
    """
    Permission class to check if user is an Admin
    """
    def has_permission(self, request, view):
        return request.user and request.user.is_authenticated and request.user.role == 'admin'


class IsVerified(BasePermission):
    """
    Permission class to check if user is verified
    """
    def has_permission(self, request, view):
        return request.user and request.user.is_authenticated and request.user.is_verified


class IsNotBlocked(BasePermission):
    """
    Permission class to check if user is not blocked
    """
    def has_permission(self, request, view):
        return request.user and request.user.is_authenticated and not request.user.is_blocked
