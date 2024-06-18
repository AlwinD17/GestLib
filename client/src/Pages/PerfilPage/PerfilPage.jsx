import React, { useEffect, useState } from 'react';
import './PerfilPage.css';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import { useForm } from "react-hook-form";
import { useNavigate } from 'react-router-dom';

export const PerfilPage = () => {
  const [userData, setUserData] = useState({});

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

  useEffect(() => {
    // Función para simular la obtención de datos del usuario
    const fetchUserData = async () => {
      const data = {
        usuario: 'juanperez',
        contraseña: 'password123',
        nombre: 'Juan Perez',
        email: 'juan@example.com',
        dirección: '123 Calle Principal'
      };
      setUserData(data);
      reset(data);  // Poblamos el formulario con los datos del usuario
    };

    fetchUserData();
  }, [reset]);

  // Función que se ejecuta al enviar el formulario
  const onSubmit = (data) => {
    console.log(data);
    // Aquí se actualizarían los datos del usuario en el backend
    navigate('/');
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
              {['Usuario', 'Contraseña'].map((label) => textLabels(label, userData[label.toLowerCase()]))}
            </div>
            <hr className='divider' />
            <div className='formItem' id='item2'>
              {['Nombre', 'Email', 'Dirección'].map((label) => textLabels(label, userData[label.toLowerCase()]))}
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
              <Button
                variant="outlined"
                style={{
                  'color': 'black',
                  'borderRadius': '50px',
                  'width': '200px',
                  'textTransform': 'none',
                  'margin': '10px auto',
                }}
                onClick={() => navigate('/')}
              >
                Volver
              </Button>
            </div>
          </div>
        </form>
      </div>
    </>
  )
}
  