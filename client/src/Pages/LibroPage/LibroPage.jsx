import React, { useState } from 'react'
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import { faBookOpen } from '@fortawesome/free-solid-svg-icons';

export const LibroPage = () => {

  const dataLibro={
    isbn:"10009583",
    titulo:"Titulo del libro",
    autor:"John Espinoza del Castillo",
    genero:"Novela",
    fechapublicacion:"21/10/1879",
    descripcion:`Lorem ipsum dolor, sit amet consectetur adipisicing elit. Et facilis debitis explicabo
    doloremque impedit nesciunt dolorem facere, dolor quasi veritatis quia fugit aperiam
    aspernatur neque molestiae labore aliquam soluta architecto?`,
    status:"Disponible",
  };

  const userLibro={
    idUser:"72166621",
    isbn:"10009583",
    encanasta:false,
  };

  const [libroCanasta, setLibroCanasta]=useState(userLibro.encanasta);

  function handleLibroCanasta (){
    userLibro.encanasta=!libroCanasta;
    setLibroCanasta(!libroCanasta);
    //PUT userLibro
  }
  

  return (
    <div className='px-8 py-4 lg:px-24'>
      <div className='flex'>
        <div className='flex items-center mr-4'><FontAwesomeIcon  size="2xl" icon={faBookOpen} /></div>
        <h1 className='text-4xl font-bold'>Libro</h1>
      </div>
      
      <div className="flow-root mt-9 rounded-lg border border-gray-100 py-3 shadow-sm">
        <dl className="-my-3 divide-y divide-gray-100 text-sm">
          <div className=" p-3 ">
            <i></i>
            <dt className="uppercase font-semibold text-lg text-gray-900 py-2">{dataLibro.titulo}</dt>
          </div>

          <div className="grid grid-cols-1 gap-1 p-3 sm:grid-cols-3 sm:gap-4">
            <dt className="font-medium text-gray-900">ISBN</dt>
            <dd className="text-gray-700 sm:col-span-2">{dataLibro.isbn}</dd>
          </div>

          <div className="grid grid-cols-1 gap-1 p-3 sm:grid-cols-3 sm:gap-4">
            <dt className="font-medium text-gray-900">Autor</dt>
            <dd className="text-gray-700 sm:col-span-2">{dataLibro.autor}</dd>
          </div>

          <div className="grid grid-cols-1 gap-1 p-3 sm:grid-cols-3 sm:gap-4">
            <dt className="font-medium text-gray-900">Género</dt>
            <dd className="text-gray-700 sm:col-span-2">{dataLibro.genero}</dd>
          </div>

          <div className="grid grid-cols-1 gap-1 p-3 sm:grid-cols-3 sm:gap-4">
            <dt className="font-medium text-gray-900">Fecha de publicación</dt>
            <dd className="text-gray-700 sm:col-span-2">{dataLibro.fechapublicacion}</dd>
          </div>

          <div className="grid grid-cols-1 gap-1 p-3 sm:grid-cols-3 sm:gap-4">
            <dt className="font-medium text-gray-900">Descripción</dt>
            <dd className="text-gray-700 sm:col-span-2">{dataLibro.descripcion}</dd>
          </div>

          <div className="grid grid-cols-1 gap-1 p-3 sm:grid-cols-3 sm:gap-4">
            <dt className="font-medium text-gray-900">Status</dt>
            <dd className="sm:col-span-2">
              <span className={`rounded-lg p-1 font-semibold ${dataLibro.status=="Disponible"?"bg-green-200 text-green-700" :"bg-red-200 text-red-700"}`}>
                {dataLibro.status}
              </span>
            </dd>
          </div>
        </dl>
      </div>

      <div className='flex mt-16 items-center justify-around flex-col gap-12  lg:flex-row lg:px-0'>
        <button className="w-64 lg:w-auto rounded-3xl border border-gray-950 bg-gray-950 px-16 py-2 text-sm font-medium text-white hover:bg-gray-900 focus:outline-none focus:ring-gray-600  cursor-pointer disabled:cursor-default  disabled:bg-gray-400 disabled:border-gray-400 disabled:text-gray-500 disabled:font-medium"
        disabled={libroCanasta} onClick={handleLibroCanasta}>
          Añadir a canasta
        </button>
        <button className="w-64 lg:w-auto rounded-3xl border border-gray-950 bg-gray-950 px-16 py-2 text-sm font-medium text-white hover:bg-gray-900 focus:outline-none focus:ring-gray-600  cursor-pointer disabled:cursor-default disabled:bg-gray-400 disabled:border-gray-400 disabled:text-gray-500 disabled:font-medium"
        disabled={!libroCanasta} onClick={handleLibroCanasta}>
          Retirar de canasta
        </button>
      </div>
    </div>
    
  )
}
