from rest_framework import serializers
from rest_framework.validators import UniqueValidator
from .models import Flashcard, Deck, CustomUser, UserProgress, ClearedFlashcard, Bunpo, ClearedBunpo

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

class UserProfileSerializer(serializers.ModelSerializer):
    profile_image = serializers.ImageField(use_url=True)
    class Meta:
        model = CustomUser
        fields = ["id", "username", "email", "phone", "bio", "profile_image"]
        read_only_fields = ["id", "username"]

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

class ClearedFlashcardSerializer(serializers.ModelSerializer):
    flashcard = FlashcardSerializer()
    class Meta:
        model = ClearedFlashcard
        fields = ['id', 'flashcard']

class UserProgressSerializer(serializers.ModelSerializer):
    cleared_flashcards = ClearedFlashcardSerializer(many=True)

    class Meta:
        model = UserProgress
        fields = ['id', 'date', 'cleared_flashcards']

    def create(self, validated_data):
        cleared_data = validated_data.pop('cleared_flashcards', [])
        progress = UserProgress.objects.create(**validated_data)
        for item in cleared_data:
            ClearedFlashcard.objects.create(progress=progress, **item)
        return progress

class BunpoSerializer(serializers.ModelSerializer):
    class Meta:
        model = Bunpo
        fields = ['id', 'jlpt_level', 'question', 'options', 'correct']

class ClearedBunpoSerializer(serializers.ModelSerializer):
    bunpo = BunpoSerializer()

    class Meta:
        model = ClearedBunpo
        fields = ['id', 'bunpo']


