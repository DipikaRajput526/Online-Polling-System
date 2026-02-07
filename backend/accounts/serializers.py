from rest_framework import serializers
from django.contrib.auth.password_validation import validate_password
from .models import User, OTP
from rest_framework_simplejwt.tokens import RefreshToken


class RegisterSerializer(serializers.ModelSerializer):
    """Serializer for user registration"""
    password = serializers.CharField(write_only=True, required=True, validators=[validate_password])
    password2 = serializers.CharField(write_only=True, required=True)
    aadhaar = serializers.CharField(write_only=True, required=False)
    
    class Meta:
        model = User
        fields = ('username', 'email', 'password', 'password2', 'phone', 'role', 'aadhaar')
        extra_kwargs = {
            'email': {'required': True},
            'phone': {'required': True},
        }
    
    def validate(self, attrs):
        if attrs['password'] != attrs['password2']:
            raise serializers.ValidationError({"password": "Password fields didn't match."})
        return attrs
    
    def create(self, validated_data):
        validated_data.pop('password2')
        aadhaar = validated_data.pop('aadhaar', None)
        
        user = User.objects.create_user(
            username=validated_data['username'],
            email=validated_data['email'],
            password=validated_data['password'],
            phone=validated_data['phone'],
            role=validated_data.get('role', 'voter')
        )
        
        if aadhaar:
            user.set_aadhaar(aadhaar)
            user.save()
        
        # Generate OTP
        otp_code = OTP.generate_otp()
        OTP.objects.create(user=user, otp_code=otp_code)
        
        return user


class LoginSerializer(serializers.Serializer):
    """Serializer for user login"""
    username = serializers.CharField()
    password = serializers.CharField(write_only=True)


class OTPSerializer(serializers.Serializer):
    """Serializer for OTP verification"""
    username = serializers.CharField()
    otp_code = serializers.CharField(max_length=6)


class UserProfileSerializer(serializers.ModelSerializer):
    """Serializer for user profile"""
    class Meta:
        model = User
        fields = ('id', 'username', 'email', 'phone', 'role', 'is_verified', 'is_blocked', 'created_at')
        read_only_fields = ('id', 'role', 'is_verified', 'is_blocked', 'created_at')


class AdminUserSerializer(serializers.ModelSerializer):
    """Serializer for admin user management"""
    class Meta:
        model = User
        fields = ('id', 'username', 'email', 'phone', 'role', 'is_verified', 'is_blocked', 'created_at', 'last_login')
        read_only_fields = ('id', 'created_at', 'last_login')


class UserTokenSerializer(serializers.Serializer):
    """Serializer for returning user data with tokens"""
    user = UserProfileSerializer()
    access = serializers.CharField()
    refresh = serializers.CharField()
