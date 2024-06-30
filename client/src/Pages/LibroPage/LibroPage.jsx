import React, { useState } from 'react';
import { useLoaderData, useParams } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBookOpen } from '@fortawesome/free-solid-svg-icons';
import { getLibro } from '../../api/libros.api';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export async function loader({ params }) {
  const libroId = params.libroId;
  const libro = (await getLibro(libroId)).data;
  return libro;
}

export const LibroPage = () => {
  const libro = useLoaderData();
  const { dni } = useParams();

  const [libroCanasta, setLibroCanasta] = useState(false);

  function handleLibroCanasta() {
    const storedCanasta = JSON.parse(localStorage.getItem(`canasta_${dni}`)) || [];
    const libroEnCanasta = storedCanasta.find((item) => item.isbn === libro.isbn);

    if (!libroEnCanasta) {
      storedCanasta.push(libro);
      localStorage.setItem(`canasta_${dni}`, JSON.stringify(storedCanasta));
      setLibroCanasta(true);
      toast.success('Libro añadido a la canasta');
    } else {
      toast.warning('Este libro ya está en la canasta');
    }
  }

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

      <div className='flex mt-16 items-center justify-around flex-col gap-12 lg:flex-row lg:px-0'>
        <button
          className="w-64 lg:w-auto rounded-3xl border border-gray-950 bg-gray-950 px-16 py-2 text-sm font-medium text-white hover:bg-gray-900 focus:outline-none focus:ring-gray-600 cursor-pointer disabled:cursor-default disabled:bg-gray-400 disabled:border-gray-400 disabled:text-gray-500 disabled:font-medium"
          disabled={libro.status !== "disponible" || libroCanasta}
          onClick={handleLibroCanasta}
        >
          Añadir a canasta
        </button>
      </div>

      <ToastContainer />
    </div>
  );
}
