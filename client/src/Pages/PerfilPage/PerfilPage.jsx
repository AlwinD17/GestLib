import React, { useEffect, useState } from 'react';
import './PerfilPage.css';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import { useForm } from "react-hook-form";
import { useNavigate, useLoaderData } from 'react-router-dom';
import { getUsuario, updateUsuario } from '../../api/usuarios.api';

export async function loader({params}){
  const perfilId = params.perfilId;
  const user= (await getUsuario(perfilId)).data;
  return user;
}

export const PerfilPage = () => {
  const user= useLoaderData();
  
  const userFormatted={
    usuario: user.username,
    contraseña : user.password,
    email: user.email,
    nombre: user.full_name,
    dirección: user.address
  };

  // Función para generar los campos de texto
  const textLabels = (label, defaultValue) => (
    <TextField
      key={label.toLowerCase()}
      id={`outlined-error-helper-text-${label}`}
      label={label}
      variant="outlined"
      margin="normal"
      size="small"
      style={{ width: '306px' }}
      defaultValue={defaultValue}
      {...register(label.toLowerCase(), { required: true, minLength: 5 })}
      error={!!errors[label.toLowerCase()]}
      helperText={errors[label.toLowerCase()] ? errors.message : ''}
    />
  );

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset
  } = useForm();

  const navigate = useNavigate();

  // Función que se ejecuta al enviar el formulario
  const onSubmit = async(data) => {
    const dataFormatted={
      "dni":user.dni,
      "username": data.usuario,
      "password": data.contraseña,
      "email": data.email,
      "full_name": data.nombre,
      "address": data.dirección
    };
    
    try{
      const response=await updateUsuario(user.dni,dataFormatted);
      console.log(response);
      if (response && response.status === 200) { 
        alert("Se actualizó el usuario exitosamente");
      } else {
        alert("No se pudo actualizar el usuario.");
      }
    }
    catch(error){
      console.log("Error: ",error);
      alert("No se pudo actualizar el usuario. Ingrese datos válidos");
    }
  };

  return (
    <>
      <div className='container' style={{
        'margin': '5vh 5vw',
        'padding': '10vh 10vw',
      }}>
        <form onSubmit={handleSubmit(onSubmit)} >
          <div className='formContainer' sx={{
            'display': 'flex',
            'minHeight': '70vh',
            'borderRadius': '30px',
            'justifyContent': 'center'
          }}>
            <div className='formItem' id='item1'>
              <h1 style={{ 'fontSize': '40px' }}>Perfil de Usuario</h1>
              {['Usuario', 'Contraseña'].map((label) => textLabels(label, userFormatted[label.toLowerCase()]))}
            </div>
            <hr className='divider' />
            <div className='formItem' id='item2'>
              {['Nombre', 'Email', 'Dirección'].map((label) => textLabels(label, userFormatted[label.toLowerCase()]))}
              <Button variant="contained"
                type='submit'
                style={{
                  'backgroundColor': 'black',
                  'color': 'white',
                  'borderRadius': '50px',
                  'width': '200px',
                  'textTransform': 'none',
                  'margin': '50px auto 10px',
                }} >Actualizar Perfil</Button>
            </div>
          </div>
        </form>
      </div>
    </>
  )
}
  