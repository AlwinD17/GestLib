// Se creará un script que enviará una petición al backend
import axios from 'axios';

const librosApi = axios.create({
  baseURL: 'http://localhost:8000/api/v1/libros/'  // Asegúrate de que esta URL coincida con la base URL de tu API
});

// Obtener todos los libros
export const getAllLibros = () => {
  return librosApi.get('/');
};

// Crear un nuevo libro
export const createLibro = (libro) => {
  return librosApi.post('/add/', libro);
};

// Actualizar un libro existente
export const updateLibro = (isbn, libro) => {
  return librosApi.put(`/update/${isbn}/`, libro);
};

// Obtener un libro específico
export const getLibro = (isbn) => {
  return librosApi.get(`/${isbn}/`);
};

// Eliminar un libro
export const deleteLibro = (isbn) => {
  return librosApi.delete(`/delete/${isbn}/`);
};