from django.contrib import admin
from django.urls import path, include

urlpatterns = [
    path('admin/', admin.site.urls),
    path('api/v1/', include('Libros.urls')),  # Asegúrate de que esto apunte a las rutas de tu aplicación de libros
]
