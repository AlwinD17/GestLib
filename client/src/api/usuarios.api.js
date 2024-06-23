import axios from "axios";

const usuariosApi=axios.create({
    baseURL:'http://localhost:8000/api/v1/usuarios/',
});

export const getAllUsuarios=()=>usuariosApi.get("/");
export const getUsuario=(id)=>usuariosApi.get(`/${id}/`);
export const createUsuario=(usuario)=>usuariosApi.post("/",usuario);
export const deleteUsuario=(id)=>usuariosApi.delete(`/${id}/`);
export const updateUsuario=(id,usuario)=>usuariosApi.put(`/${id}/`,usuario);