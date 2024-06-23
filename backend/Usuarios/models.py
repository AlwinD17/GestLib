from django.db import models
from django.contrib.auth.models import AbstractUser
from django.core.validators import RegexValidator

TYPE_CHOICES = [
        ('administrador', 'Administrador'),
        ('cliente', 'Cliente')
]

class Usuario(AbstractUser):
    dni = models.CharField(primary_key=True,validators=[RegexValidator(regex=r'^\d{8}$')] ,max_length = 8,unique=True)
    full_name=models.CharField(max_length=50)
    address = models.TextField()
    type=models.CharField(choices=TYPE_CHOICES,max_length=13,default='administrador')

    def __str__(self):
        return f"User {self.dni} - {self.full_name}"

