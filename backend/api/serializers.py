from django.contrib.auth.models import User
from rest_framework import serializers
from rest_framework.validators import UniqueValidator
from .models import FlashCard

class UserSerializer(serializers.ModelSerializer):

    email = serializers.EmailField(
        required=True,
        validators=[UniqueValidator(queryset=User.objects.all(), message="A user with that email already exists.")],
        help_text=("Email has to be unique")
    )

    class Meta:
        model = User
        fields = ["id", "username", "email", "password"]
        extra_kwargs = {"password": {"write_only": True}}

    def create(self, validated_data):
        user = User.objects.create_user(**validated_data)
        return user


class FlashCardSerializer(serializers.ModelSerializer):
    class Meta:
        model = FlashCard
        fields = ["id", "author", "front", "back", "deck", "date_created"]
        extra_kwargs = {"author": {"read_only": True}}