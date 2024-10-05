from django.contrib.auth.models import AbstractUser
from django.db import models
import uuid


class Deck(models.Model):
    creator = models.CharField(max_length=100)
    name = models.CharField(max_length=100)
    code = models.UUIDField(default=uuid.uuid4, editable=False, unique=True)
    date_created = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return self.name

class CustomUser(AbstractUser):
    decks = models.ManyToManyField(Deck, blank=True, related_name="users")

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

