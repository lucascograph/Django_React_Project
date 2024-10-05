from rest_framework import generics, status
from rest_framework.response import Response
from .serializers import UserSerializer, FlashcardSerializer, DeckSerializer
from rest_framework.permissions import AllowAny, IsAuthenticated
from .models import Flashcard, Deck, CustomUser

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

    def delete(self, request, *args, **kwargs):
        user = self.request.user
        card_id = kwargs.get("id")

        card_to_delete = Flashcard.objects.filter(author=user, id=card_id)
        if not card_to_delete.exists():
            return Response({"detail": f"No card matching the id: {card_id}"})

        res = card_to_delete.delete()

        return Response({"detail": res}, status=status.HTTP_204_NO_CONTENT)


class ListDecks(generics.ListAPIView):
    permission_classes = [IsAuthenticated]
    serializer_class = DeckSerializer

    def get_queryset(self):
        return Deck.objects.filter(creator=self.request.user)


class ListFlashcards(generics.ListAPIView):
    serializer_class = FlashcardSerializer
    permission_classes = [IsAuthenticated]

    def get(self, request, *args, **kwargs):
        deck_id = kwargs.get("deck_id")

        flashcards = Flashcard.objects.filter(deck_id=deck_id)

        serializer = self.get_serializer(flashcards, many=True)

        return Response(serializer.data, status=status.HTTP_200_OK)


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
            original_deck = Deck.objects.get(unique_code=unique_code)

            new_deck = Deck.objects.create(name=f"{original_deck.name} (Copy)", creator=request.user)

            flashcards = Flashcard.objects.filter(deck=original_deck)
            for card in flashcards:
                Flashcard.objects.create(
                    front=card.front,
                    back=card.back,
                    deck=new_deck
                )

            return Response({"detail": "Deck duplicated successfully."}, status=201)

        except Deck.DoesNotExist:
            return Response({"detail": "Deck not found."}, status=404)
