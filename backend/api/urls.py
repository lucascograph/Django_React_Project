from django.urls import path
from . import views

urlpatterns = [
    path("flashcards/", views.ListCreateFlashCard.as_view(), name="list-flashcards"),
    path("flashcards/delete/<int:pk>/", views.DeleteFlashCard.as_view(), name="delete-flashcard"),
]