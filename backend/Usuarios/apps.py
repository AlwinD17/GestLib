from django.apps import AppConfig

class UsuariosConfig(AppConfig):
    default_auto_field = 'django.db.models.BigAutoField'
    name = 'Usuarios'

    def ready(self):
        from .models import Usuario, Prestamo
        from backend.utils.AVL_classes import AVLTree

        global avl_usuarios
        global avl_prestamos
        avl_usuarios=AVLTree()
        avl_prestamos=AVLTree()

        #Comentar para makemigrations y migrate
        #for usuario in Usuario.objects.all():
            #avl_usuarios.insert(usuario.dni,usuario)
        #for prestamo in Prestamo.objects.all():
            #avl_prestamos.insert(prestamo.id,prestamo)

        import Usuarios.signals
