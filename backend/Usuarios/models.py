import random
import string
from django.utils import timezone
from django.db import models
from django.contrib.auth.models import AbstractUser
from django.core.validators import RegexValidator
from Libros.models import Libro


#Contants and helpers
USUARIO_TYPE_CHOICES = [
        ('administrador', 'Administrador'),
        ('cliente', 'Cliente')
]

PRESTAMO_STATUS_CHOICES=[
        ('activo','Activo'),
        ('vencido','Vencido'),
        ('terminado','Terminado')
]

def generate_id():
    while True:
        random_id = ''.join(random.choices(string.digits, k=4))
        if not Prestamo.objects.filter(id=random_id).exists():
            return random_id



#Models
class Usuario(AbstractUser):
    dni = models.CharField(primary_key=True,validators=[RegexValidator(regex=r'^\d{8}$')] ,max_length = 8,unique=True)
    full_name=models.CharField(max_length=50)
    address = models.TextField()
    type=models.CharField(choices=USUARIO_TYPE_CHOICES,max_length=13,default='administrador')

    def __str__(self):
        return f"{self.type} {self.dni} - {self.full_name}"


class Prestamo(models.Model):
    id = models.CharField(primary_key=True, editable=False, max_length=4)
    usuario=models.ForeignKey(Usuario, on_delete=models.CASCADE) 
    libro=models.ForeignKey(Libro, on_delete=models.CASCADE)
    time_in_days=models.IntegerField()
    status=models.CharField(choices=PRESTAMO_STATUS_CHOICES, max_length=9,default='activo')
    start_date = models.DateTimeField(editable=False,null=True)
    end_date = models.DateTimeField(editable=False, null=True)


    def save(self, *args, **kwargs):
        #Generate id,start_date, end_date fields automatically
        if not self.pk:  
            self.id=generate_id()
            self.start_date=timezone.now()
            self.end_date = self.start_date + timezone.timedelta(days=self.time_in_days)
        super().save(*args, **kwargs)

    def __str__(self):
        return f"Prestamo {self.id} by {self.usuario}"
    
    


