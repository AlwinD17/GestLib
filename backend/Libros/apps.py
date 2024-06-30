from django.apps import AppConfig


class LibrosConfig(AppConfig):
    default_auto_field = 'django.db.models.BigAutoField'
    name = 'Libros'
    
    def ready(self):
        from .models import Libro
        from backend.utils.AVL_classes import AVLTree

        global avl_libros
        avl_libros=AVLTree()

        #Comentar para makemigrations y migrate
        #for libro in Libro.objects.all():
            #avl_libros.insert(libro.isbn,libro) 

        import Libros.signals
