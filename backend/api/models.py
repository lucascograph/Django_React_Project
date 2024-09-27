from django.contrib.auth.models import AbstractBaseUser, BaseUserManager
from django.db import models

class CustomUserManager(BaseUserManager):
    def create_user(self, username, email, password=None):
        if not email:
            raise ValueError('Users must have an email address')
        if not username:
            raise ValueError('Users must have a username')

        email = self.normalize_email(email)
        user = self.model(username=username, email=email)
        user.set_password(password)  # Hash the password
        user.save(using=self._db)
        return user

    def create_superuser(self, username, email, password=None):
        user = self.create_user(username, email, password)
        user.is_admin = True
        user.is_staff = True
        user.save(using=self._db)
        return user

class CustomUser(AbstractBaseUser):
    id = models.AutoField(primary_key=True) 
    username = models.CharField(max_length=50, unique=True, null=False)
    email = models.EmailField(max_length=100, unique=True, null=False)
    password = models.CharField(max_length=255, null=False)
    created_at = models.DateTimeField(auto_now_add=True)
    last_login = models.DateTimeField(null=True, blank=True)

    objects = CustomUserManager()

    USERNAME_FIELD = 'email'  # Use email for authentication
    REQUIRED_FIELDS = ['username']  # Additional fields for createsuperuser

    def __str__(self):
        return self.email

