from rest_framework import viewsets
from rest_framework.response import Response
from rest_framework import status

from .serializers import UsuarioSerializer, PrestamoSerializer
from .models import Usuario, Prestamo
from backend.utils.avl_classes import AVLTree



# Initialize AVL (COMENTAR CÓDIGO PARA MAKEMIGRATIONS Y MIGRATE)
avl_usuarios=AVLTree()
avl_prestamos=AVLTree()
for usuario in Usuario.objects.all():
    avl_usuarios.insert(usuario.dni,usuario)
for prestamo in Prestamo.objects.all():
    avl_prestamos.insert(prestamo.id,prestamo)




#Views
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


    def create(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        # Save to database
        self.perform_create(serializer)
        prestamo_id = serializer.data.get('id') 
        # Insert into AVL tree
        avl_prestamos.insert(prestamo_id, request.data)
        return Response(serializer.data, status=status.HTTP_201_CREATED)
    
    def update(self,request, *args, **kwargs):
        partial = kwargs.pop('partial', False)
        instance = self.get_object()
        serializer = self.get_serializer(instance, data=request.data, partial=partial)
        serializer.is_valid(raise_exception=True)
        # Update the AVL tree
        avl_prestamos.delete(instance.id)
        avl_prestamos.insert(serializer.validated_data['id'], serializer.validated_data)
        # Update in the database
        self.perform_update(serializer)
        return Response(serializer.data)

    def destroy(self,request, *args, **kwargs):
        instance = self.get_object()
        # Destroy in the AVL tree
        avl_prestamos.delete(instance.id)
        # Destroy in the database
        self.perform_destroy(instance)
        return Response(status=status.HTTP_204_NO_CONTENT)
