import React from 'react'
import './RegistrarsePage.css'
import TextField from '@mui/material/TextField'
import Button from '@mui/material/Button'
import { Link, useNavigate} from 'react-router-dom'
import { useForm } from "react-hook-form"
import { createUsuario } from '../../api/usuarios.api'



export const RegistrarsePage = () => {

  const textLabels = (label) => (
    <TextField
      key={label.toLowerCase()}
      id={`outlined-error-helper-text-${label}`}
      label={label}
      variant="outlined"
      margin="normal"
      size="small"
      style={{ width: '306px' }}
      {...register(label.toLowerCase(), { required: true, minLength: 5 })}
      error={!!errors[label.toLowerCase()]}
      helperText={errors[label.toLowerCase()] ? errors.message : ''}
    />
  );

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm()

  const navigate = useNavigate()

  const onSubmit = async (data) => {
    console.log(data)
    const formattedData={
      dni:data["dni"],
      password:data["contraseña"],
      username:data["usuario"],
      address:data["dirección"],
      email:data["email"],
      full_name:data["nombre"]
    };

    if(await createUsuario(formattedData)){
      alert("Usuario registrado con éxito.");
      navigate(`/${formattedData.dni}/libros`);
    }
    else{
      alert("No se pudo registrar usuario.");
    }
    
  }

  return (
    <>
      <div className='container' style={{
        'margin':'5vh  5vw',
        'padding':'10vh 10vw',
      }}>
        <form onSubmit={handleSubmit(onSubmit)} >
          <div className='formContainer' sx={{
            'display':'flex',
            'minHeight':'70vh',
            'borderRadius':'30px',
            'justifyContent':'center'
            }}>
              <div className='formItem' id='item1'>
                  <h1 style={{'fontSize':'40px'}}>Regístrate</h1>
                  {['Usuario','Contraseña'].map((label) => textLabels(label))}
              </div>
              <hr className='divider'/>
              <div className='formItem' id='item2'>
                {['DNI','Nombre','Email','Dirección'].map((label) => textLabels(label))}
                <Button variant="contained"
                  type='submit'
                  style={{
                    'backgroundColor':'black', 
                    'color':'white', 
                    'borderRadius':'50px', 
                    'width':'200px', 
                    'textTransform':'none',
                    'margin':'50px auto 10px',
                  }} >Registrarse</Button>
                  <Link to='/' style={{'color':'black', 'textDecoration':'none', 'marginRight':'auto', 'marginLeft':'auto' }}>Volver</Link>
              </div>
          </div>
        </form>
      </div> 
    </>
    
  )
}
