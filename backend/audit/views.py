from rest_framework import generics
from rest_framework.permissions import IsAuthenticated
from .models import AuditLog
from .serializers import AuditLogSerializer
from accounts.permissions import IsAdmin


class AuditLogListView(generics.ListAPIView):
    """List audit logs (Admin only)"""
    permission_classes = [IsAuthenticated, IsAdmin]
    serializer_class = AuditLogSerializer
    queryset = AuditLog.objects.all()
    
    def get_queryset(self):
        queryset = AuditLog.objects.all()
        
        # Filter by user if provided
        user_id = self.request.query_params.get('user_id')
        if user_id:
            queryset = queryset.filter(user_id=user_id)
        
        # Filter by action if provided
        action = self.request.query_params.get('action')
        if action:
            queryset = queryset.filter(action=action)
        
        # Filter by date range if provided
        start_date = self.request.query_params.get('start_date')
        end_date = self.request.query_params.get('end_date')
        if start_date:
            queryset = queryset.filter(timestamp__gte=start_date)
        if end_date:
            queryset = queryset.filter(timestamp__lte=end_date)
        
        return queryset
