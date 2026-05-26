from django.contrib.auth.models import AbstractUser
from django.db import models
from django.utils import timezone
from django.utils.translation import gettext_lazy

from .managers import UserManager









    

class User(AbstractUser):
    email = models.EmailField(unique=True)
    username = None

    #creation_date = models.DateTimeField(blank=True, default=timezone.now, null=True)
    #last_login_date = models.DateTimeField(blank=True, null=True)
    


    USERNAME_FIELD = "email"
    REQUIRED_FIELDS = ['firstname', 'lastname']
    


