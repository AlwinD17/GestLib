import React, { useState } from 'react';
import './PerfilPage.css';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import { useForm } from "react-hook-form";
import { useNavigate, useLoaderData } from 'react-router-dom';
import { getUsuario, updateUsuario } from '../../api/usuarios.api';
import PersonIcon from '@mui/icons-material/Person';
import CloseIcon from '@mui/icons-material/Close';

export async function loader({ params }) {
  const perfilId = params.perfilId;
  const user = (await getUsuario(perfilId)).data;
  return user;
}

export const PerfilPage = () => {
  const userFromLoader = useLoaderData();
  const [user, setUser] = useState(userFromLoader);
  const userFormatted = {
    usuario: user.username,
    contraseña: user.password,
    email: user.email,
    nombre: user.full_name,
    dirección: user.address
  };

  const [isEditable, setIsEditable] = useState(false);
  const [open, setOpen] = useState(false);

  const { register, handleSubmit, formState: { errors }, reset } = useForm();

  const navigate = useNavigate();

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const onSubmit = async (data) => {
    const dataFormatted = {
      "dni": user.dni,
      "username": data.usuario,
      "password": data.contraseña,
      "email": data.email,
      "full_name": data.nombre,
      "address": data.dirección,
      "type": user.type
    };

    try {
      const response = await updateUsuario(user.dni, dataFormatted);
      console.log(response);
      if (response && response.status === 200) {
        alert("Se actualizó el usuario exitosamente");
        setUser(dataFormatted);
        setIsEditable(false);
        setOpen(false);
      } else {
        alert("No se pudo actualizar el usuario.");
      }
    } catch (error) {
      console.log("Error: ", error);
      alert("No se pudo actualizar el usuario. Ingrese datos válidos");
    }
  };

  return (
    <>
      <div className='profileHeader'>
        <PersonIcon className='personIcon' />
        <h1 className='headerTitle'>Perfil</h1>
      </div>
      <div className='container'>
        <div className='profileContainer'>
          <div className='header'>
            <PersonIcon className='profileIcon' />
            <h1 className='profileTitle'>Usuario</h1>
          </div>
          {renderInfoRow('DNI', user.dni)}
          {renderInfoRow('Usuario', userFormatted.usuario)}
          {renderInfoRow('Nombre', userFormatted.nombre)}
          {renderInfoRow('Correo electrónico', userFormatted.email)}
          {renderInfoRow('Dirección', userFormatted.dirección)}
          <Button
            onClick={handleClickOpen}
            variant="contained"
            style={{
              backgroundColor: 'black',
              color: 'white',
              borderRadius: '9999px',
              padding: '8px 16px',
              marginLeft: '-140px',
            }}
          >
            Editar usuario
          </Button>
        </div>

        <Dialog open={open} onClose={handleClose} maxWidth="sm" fullWidth>
          <DialogContent style={{ backgroundColor: '#F5F5F5', paddingTop: '50px' }}> 
            <div className='modalHeader'>
              <hr className='creamLine' />
            </div>
            <form onSubmit={handleSubmit(onSubmit)} className='editForm'>
              <div className='editFieldContainer'>
                <div className='editField'>
                  <span className='editLabel'>Usuario:</span>
                  <TextField
                    defaultValue={userFormatted.usuario}
                    {...register('usuario', { required: true, minLength: 5 })}
                    error={!!errors.usuario}
                    helperText={errors.usuario ? 'Usuario es requerido y debe tener al menos 5 caracteres' : ''}
                    fullWidth
                  />
                </div>
                <div className='editFieldBlank'></div> {/* Espacio en blanco */}
              </div>
              <div className='editFieldContainer'>
                <div className='editField'>
                  <span className='editLabel'>Contraseña:</span>
                  <TextField
                    defaultValue={userFormatted.contraseña}
                    {...register('contraseña', { required: true, minLength: 5 })}
                    error={!!errors.contraseña}
                    helperText={errors.contraseña ? 'Contraseña es requerida y debe tener al menos 5 caracteres' : ''}
                    fullWidth
                  />
                </div>
                <div className='editFieldBlank'></div> {/* Espacio en blanco */}
              </div>
              <div className='editFieldContainer'>
                <div className='editField'>
                  <span className='editLabel'>Nombre:</span>
                  <TextField
                    defaultValue={userFormatted.nombre}
                    {...register('nombre', { required: true, minLength: 5 })}
                    error={!!errors.nombre}
                    helperText={errors.nombre ? 'Nombre es requerido y debe tener al menos 5 caracteres' : ''}
                    fullWidth
                  />
                </div>
                <div className='editFieldBlank'></div> {/* Espacio en blanco */}
              </div>
              <div className='editFieldContainer'>
                <div className='editField'>
                  <span className='editLabel'>Correo electrónico:</span>
                  <TextField
                    defaultValue={userFormatted.email}
                    {...register('email', { required: true, pattern: /^\S+@\S+$/i })}
                    error={!!errors.email}
                    helperText={errors.email ? 'Email es requerido y debe ser válido' : ''}
                    fullWidth
                  />
                </div>
                <div className='editFieldBlank'></div> {/* Espacio en blanco */}
              </div>
              <div className='editFieldContainer'>
                <div className='editField'>
                  <span className='editLabel'>Dirección:</span>
                  <TextField
                    defaultValue={userFormatted.dirección}
                    {...register('dirección', { required: true, minLength: 5 })}
                    error={!!errors.dirección}
                    helperText={errors.dirección ? 'Dirección es requerida y debe tener al menos 5 caracteres' : ''}
                    fullWidth
                  />
                </div>
                <div className='editFieldBlank'></div> {/* Espacio en blanco */}
              </div>
              <DialogActions style={{ justifyContent: 'flex-end', paddingRight: '24px', paddingBottom: '16px' }}>
                <Button type='submit' variant="contained" style={{ backgroundColor: 'black', color: 'white', borderRadius: '9999px', padding: '8px 16px', marginRight: '170px' }}>Guardar cambios</Button>
              </DialogActions>
            </form>
            <Button onClick={handleClose} style={{ position: 'absolute', right: '8px', top: '8px', color: 'gray' }}><CloseIcon /></Button>
          </DialogContent>
        </Dialog>
      </div>
    </>
  );
};

const renderInfoRow = (label, value) => (
  <div className='info-row'>
    <span className='info-label'>{label}:</span>
    <span className='info-value'>{value}</span>
  </div>
);

export default PerfilPage;
