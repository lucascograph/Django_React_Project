from django.contrib.auth.models import User
from rest_framework import generics, status
from rest_framework.response import Response
from .serializers import UserSerializer, FlashCardSerializer
from rest_framework.permissions import AllowAny, IsAuthenticated
from .models import FlashCard

class CreateUserView(generics.CreateAPIView):
    queryset = User.objects.all()
    serializer_class = UserSerializer
    permission_classes = [AllowAny]


class ListCreateFlashCard(generics.ListCreateAPIView):
    serializer_class = FlashCardSerializer
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        user = self.request.user
        return FlashCard.objects.filter(author=user)

    def perform_create(self, serializer):
        if serializer.is_valid():
            serializer.save(author=self.request.user)
        else:
            print(serializer.errors)


class UpdateFlashCard(generics.UpdateAPIView):
    serializer_class = FlashCardSerializer
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        user = self.request.user
        return FlashCard.objects.filter(author=user)

    def perform_update(self, serializer):
        if serializer.is_valid():
            serializer.save()
        else:
            print(serializer.errors)


class DeleteFlashCard(generics.DestroyAPIView):
    serializer_class = FlashCardSerializer
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        user = self.request.user
        return FlashCard.objects.filter(author=user)


class ListUniqueDecks(generics.GenericAPIView):
    permission_classes = [IsAuthenticated]

    def get(self, request, *args, **kwargs):
        user = self.request.user
        unique_decks = FlashCard.objects.filter(author=user).values_list("deck", flat=True).distinct().order_by("deck")
        return Response(list(unique_decks), status=status.HTTP_200_OK)


class ListCardsFromDeck(generics.GenericAPIView):
    serializer_class = FlashCardSerializer
    permission_classes = [IsAuthenticated]

    def get(self, request, *args, **kwargs):
        user = self.request.user

        deck = kwargs.get("deck")

        cards = FlashCard.objects.filter(author=user, deck=deck)

        serializer = self.get_serializer(cards, many=True)
        return Response(serializer.data, status=status.HTTP_200_OK)