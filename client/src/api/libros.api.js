// Se creará un script que enviará una petición al backend
import axios from 'axios';

const librosApi = axios.create({
  baseURL: 'http://localhost:8000/api/v1/libros/'  // Base para las peticiones de los libros
});

// Obtener todos los libros
export const getAllLibros = () => {
  return librosApi.get('/');
};

// Crear un nuevo libro
export const createLibro = (libro) => {
  return librosApi.post('/', libro);
};

// Actualizar un libro existente
export const updateLibro = (isbn, libro) => {
  return librosApi.put(`/${isbn}/`, libro);
};

// Obtener un libro específico
export const getLibro = (isbn) => {
  return librosApi.get(`/${isbn}/`);
};

// Eliminar un libro
export const deleteLibro = (isbn) => {
  return librosApi.delete(`/${isbn}/`);
};
