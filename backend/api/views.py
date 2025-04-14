from rest_framework import generics, status, views
from rest_framework.response import Response
from .serializers import UserSerializer, FlashcardSerializer, DeckSerializer, UserProgressSerializer, ClearedFlashcardSerializer, UserProfileSerializer
from rest_framework.permissions import AllowAny, IsAuthenticated
from .models import Flashcard, Deck, CustomUser, UserProgress, ClearedFlashcard
from django.utils import timezone
import os, shutil

class CreateUser(generics.CreateAPIView):
    queryset = CustomUser.objects.all()
    serializer_class = UserSerializer
    permission_classes = [AllowAny]


class CreateDeck(generics.CreateAPIView):
    permission_classes = [IsAuthenticated]
    serializer_class = DeckSerializer
    queryset = Deck.objects.all()

class DeleteDeck(generics.DestroyAPIView):
    permission_classes = [IsAuthenticated]

    def delete(self, request, *args, **kwargs):

        deck_id = kwargs.get('id')

        try:
            deck = Deck.objects.get(id=deck_id, creator=request.user)
            deck.delete()
            return Response({"detail": f"Successfully deleted '{deck.name}'"}, status=status.HTTP_204_NO_CONTENT)

        except Deck.DoesNotExist:
            return Response({"detail": "Deck not found."}, status=status.HTTP_404_NOT_FOUND)
        except Exception as e:
            return Response({"detail": str(e)}, status=status.HTTP_400_BAD_REQUEST)

class CreateFlashcard(generics.CreateAPIView):
    serializer_class = FlashcardSerializer
    permission_classes = [IsAuthenticated]

    def perform_create(self, serializer):
        user = self.request.user
        serializer.save(author=user)

class UpdateFlashcard(generics.UpdateAPIView):
    serializer_class = FlashcardSerializer
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        user = self.request.user
        return Flashcard.objects.filter(author=user)

    def perform_update(self, serializer):
        if serializer.is_valid():
            serializer.save()
        else:
            print(serializer.errors)


class DeleteFlashcard(generics.DestroyAPIView):
    permission_classes = [IsAuthenticated]
    serializer_class = FlashcardSerializer
    queryset = Flashcard.objects.all()


class ListDecks(generics.ListAPIView):
    permission_classes = [IsAuthenticated]
    serializer_class = DeckSerializer

    def get_queryset(self):
        return Deck.objects.filter(creator=self.request.user)


class ListFlashcards(generics.ListAPIView):
    permission_classes = [IsAuthenticated]
    serializer_class = FlashcardSerializer

    def get_queryset(self):
        deck = self.kwargs.get("deck_id")
        return Flashcard.objects.filter(author=self.request.user, deck=deck)

class RetrieveDeckByCode(generics.RetrieveAPIView):
    permission_classes = [AllowAny]
    serializer_class = DeckSerializer

    def get_queryset(self):
        unique_code = self.kwargs['code']
        return Deck.objects.filter(unique_code=unique_code)


class DuplicateDeck(generics.CreateAPIView):
    permission_classes = [IsAuthenticated]

    def post(self, request, *args, **kwargs):
        unique_code = request.data.get('code')
        try:
            original_deck = Deck.objects.get(code=unique_code)
            imported_deck_name = f"{original_deck.name} (Imported)"

            # Being able to create a duplicate once, but if a duplicated deck alrdy exists I send back an error.
            if " (Imported) (Imported)" in imported_deck_name \
                or Deck.objects.filter(name=imported_deck_name, creator=request.user).exists():
                return Response({"already_exists": True}, status=200)

            new_deck = Deck.objects.create(name=f"{imported_deck_name}", creator=request.user)

            flashcards = Flashcard.objects.filter(deck=original_deck)
            for card in flashcards:
                Flashcard.objects.create(
                    author_id = self.request.user.id,
                    front=card.front,
                    back=card.back,
                    deck=new_deck
                )

            new_deck_serialized = DeckSerializer(new_deck).data

            return Response({"detail": "Deck duplicated successfully.", "deck": new_deck_serialized}, status=201)

        except Deck.DoesNotExist:
            return Response({"detail": "Deck not found."}, status=404)

class UserProfileView(views.APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request):
        serializer = UserProfileSerializer(request.user)
        return Response(serializer.data)

    def patch(self, request):
        user = request.user
        new_image = request.FILES.get('profile_image')

        if new_image and user.profile_image:
            user_folder = os.path.dirname(user.profile_image.path)
            if os.path.exists(user_folder):
                try:
                    shutil.rmtree(user_folder)
                    print(f"Deleted folder: {user_folder}")
                except Exception as e:
                    print(f"Error deleting user folder: {e}")
        # If only bio is edited (No new image in patch request)
        if not new_image:
            request.data._mutable = True
            request.data.pop('profile_image', None)
            request.data._mutable = False

        serializer = UserProfileSerializer(user, data=request.data, partial=True)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        return Response(serializer.errors, status=400)

class TodayProgressView(views.APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request):
        today = timezone.now().date()
        progress, _ = UserProgress.objects.get_or_create(user=request.user, date=today)
        serializer = UserProgressSerializer(progress)
        return Response(serializer.data)

class AddClearedFlashcardView(views.APIView):
    permission_classes = [IsAuthenticated]

    def post(self, request):
        flashcard_id = request.data.get("flashcardId")
        if not flashcard_id:
            return Response({"error": "flashcard_id is required."}, status=status.HTTP_400_BAD_REQUEST)

        try:
            flashcard = Flashcard.objects.get(id=flashcard_id)
        except Flashcard.DoesNotExist:
            return Response({"error": "Flashcard not found."}, status=status.HTTP_404_NOT_FOUND)

        today = timezone.now().date()
        progress, _ = UserProgress.objects.get_or_create(user=request.user, date=today)

        # Check if flashcard already marked as cleared
        if ClearedFlashcard.objects.filter(progress=progress, flashcard=flashcard).exists():
            return Response({"message": "Flashcard already cleared today."}, status=status.HTTP_200_OK)

        cleared = ClearedFlashcard.objects.create(progress=progress, flashcard=flashcard)
        serializer = ClearedFlashcardSerializer(cleared)
        return Response(serializer.data, status=status.HTTP_201_CREATED)

class ListClearedFlashcardsView(views.APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request):
        today = timezone.now().date()
        
        try:
            progress = UserProgress.objects.get(user=request.user, date=today)
        except UserProgress.DoesNotExist:
            return Response({"error": "No progress found for today."}, status=status.HTTP_404_NOT_FOUND)
        
        cleared_flashcards = ClearedFlashcard.objects.filter(progress=progress)

        serializer = ClearedFlashcardSerializer(cleared_flashcards, many=True)
        return Response(serializer.data, status=status.HTTP_200_OK)
