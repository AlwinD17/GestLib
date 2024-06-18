from django.db import models

class Libro(models.Model):

    STATUS_CHOICES = [
        ('disponible', 'Disponible'),
        ('prestado', 'Prestado'),
    ]

    isbn = models.CharField(max_length=8, unique=True, verbose_name='ISBN')
    title = models.CharField(max_length=255, verbose_name='Título')
    author = models.CharField(max_length=255, verbose_name='Autor')
    gender = models.CharField(max_length=100, verbose_name='Género')
    date_publication = models.DateField(verbose_name='Fecha de Publicación')
    description = models.TextField(verbose_name='Descripción', blank=True)
    status = models.CharField(
        max_length=10,
        choices=STATUS_CHOICES,
        default='disponible',
        verbose_name='Estado'
    )

    def __str__(self):
        return f"{self.title} by {self.author}"
