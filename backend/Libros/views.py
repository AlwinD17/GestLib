from rest_framework import viewsets
from rest_framework.response import Response
from rest_framework import status
from .serializer import LibroSerializer
from .models import Libro
from .apps import avl_libros



class LibroView(viewsets.ModelViewSet):
    serializer_class = LibroSerializer
    queryset = Libro.objects.all()

    def retrieve(self, request, **kwargs):
        #Search in AVL tree
        instance = avl_libros.find(kwargs['pk'])
        if instance is None:
            return Response(status=status.HTTP_404_NOT_FOUND)
        serializer = self.get_serializer(instance)
        return Response(serializer.data)
