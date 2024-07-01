import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import { Link, useNavigate } from 'react-router-dom';
import { useForm } from "react-hook-form";
import { yupResolver } from '@hookform/resolvers/yup';
import { createUsuario } from '../../api/usuarios.api';
import * as yup from 'yup';

const schema = yup.object().shape({
  usuario: yup.string().min(5, 'El usuario debe tener al menos 5 caracteres').required('El usuario es obligatorio'),
  contraseña: yup.string().min(5, 'La contraseña debe tener al menos 5 caracteres').required('La contraseña es obligatoria'),
  dni: yup.string().matches(/^\d+$/, 'El DNI debe contener solo números').min(8, 'El DNI debe tener al menos 8 caracteres').max(8, 'El DNI debe tener máximo 8 caracteres').required('El DNI es obligatorio'),
  nombre: yup.string().min(5, 'El nombre debe tener al menos 5 caracteres').required('El nombre es obligatorio'),
  email: yup.string().email('El email no es válido').required('El email es obligatorio'),
  dirección: yup.string().min(5, 'La dirección debe tener al menos 5 caracteres').required('La dirección es obligatoria'),
});

export const RegistrarsePage = () => {
  const { register, handleSubmit, formState: { errors } } = useForm({
    resolver: yupResolver(schema),
  });

  const navigate = useNavigate();

  const onSubmit = async (data) => {
    console.log("Data form: ", data);
    const formattedData = {
      dni: data["dni"],
      password: data["contraseña"],
      username: data["usuario"],
      address: data["dirección"],
      email: data["email"],
      full_name: data["nombre"],
      type: "cliente"
    };

    try {
      const response = await createUsuario(formattedData);

      if (response) {
        alert("Usuario registrado con éxito.");
        navigate(`/${formattedData.dni}/libros`);
      } else {
        alert("No se pudo registrar usuario.");
      }
    } catch (error) {
      console.error("Error registrando usuario:", error);
      alert("No se pudo registrar usuario. Ingrese datos válidos.");
    }
  }

  const textLabels = (label) => (
    <TextField
      key={label.toLowerCase()}
      id={`outlined-error-helper-text-${label}`}
      label={label}
      variant="outlined"
      margin="normal"
      size="small"
      style={{ width: '306px' }}
      {...register(label.toLowerCase())}
      error={!!errors[label.toLowerCase()]}
      helperText={errors[label.toLowerCase()] ? errors[label.toLowerCase()].message : ''}
      type={label === 'Contraseña' ? 'password' : 'text'}
    />
  );

  return (
    <div style={{
      margin: '5vh 5vw',
      padding: '10vh 10vw',
      backgroundColor: 'rgb(239, 225, 208)',
    }}>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div  
        id='formContainer' 
          className='bg-white flex lg:flex-row sm:flex-col'
          style={{
          display: 'flex',
          minHeight: '70vh',
          borderRadius: '30px',
          justifyContent: 'center',
          backgroundColor: 'white',
        }}>
          <div 
          style={{
            display: 'flex',
            flexDirection: 'column',
            margin: '40px auto',
          }}
            id='item1'>
            <h1 className='text-2xl mb-3' >Regístrate</h1>
            {['Usuario', 'Contraseña'].map((label) => textLabels(label))}
          </div>
          <hr id='divider' 
          className='sm:hidden sm:m-0 lg:m-7 lg:block '/>
          <div id='item2' 
          className='mx-auto sm:my-4 xl:my-20'
            style={{
            display: 'flex',
            flexDirection: 'column',
          }}>
            {['DNI', 'Nombre', 'Email', 'Dirección'].map((label) => textLabels(label))}
            <Button
              variant="contained"
              type='submit'
              style={{
                backgroundColor: 'black',
                color: 'white',
                borderRadius: '50px',
                width: '200px',
                textTransform: 'none',
                margin: '50px auto 10px',
              }}
            >
              Registrarse
            </Button>
            <Link to='/' style={{ color: 'black', textDecoration: 'none', marginRight: 'auto', marginLeft: 'auto' }}>Volver</Link>
          </div>
        </div>
      </form>
    </div>
  );
};