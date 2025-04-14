from django.contrib.auth.models import AbstractUser
from django.utils import timezone
from django.db import models
import uuid


def user_directory_path(instance, filename):
    return f"profile_pics/user_{instance.id}/{filename}"

class Deck(models.Model):
    creator = models.CharField(max_length=100)
    name = models.CharField(max_length=100)
    code = models.UUIDField(default=uuid.uuid4, editable=False, unique=True)
    date_created = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return self.name

class CustomUser(AbstractUser):
    decks = models.ManyToManyField(Deck, blank=True, related_name="users")
    profile_image = models.ImageField(upload_to=user_directory_path, blank=True, null=True)
    bio = models.TextField(blank=True, null=True)
    phone = models.CharField(max_length=20, blank=True, null=True)

    def __str__(self):
        return self.username



class Flashcard(models.Model):
    author = models.ForeignKey(CustomUser, on_delete=models.CASCADE, related_name="cards")
    deck = models.ForeignKey(Deck, on_delete=models.CASCADE, related_name="flashcards")
    front = models.CharField(max_length=150)
    back = models.CharField(max_length=150)
    date_created = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return self.front

class UserProgress(models.Model):
    user = models.ForeignKey(CustomUser, on_delete=models.CASCADE, related_name='progress')
    date = models.DateField(default=timezone.now)

    class Meta:
        unique_together = ('user', 'date')

class ClearedFlashcard(models.Model):
    progress = models.ForeignKey(UserProgress, on_delete=models.CASCADE, related_name='cleared_flashcards')
    flashcard = models.ForeignKey(Flashcard, on_delete=models.CASCADE)
    
    class Meta:
        unique_together = ('progress', 'flashcard') 
