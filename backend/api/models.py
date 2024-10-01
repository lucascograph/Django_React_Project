from django.contrib.auth.models import User
from django.db import models

class FlashCard(models.Model):
    author = models.ForeignKey(User, on_delete=models.CASCADE, related_name="cards")
    front = models.CharField(max_length=150)
    back = models.CharField(max_length=150)
    deck = models.CharField(max_length=20)
    date_created = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return self.front