# GestLib - Sistema de gestión de biblioteca

Proyecto final del curso de Estructura de datos - UNMSM - FISI

## Instalación
### 1. Clona el Repositorio
Primero, clona el repositorio de Github:
```bash
git clone https://github.com/AlwinD17/GestLib.git
cd GestLib
```
### 2. Configura el backend
#### &nbsp; &nbsp; &nbsp; a. Crea y activa un entorno virtual
```bash
cd backend
python -m venv env
venv\Scripts\activate
```
#### &nbsp; &nbsp; &nbsp; b. Instala las dependencias de python
```bash
pip install -r requirements.txt
```
#### &nbsp; &nbsp; &nbsp; c. Realiza las migraciones de la base de datos
```bash
python manage.py migrate
```
### 3. Configura el frontend
#### &nbsp; &nbsp; &nbsp; a. Navega a la carpeta del frontend
```bash
cd ../client
```
#### &nbsp; &nbsp; &nbsp; b. Instala las dependencias
```bash
npm install
```

## Ejecución del proyecto
### 1. Ejecuta el servidor de Django
Navega a la carpeta del backend y ejecuta el servidor de desarrollo de Django:
```bash
cd ../backend
python manage.py runserver
```
### 2. Ejecuta el servidor de desarrollo de React
Navega a la carpeta del frontend y ejecuta el servidor de desarrollo de React:
```bash
cd ../client
npm run dev
```
