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
    path("progress/today/", views.TodayProgressView.as_view(), name="today-progress"),
    path("progress/cleared/flashcard/", views.AddClearedFlashcardView.as_view(), name="add-cleared-flashcard"),
    path('progress/cleared/flashcard/list/', views.ListClearedFlashcardsView.as_view(), name='list-cleared-flashcards'),
    path('profile/', views.UserProfileView.as_view(), name='user-profile'),
    path('bunpo/', views.ListBunpo.as_view(), name='list_bunpo'), 
    path('bunpo/create/', views.CreateBunpo.as_view(), name='create_bunpo'), 
    path('bunpo/<int:id>/', views.RetrieveBunpo.as_view(), name='retrieve_bunpo'),
    path('bunpo/<int:id>/update/', views.UpdateBunpo.as_view(), name='update_bunpo'),
    path('bunpo/<int:id>/delete/', views.DeleteBunpo.as_view(), name='delete_bunpo'),
    path("progress/cleared/bunpo/", views.AddClearedBunpoView.as_view(), name="add-cleared-bunpo"),
    path('progress/cleared/bunpo/list/', views.ListClearedBunposView.as_view(), name='list-cleared-bunpos'),
]