import React, { useState } from 'react';
import { useLoaderData, useParams, useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBookOpen } from '@fortawesome/free-solid-svg-icons';
import { deleteLibro, getLibro } from '../../api/libros.api';
import { getUsuario } from "../../api/usuarios.api";
import { ToastContainer, toast } from 'react-toastify';
import { Box, Modal, Typography, TextField, Button } from '@mui/material'
import { updateLibro } from '../../api/libros.api';
import { useForm } from "react-hook-form";
import 'react-toastify/dist/ReactToastify.css';

export async function loader({ params }) {
  const libroId = params.libroId;
  const libro = (await getLibro(libroId)).data;
  const userId = params.userId;
  const user = (await getUsuario(userId)).data;
  return { libro, user };
}

const labels = [
  {
    name:'Título',
    label:'title'
  },
  {
    name:'Autor',
    label:'author'
  },
  {
    name:'Género',
    label:'gender'
  },
  {
    name:'Fecha de publicación',
    label:'date_publication'
  },
  {
    name:'Descripción',
    label:'description'
  }
]

export const LibroPage = () => {
  
  const { libro, user} = useLoaderData();
  const userId = useParams().userId; 
  const navigate = useNavigate();
  const bookFormatted={
    title: libro.title,
    author : libro.author,
    gender: libro.gender,
    date_publication: libro.date_publication,
    description: libro.description
  };

  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);



  const [libroCanasta, setLibroCanasta] = useState(false);

  function handleLibroCanasta() {
    // Obtener la canasta actual del usuario desde localStorage usando userId
    const storedCanasta = JSON.parse(localStorage.getItem(`canasta_${userId}`)) || [];
    // Verificar si el libro ya está en la canasta del usuario
    const libroEnCanasta = storedCanasta.find((item) => item.isbn === libro.isbn);
  
    if (!libroEnCanasta) {
      // Si el libro no está en la canasta, añadirlo y actualizar localStorage
      storedCanasta.push(libro);
      localStorage.setItem(`canasta_${userId}`, JSON.stringify(storedCanasta));
      setLibroCanasta(true);
      toast.success('Libro añadido a la canasta');
    } else {
      toast.warning('Este libro ya está en la canasta');
    }
  }


  const textLabels = (element, defaultValue) => (
    <Box>
      <Typography key={element.name} variant='h6' fontWeight='bold'>
        {element.name}: 
      </Typography>
        <TextField
          key={element.label}
          id={`outlined-error-helper-text-${element.label}`}
          label={element.name}
          variant="outlined"
          margin="normal"
          fullWidth={element.label !== 'date_publication'}
          size={element.label === 'date_publication' ? 'small' : undefined}
          multiline={element.label === 'description'}
          defaultValue={defaultValue[element.label]}
          {...register(element.label, { required: true, minLength: 5 })}
          error={!!errors[element.label]}
          helperText={errors[element.label] ? errors.message : ''}
        />
    </Box>
  );

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset
  } = useForm();

  const onSubmit = async (data) => {
    const dataFormatted = {
      "isbn": libro.isbn,
      "title": data.title,
      "author": data.author,
      "gender": data.gender,
      "date_publication": data.date_publication,
      "description": data.description,
      "status": libro.status,
    };
  
    try {
      const response = await updateLibro(libro.isbn, dataFormatted);
      console.log(response);
      if (response && response.status === 200) { 
        window.location.reload();
        alert("Se actualizó el libro exitosamente");
      } else {
        alert("No se pudo actualizar el libro.");
      }
    } catch (error) {
      console.log("Error: ", error);
      alert("No se pudo actualizar el libro. Ingrese datos válidos");
    }

    handleClose();
  };

  const onDelete = async () => {
    // try {
      const response = await deleteLibro(libro.isbn);
      navigate(-1);
      toast.success("Se eliminó el libro exitosamente");
    //   if (response && response.status === 200) {
    //     navigate(-1);
    //     toast.success("Se eliminó el libro exitosamente");
        
    //   } else {
    //     toast.error("No se pudo eliminar el libro.");
    //   }
    // } catch (error) {
    //   console.log("Error: ", error);
    //   toast.error("No se pudo eliminar el libro.");
    // }
  };


  return (
    <div className='px-8 py-4 lg:px-24'>
      <div className='flex'>
        <div className='flex items-center mr-4'>
          <FontAwesomeIcon size="2xl" icon={faBookOpen} />
        </div>
        <h1 className='text-4xl font-bold'>Libro</h1>
      </div>

      <div className="flow-root mt-9 rounded-lg border border-gray-100 py-3 shadow-sm">
        <dl className="-my-3 divide-y divide-gray-100 text-sm">
          <div className="p-3">
            <i></i>
            <dt className="uppercase font-semibold text-lg text-gray-900 py-2">
              {libro.title}
            </dt>
          </div>

          <div className="grid grid-cols-1 gap-1 p-3 sm:grid-cols-3 sm:gap-4">
            <dt className="font-medium text-gray-900">ISBN</dt>
            <dd className="text-gray-700 sm:col-span-2">{libro.isbn}</dd>
          </div>

          <div className="grid grid-cols-1 gap-1 p-3 sm:grid-cols-3 sm:gap-4">
            <dt className="font-medium text-gray-900">Autor</dt>
            <dd className="text-gray-700 sm:col-span-2">{libro.author}</dd>
          </div>

          <div className="grid grid-cols-1 gap-1 p-3 sm:grid-cols-3 sm:gap-4">
            <dt className="font-medium text-gray-900">Género</dt>
            <dd className="text-gray-700 sm:col-span-2">{libro.gender}</dd>
          </div>

          <div className="grid grid-cols-1 gap-1 p-3 sm:grid-cols-3 sm:gap-4">
            <dt className="font-medium text-gray-900">Fecha de publicación</dt>
            <dd className="text-gray-700 sm:col-span-2">{libro.date_publication}</dd>
          </div>

          <div className="grid grid-cols-1 gap-1 p-3 sm:grid-cols-3 sm:gap-4">
            <dt className="font-medium text-gray-900">Descripción</dt>
            <dd className="text-gray-700 sm:col-span-2">{libro.description}</dd>
          </div>

          <div className="grid grid-cols-1 gap-1 p-3 sm:grid-cols-3 sm:gap-4">
            <dt className="font-medium text-gray-900">Status</dt>
            <dd className="sm:col-span-2">
              <span className={`rounded-lg p-1 font-semibold ${libro.status === "disponible" ? "bg-green-200 text-green-700" : "bg-red-200 text-red-700"}`}>
                {libro.status === "disponible" ? "Disponible" : "Prestado"}
              </span>
            </dd>
          </div>
        </dl>
      </div>
    {
      user.type==='cliente' ? (
      <div className='flex mt-16 items-center justify-around flex-col gap-12 lg:flex-row lg:px-0'>
        <button
          className="w-64 lg:w-auto rounded-3xl border border-gray-950 bg-gray-950 px-16 py-2 text-sm font-medium text-white hover:bg-gray-900 focus:outline-none focus:ring-gray-600 cursor-pointer disabled:cursor-default disabled:bg-gray-400 disabled:border-gray-400 disabled:text-gray-500 disabled:font-medium"
          disabled={libro.status !== "disponible" || libroCanasta}
          onClick={handleLibroCanasta}
        >
          Añadir a canasta
        </button>
      </div>) : (
      <div className='flex mt-16 items-center justify-around flex-col gap-12 lg:flex-row lg:px-0'>
        <button
          className="w-64 lg:w-auto rounded-3xl border border-gray-950 bg-gray-950 px-16 py-2 text-sm font-medium text-white hover:bg-gray-900 focus:outline-none focus:ring-gray-600 cursor-pointer disabled:cursor-default disabled:bg-gray-400 disabled:border-gray-400 disabled:text-gray-500 disabled:font-medium"
          onClick={handleOpen}
        >
          Editar libro
        </button>
        <button
          className="w-64 lg:w-auto rounded-3xl border border-gray-950 bg-red-700 px-16 py-2 text-sm font-medium text-white hover:bg-red-800 focus:outline-none focus:ring-gray-600 cursor-pointer disabled:cursor-default disabled:bg-gray-400 disabled:border-gray-400 disabled:text-gray-500 disabled:font-medium"
          onClick={onDelete}
        >
          Eliminar libro
        </button>
        <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <form onSubmit={handleSubmit(onSubmit)}>
          <Box sx={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            width: 800,
            bgcolor: 'background.paper',
            border: '2px solid #000',
            boxShadow: 24,
            p: 4,
            maxHeight: '90vh', 
            overflowY: 'auto', 
          }}>
            <div className='formItem' id='item2'>
              <Typography variant='h4' fontWeight='bold' >
                Editar libro
              </Typography>
                {labels.map((ele) => textLabels(ele, bookFormatted))}
                <Button variant="contained"
                  type='submit'
                  style={{
                    backgroundColor: 'black',
                    color: 'white',
                    borderRadius: '50px',
                    width: '200px',
                    textTransform: 'none',
                    margin: '50px auto 10px',
                  }} >Actualizar Libro</Button>
              </div>
          </Box>
        </form>
      </Modal>
    </div>
      )
    }
      <ToastContainer />
    </div>
  );
}
