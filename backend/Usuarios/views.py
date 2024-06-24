from rest_framework import viewsets
from rest_framework.response import Response
from rest_framework import status

from .serializers import UsuarioSerializer
from .models import Usuario
from backend.utils.AVL_classes import AVLTree



# Initialize AVL (COMENTAR CÓDIGO PARA MAKEMIGRATIONS Y MIGRATE)
avl_usuarios=AVLTree()
for usuario in Usuario.objects.all():
    avl_usuarios.insert(usuario.dni,usuario)

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

    def create(self, request):
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        # Insert into AVL tree
        avl_usuarios.insert(request.data['dni'], request.data)
        # Create in the database
        self.perform_create(serializer)
        return Response(serializer.data, status=status.HTTP_201_CREATED)
    
    def update(self,request, *args, **kwargs):
        partial = kwargs.pop('partial', False)
        instance = self.get_object()
        serializer = self.get_serializer(instance, data=request.data, partial=partial)
        serializer.is_valid(raise_exception=True)
        # Update the AVL tree
        avl_usuarios.delete(instance.dni)
        avl_usuarios.insert(serializer.validated_data['dni'], serializer.validated_data)
        # Update in the database
        self.perform_update(serializer)
        return Response(serializer.data)

    def destroy(self,request, *args, **kwargs):
        instance = self.get_object()
        # Destroy in the AVL tree
        avl_usuarios.delete(instance.dni)
        # Destroy in the database
        self.perform_destroy(instance)
        return Response(status=status.HTTP_204_NO_CONTENT)
