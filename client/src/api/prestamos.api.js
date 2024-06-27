import axios from 'axios';

const prestamosApi = axios.create({
  baseURL: 'http://localhost:8000/api/v1/prestamos/'  
});

export const getAllPrestamos=()=>prestamosApi.get("/");
export const getPrestamo=(id)=>prestamosApi.get(`/${id}/`);
export const createPrestamo=(prestamo)=>prestamosApi.post("/",prestamo);
export const deletePrestamo=(id)=>prestamosApi.delete(`/${id}/`);
export const updatePrestamo=(id,prestamo)=>prestamosApi.put(`/${id}/`,prestamo);