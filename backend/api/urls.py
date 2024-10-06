from django.urls import path
from . import views

urlpatterns = [
    path("flashcard/create/", views.CreateFlashcard.as_view(), name="create-flashcard"),
    path('flashcard/edit/<int:pk>/', views.UpdateFlashcard.as_view(), name='edit-flashcard'),
    path("flashcard/list/<int:deck_id>/", views.ListFlashcards.as_view(), name="list-flashcards" ),
    path("flashcard/delete/<int:pk>/", views.DeleteFlashcard.as_view(), name="delete-flashcard"),
    path("deck/create/", views.CreateDeck.as_view(), name="create-deck"),
    path("deck/delete/<int:id>/", views.DeleteDeck.as_view(), name="delete-deck"),
    path("deck/list/", views.ListDecks.as_view(), name="list-decks"),
    path('deck/share/<uuid:code>/', views.RetrieveDeckByCode.as_view(), name='share-deck'),
    path('deck/duplicate/', views.DuplicateDeck.as_view(), name='duplicate-deck'),

]