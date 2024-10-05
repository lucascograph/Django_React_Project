from rest_framework import serializers
from rest_framework.validators import UniqueValidator
from .models import Flashcard, Deck, CustomUser

class UserSerializer(serializers.ModelSerializer):

    email = serializers.EmailField(
        required=True,
        validators=[UniqueValidator(queryset=CustomUser.objects.all(), message="A user with that email already exists.")],
        help_text=("Email has to be unique")
    )

    class Meta:
        model = CustomUser
        fields = ["id", "username", "email", "password"]
        extra_kwargs = {"password": {"write_only": True}}

    def create(self, validated_data):
        user = CustomUser.objects.create_user(**validated_data)
        return user

class FlashcardSerializer(serializers.ModelSerializer):
    class Meta:
        model = Flashcard
        fields = ["id", "author", "front", "back", "deck", "date_created"]
        extra_kwargs = {"author": {"read_only": True}}

class DeckSerializer(serializers.ModelSerializer):
    class Meta:
        model = Deck
        fields = ["id", "name", "creator", "date_created", "code"]
        extra_kwargs = {"creator": {"read_only": True}}

    def create(self, validated_data):
        validated_data['creator'] = self.context['request'].user
        return super().create(validated_data)