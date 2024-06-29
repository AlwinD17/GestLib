from django.db.models.signals import post_save,post_delete
from django.dispatch import receiver
from .models import Libro
from .apps import avl_libros

#Signals for updating libros avl
@receiver(post_save, sender=Libro)
def handle_libro_save(sender, instance, created, **kwargs):
    if created:
        avl_libros.insert(instance.isbn, instance)
    else:
        avl_libros.delete(instance.isbn)
        avl_libros.insert(instance.isbn, instance)


@receiver(post_delete, sender=Libro)
def handle_libro_delete(sender, instance, **kwargs):
    avl_libros.delete(instance.isbn)