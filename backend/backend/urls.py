from django.contrib import admin
from django.urls import path, include

urlpatterns = [
    path('admin/', admin.site.urls),
    path('api/v1/', include('Libros.urls')),  # Ruta de los libros
    path('api/v1/',include('Usuarios.urls')) # Ruta de los usuarios 
]
