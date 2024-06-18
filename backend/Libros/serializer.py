from rest_framework import serializers
from .models import Libro

class LibroSerializer(serializers.ModelSerializer):
    class Meta:
        model = Libro  # Especifica el modelo que se serializará
        fields = '__all__'  