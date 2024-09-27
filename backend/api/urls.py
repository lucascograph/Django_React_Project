from django.urls import path
from rest_framework_simplejwt.views import TokenObtainPairView
from .views import RegisterView

urlpatterns = [
    path('api/login/', TokenObtainPairView.as_view(), name='token_obtain_pair'),
    path('api/register/', RegisterView.as_view(), name='register'),
]