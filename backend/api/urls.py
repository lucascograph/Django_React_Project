from django.urls import path
from . import views

urlpatterns = [
    path("flashcards/", views.ListCreateFlashCard.as_view(), name="list-flashcards"),
    path("flashcards/delete/<int:pk>/", views.DeleteFlashCard.as_view(), name="delete-flashcard"),
    path("flashcards/decks/", views.ListUniqueDecks.as_view(), name="unique-decks"),
    path("flashcards/<str:deck>/", views.ListCardsFromDeck.as_view(), name="cards" )
]