from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from backend.utils.AVL_classes import AVLTree
from .serializer import LibroSerializer
from .models import Libro

avl = AVLTree()

# Inicializa el AVL con los libros existentes(COMENTAR CÓDIGO PARA MAKEMIGRATIONS Y MIGRATE)
for libro in Libro.objects.all():
    avl.insert(libro.isbn, libro)

class LibroListView(APIView):
    def get(self, request):
        libros = [node.libro for node in avl.inorder()]
        serializer = LibroSerializer(libros, many=True)
        print("Lista de libros en el AVL Tree (Inorder):")
        for libro in libros:
            print(libro)
        return Response(serializer.data)

class LibroAddView(APIView):
    def post(self, request):
        serializer = LibroSerializer(data=request.data)
        if serializer.is_valid():
            libro = serializer.save()
            avl.insert(libro.isbn, libro)
            print(f"Libro agregado: {libro} de titulo: {libro.title} y genero: {libro.gender} tipo de dato: {type(libro)}")
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

class LibroSearchView(APIView):
    def get(self, request, isbn):
        libro = avl.find(isbn)
        if libro is None:
            return Response(status=status.HTTP_404_NOT_FOUND)
        serializer = LibroSerializer(libro)
        return Response(serializer.data, status=status.HTTP_200_OK)

class LibroUpdateView(APIView):
    def put(self, request, isbn):
        libro = avl.find(isbn)
        if libro is None:
            return Response(status=status.HTTP_404_NOT_FOUND)
        serializer = LibroSerializer(libro, data=request.data)
        if serializer.is_valid():
            updated_libro = serializer.save()
            avl.insert(updated_libro.isbn, updated_libro)  # Actualiza el AVL
            print(f"Libro actualizado: ISBN: {updated_libro.isbn}, Título: {updated_libro.title}, Autor: {updated_libro.author}, Género: {updated_libro.gender}")
            return Response(serializer.data)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

class LibroDeleteView(APIView):
    def delete(self, request, isbn):
        libro = avl.find(isbn)
        if libro is None:
            return Response(status=status.HTTP_404_NOT_FOUND)
        libro.delete()
        avl.delete(isbn)
        return Response(status=status.HTTP_204_NO_CONTENT)
