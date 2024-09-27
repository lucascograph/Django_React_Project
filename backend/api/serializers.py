from rest_framework import serializers
from .models import CustomUser  

class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = CustomUser
        fields = ('id', 'username', 'email', 'password')
        extra_kwargs = {
            'password': {'write_only': True}
        }

    def create(self, validated_data):
        user = CustomUser(**validated_data)
        user.set_password(validated_data['password'])  # Hash the password
        user.save()
        return user
    

class RegisterSerializer(serializers.ModelSerializer):
    password = serializers.CharField(write_only=True)

    class Meta:
        model = CustomUser
        fields = ['id', 'username', 'email', 'password']  # Include the fields you want for registration

    def create(self, validated_data):
        user = CustomUser(
            email=validated_data['email'],
            username=validated_data['username'],
        )
        user.set_password(validated_data['password'])  # Set the hashed password
        user.save()
        return user


