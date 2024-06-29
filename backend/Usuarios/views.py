from rest_framework import viewsets
from rest_framework.response import Response
from rest_framework import status

from .serializers import UsuarioSerializer, PrestamoSerializer
from .models import Usuario, Prestamo
from .apps import avl_prestamos, avl_usuarios



# Initialize AVL (COMENTAR CÓDIGO PARA MAKEMIGRATIONS Y MIGRATE)
#avl_usuarios=AVLTree()
#for usuario in Usuario.objects.all():
#avl_usuarios.insert(usuario.dni,usuario)

class UsuarioView(viewsets.ModelViewSet):
    serializer_class = UsuarioSerializer
    queryset = Usuario.objects.all()

    def retrieve(self, request, **kwargs):
        #Search in AVL tree
        instance = avl_usuarios.find(kwargs['pk'])
        if instance is None:
            return Response(status=status.HTTP_404_NOT_FOUND)
        serializer = self.get_serializer(instance)
        return Response(serializer.data)

class PrestamoView(viewsets.ModelViewSet):
    serializer_class = PrestamoSerializer
    queryset = Prestamo.objects.all()

    def retrieve(self, request, **kwargs):
        #Search in AVL tree
        instance = avl_prestamos.find(kwargs['pk'])
        if instance is None:
            return Response(status=status.HTTP_404_NOT_FOUND)
        serializer = self.get_serializer(instance)
        return Response(serializer.data)



