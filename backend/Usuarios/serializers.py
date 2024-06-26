from rest_framework import serializers
from .models import Usuario, Prestamo

class UsuarioSerializer(serializers.ModelSerializer):
    class Meta:
        model= Usuario
        fields= '__all__'


class PrestamoSerializer(serializers.ModelSerializer):
    class Meta:
        model=Prestamo
        fields='__all__'
