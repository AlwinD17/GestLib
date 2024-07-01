import React, { useState } from "react";
import CompareArrowsIcon from "@mui/icons-material/CompareArrows";
import MenuBookIcon from "@mui/icons-material/MenuBook";
import {getPrestamo, getAllPrestamos,updatePrestamo} from "../../api/prestamos.api";
import {getUsuario, getAllUsuarios} from "../../api/usuarios.api";
import { getAllLibros } from "../../api/libros.api";
import {useForm} from "react-hook-form";
import {useLoaderData} from "react-router-dom";
import { ToastContainer, toast } from 'react-toastify';

export async function loader({params}){
  const usuarios= (await getAllUsuarios()).data;
  const prestamos=(await getAllPrestamos()).data;
  const libros=(await getAllLibros()).data;
  const prestamo=(await getPrestamo(params.prestamoId)).data;
  const userType=(await getUsuario(params.userId)).data.type;
  return {usuarios,prestamos,libros,prestamo,userType};
}

export const PrestamoPage = () => {
  const data=useLoaderData();
  console.log(data);
  const {register,handleSubmit}=useForm();
  const [modalOpen,setModalOpen]=useState(false);

  const onGuardarCambios=handleSubmit(async (dataForm)=>{
    if(dataForm.usuario==data.prestamo.usuario&&dataForm.libro==data.prestamo.libro&&dataForm.status==data.prestamo.status){
      toast.success("No se han realizado cambios.");
    }
    else{
      //Validacion libro
      if(dataForm.libro!=data.prestamo.libro){
        const libro = data.libros.find((libro) => libro.isbn === dataForm.libro);
        if (libro) {
          if (libro.status === "prestado") {
            toast.warning("Libro no está disponible.");
            return;
          }
        } else {
          toast.error("Libro ingresado no existe.");
          return;
        }
      }
      //Validacion usuario
      if(dataForm.usuario!=data.prestamo.usuario){
        const usuario = data.usuarios.find((usuario) => usuario.dni === dataForm.usuario);
        if(usuario){
          let nPrestamos = 0;
          data.prestamos.forEach((prestamo) => {
            if (prestamo.usuario === dataForm.usuario) {
              nPrestamos++;
            }
          });
          if (nPrestamos >= 3) {
            toast.warning("Usuario ya alcanzó el límite de préstamos.");
            return;
          }
        }
        else{
          toast.error("Usuario ingresado no existe.");
          return;
        }
      }

      try{
        const updatedPrestamo={status:dataForm.status,usuario:dataForm.usuario,libro:dataForm.libro,id:data.prestamo.id,start_date:data.prestamo.start_date,end_date:data.prestamo.end_date,time_in_days:data.prestamo.time_in_days};
        console.log(updatedPrestamo)
        console.log(data.prestamo)
        await updatePrestamo(updatedPrestamo.id,updatedPrestamo);
        
        toast.success("Préstamo actualizado con éxito");
      }
      catch(error){
        console.error("Error creando préstamo: ", error);
        toast.error("Hubo un error al actualizar el préstamo");
      }
    }
  });

  return (
    <div className="max-w-3xl p-4">
      <div className="max-w-3xl mx-auto p-4">
        <div className="flex items-center mb-4">
          <CompareArrowsIcon fontSize="large" />
          <h1 className="text-2xl font-bold" style={{ marginLeft: "20px" }}>
            Préstamo
          </h1>
        </div>
        <div
          className="bg-white border rounded-lg p-6"
          style={{
            borderWidth: "2px",
            borderStyle: "solid",
            borderColor: "#ccc",
            fontSize: "1.2rem",
          }}
        >
          <div
            className="flex items-center mb-4"
            style={{ paddingBottom: "15px" }}
          >
            <MenuBookIcon style={{ fontSize: "3rem" }} />
            <h2
              className="text-xl font-bold"
              style={{ marginLeft: "15px", fontSize: "0.9rem" }}
            >
              PRÉSTAMO
            </h2>
          </div>
          <div className="text-gray-400 mb-2" style={{ paddingBottom: "30px" }}>
            <span className="font-bold text-gray-700">Código:</span> {data.prestamo.id}
          </div>
          <div className="text-gray-400 mb-2" style={{ paddingBottom: "30px" }}>
            <span className="font-bold text-gray-700">ISBN:</span> {data.prestamo.libro}
          </div>
          <div className="text-gray-400 mb-2" style={{ paddingBottom: "30px" }}>
            <span className="font-bold text-gray-700">DNI:</span>{" "}
            {data.prestamo.usuario}
          </div>
          <div className="text-gray-400 mb-2" style={{ paddingBottom: "30px" }}>
            <span className="font-bold text-gray-700">Fecha de inicio:</span>{" "}
            {data.prestamo.start_date}
          </div>
          <div className="text-gray-400 mb-4" style={{ paddingBottom: "30px" }}>
            <span className="font-bold text-gray-700">
              Fecha de vencimiento:
            </span>{" "}
            {data.prestamo.end_date}
          </div>
          <div className="text-gray-700">
            <span className="font-bold">Status:</span>{" "}
            <span className={` py-1 px-3 rounded font-semibold ${data.prestamo.status=="activo"?"bg-green-200 text-green-700":data.prestamo.status=="terminado"?"bg-gray-200 text-gray-700":"bg-red-200 text-red-700"}`}>
              {data.prestamo.status}
            </span>
          </div>
          {data.userType=="administrador"&&data.prestamo.status=="activo"&&<button onClick={()=>setModalOpen(true)}type="button"  className="mt-10 rounded-3xl border border-gray-950 bg-gray-950 px-12 py-2 text-sm font-medium text-white hover:bg-gray-900 focus:outline-none focus:ring-gray-600  cursor-pointer">
            Editar préstamo
          </button>}
        </div>
      </div>

      {modalOpen&&<form  onSubmit={onGuardarCambios}className=" size-full fixed top-0 start-0 overflow-x-auto overflow-y-auto">
        <div className="mt-7 opacity-100 duration-500 ease-out transition-all sm:max-w-2xl sm:w-full m-3 sm:mx-auto">
          <div className="relative flex flex-col bg-white shadow-lg rounded-xl dark:bg-neutral-900 p-12">

            <div className="absolute top-2 end-2">
              <button type="button" onClick={()=>setModalOpen(false)}className="flex justify-center items-center size-7 text-sm font-semibold rounded-lg border border-transparent text-gray-800 hover:bg-gray-100 disabled:opacity-50 disabled:pointer-events-none dark:text-white dark:border-transparent dark:hover:bg-neutral-700" data-hs-overlay="#hs-task-created-alert">
                <span className="sr-only">Close</span>
                <svg className="flex-shrink-0 size-4" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M18 6 6 18"/><path d="m6 6 12 12"/></svg>
              </button>
            </div>

            <div className=" overflow-y-auto grid grid-cols-3 grid-rows-2 gap-8">
              <div className="col-span-1">
                <label htmlFor="isbn" required >ISBN:</label>
              </div>
              <div className="col-span-2">
                <input id="isbn" type="text" required className="w-full sm:w-80 border border-gray-300 p-2 rounded-full"
                  defaultValue={data.prestamo.libro} 
                  {...register("libro",{required:true})}/>
              </div>

              <div className="col-span-1">
                <label htmlFor="dni" >DNI:</label>
              </div>
              <div className="col-span-2">
                <input id="dni" type="text" required className="w-full sm:w-80 border border-gray-300 p-2 rounded-full" 
                  defaultValue={data.prestamo.usuario} 
                  {...register("usuario",{required:true})}/>
              </div>

              <div className="col-span-1">
                <label htmlFor="status" >Status:</label>
              </div>
              <div className="col-span-2">
              <select id="status" required className="w-full sm:w-80 border border-gray-300 p-2 rounded-full" 
                {...register("status", { required: true })}>
                <option value="activo">Activo</option>
                <option value="terminado" >Terminado</option>
              </select>
              </div>
            </div>

            <button type="submit" className="mt-16 w-52  rounded-3xl border border-gray-950 bg-gray-950 px-8 py-2 text-sm font-medium text-white hover:bg-gray-900 focus:outline-none focus:ring-gray-600  cursor-pointer">
              Guardar cambios
            </button>
          </div>
        </div>
      </form>}
      <ToastContainer/>
    </div>
  );
};
