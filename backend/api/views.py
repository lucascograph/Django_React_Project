from django.contrib.auth.models import User
from rest_framework import generics
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


class DeleteFlashCard(generics.DestroyAPIView):
    serializer_class = FlashCardSerializer
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        user = self.request.user
        return FlashCard.objects.filter(author=user)

