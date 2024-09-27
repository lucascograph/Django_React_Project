from rest_framework import generics
from .models import CustomUser
from .serializers import UserSerializer, RegisterSerializer
from rest_framework.permissions import AllowAny, IsAuthenticated

class UserCreateView(generics.CreateAPIView):
    queryset = CustomUser.objects.all()
    serializer_class = UserSerializer

class RegisterView(generics.CreateAPIView):
    queryset = CustomUser.objects.all()
    permission_classes = [AllowAny] 
    serializer_class = RegisterSerializer