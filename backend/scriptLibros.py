import csv
import pandas as pd
from datetime import datetime
from random import randint
from Libros.models import Libro
import chardet

def detectar_encoding(archivo):
    
    with open(archivo, 'rb') as f:
        resultado = chardet.detect(f.read())
        return resultado['encoding']

def cargar_libros(desde_archivo):
    contador = 0
    encoding = detectar_encoding(desde_archivo)
    with open(desde_archivo, 'r', encoding=encoding) as archivo:
        lector = csv.DictReader(archivo)
        for linea in lector:
            try:
                isbn = linea['isbn10'].strip()
                authors = linea['authors'].strip()
                title = linea['title'].strip()
                published_year = str(int(float(linea['published_year'])))
                categories = linea['categories'].strip()

                if not all([isbn, authors, title, published_year, categories]):
                    continue 

                
                mes = randint(1, 12)
                dia = randint(1, 28)  
                fecha_publicacion = f"{published_year}-{mes:02d}-{dia:02d}"  

                
                Libro.objects.create(
                    isbn=isbn,
                    title=title,
                    author=authors,
                    gender=categories,  
                    date_publication=fecha_publicacion, 
                    description=linea.get('description', '').strip(),
                    status='disponible'
                )
                
                contador+=1
                if contador == 200:
                    break

            except Exception as e:
                print(f"Error al cargar el libro con ISBN {linea.get('isbn10', 'N/A')}: {e}")
