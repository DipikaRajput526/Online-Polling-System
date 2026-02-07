from rest_framework import status, generics
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.permissions import AllowAny, IsAuthenticated
from rest_framework_simplejwt.tokens import RefreshToken
from django.contrib.auth import authenticate
from .models import User, OTP
from .serializers import (
    RegisterSerializer, LoginSerializer, OTPSerializer,
    UserProfileSerializer, AdminUserSerializer
)
from .permissions import IsAdmin
from audit.models import AuditLog


class RegisterView(APIView):
    """User registration endpoint"""
    permission_classes = [AllowAny]
    
    def post(self, request):
        serializer = RegisterSerializer(data=request.data)
        if serializer.is_valid():
            user = serializer.save()
            
            # Get the OTP that was created
            otp = OTP.objects.filter(user=user, is_used=False).latest('created_at')
            
            # Log action
            AuditLog.log_action(user, 'register', 'user', user.id, request)
            
            return Response({
                'message': 'User registered successfully. Please verify OTP.',
                'username': user.username,
                'otp': otp.otp_code  # In production, send via SMS/Email
            }, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


class LoginView(APIView):
    """User login endpoint"""
    permission_classes = [AllowAny]
    
    def post(self, request):
        serializer = LoginSerializer(data=request.data)
        if serializer.is_valid():
            username = serializer.validated_data['username']
            password = serializer.validated_data['password']
            
            user = authenticate(username=username, password=password)
            
            if user is None:
                return Response({
                    'error': 'Invalid credentials'
                }, status=status.HTTP_401_UNAUTHORIZED)
            
            if user.is_blocked:
                return Response({
                    'error': 'Your account has been blocked'
                }, status=status.HTTP_403_FORBIDDEN)
            
            if not user.is_verified:
                return Response({
                    'error': 'Please verify your account with OTP first'
                }, status=status.HTTP_403_FORBIDDEN)
            
            # Generate tokens
            refresh = RefreshToken.for_user(user)
            
            # Log action
            AuditLog.log_action(user, 'login', 'user', user.id, request)
            
            return Response({
                'user': UserProfileSerializer(user).data,
                'access': str(refresh.access_token),
                'refresh': str(refresh)
            }, status=status.HTTP_200_OK)
        
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


class VerifyOTPView(APIView):
    """OTP verification endpoint"""
    permission_classes = [AllowAny]
    
    def post(self, request):
        serializer = OTPSerializer(data=request.data)
        if serializer.is_valid():
            username = serializer.validated_data['username']
            otp_code = serializer.validated_data['otp_code']
            
            try:
                user = User.objects.get(username=username)
            except User.DoesNotExist:
                return Response({
                    'error': 'User not found'
                }, status=status.HTTP_404_NOT_FOUND)
            
            # Get latest unused OTP
            try:
                otp = OTP.objects.filter(
                    user=user,
                    otp_code=otp_code,
                    is_used=False
                ).latest('created_at')
            except OTP.DoesNotExist:
                return Response({
                    'error': 'Invalid OTP'
                }, status=status.HTTP_400_BAD_REQUEST)
            
            if not otp.is_valid():
                return Response({
                    'error': 'OTP has expired'
                }, status=status.HTTP_400_BAD_REQUEST)
            
            # Mark OTP as used and verify user
            otp.is_used = True
            otp.save()
            
            user.is_verified = True
            user.save()
            
            # Generate tokens
            refresh = RefreshToken.for_user(user)
            
            # Log action
            AuditLog.log_action(user, 'verify_otp', 'user', user.id, request)
            
            return Response({
                'message': 'OTP verified successfully',
                'user': UserProfileSerializer(user).data,
                'access': str(refresh.access_token),
                'refresh': str(refresh)
            }, status=status.HTTP_200_OK)
        
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


class ProfileView(generics.RetrieveUpdateAPIView):
    """Get and update user profile"""
    permission_classes = [IsAuthenticated]
    serializer_class = UserProfileSerializer
    
    def get_object(self):
        return self.request.user


class AdminUserListView(generics.ListAPIView):
    """List all users (Admin only)"""
    permission_classes = [IsAuthenticated, IsAdmin]
    serializer_class = AdminUserSerializer
    queryset = User.objects.all()


class AdminBlockUserView(APIView):
    """Block/Unblock user (Admin only)"""
    permission_classes = [IsAuthenticated, IsAdmin]
    
    def put(self, request, user_id):
        try:
            user = User.objects.get(id=user_id)
        except User.DoesNotExist:
            return Response({
                'error': 'User not found'
            }, status=status.HTTP_404_NOT_FOUND)
        
        # Toggle block status
        user.is_blocked = not user.is_blocked
        user.save()
        
        # Log action
        action = 'user_block' if user.is_blocked else 'user_unblock'
        AuditLog.log_action(request.user, action, 'user', user.id, request)
        
        return Response({
            'message': f'User {"blocked" if user.is_blocked else "unblocked"} successfully',
            'user': AdminUserSerializer(user).data
        }, status=status.HTTP_200_OK)
