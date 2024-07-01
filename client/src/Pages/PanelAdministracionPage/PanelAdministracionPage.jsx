import React, { useState } from "react";
import {useLoaderData} from "react-router-dom";
import axios from "axios";
import "@fortawesome/fontawesome-free/css/all.min.css";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { createLibro,getAllLibros } from "../../api/libros.api";
import { getAllUsuarios } from "../../api/usuarios.api";
import { createPrestamo,getAllPrestamos } from "../../api/prestamos.api";
import { ToastContainer, toast } from 'react-toastify';
import "./PanelAdministracion.css";

export async function loader(){
  const usuarios=(await getAllUsuarios()).data;
  const libros=(await getAllLibros()).data;
  const prestamos=(await getAllPrestamos()).data;
  return{usuarios,libros,prestamos};
}

export const PanelAdministracionPage = () => {
  const data=useLoaderData();
  const [isbn, setIsbn] = useState("");
  const [title, setTitle] = useState("");
  const [gender, setGenre] = useState("");
  const [author, setAuthor] = useState("");
  const [date_publication, setPublication] = useState("");
  const [description, setDescription] = useState("");
  const [isbnLoan, setIsbnLoan] = useState("");
  const [dni, setDni] = useState("");
  const [days, setDays] = useState("");

  const handleAddBook = async () => {
    const bookData = {
      isbn,
      title,
      gender,
      author,
      date_publication,
      description,
    };
    console.log(bookData);
    const dateRegex = /^\d{4}-\d{2}-\d{2}$/;

    if(dateRegex.test(bookData.date_publication)){
      try {
        await createLibro(bookData);
        toast.success("Libro añadido con éxito");
      } catch (error) {
        console.error("Error al añadir libro:", error);
        toast.error("Hubo un error al añadir el libro.");
      }
    }
    else{
      toast.warning("Ingresar fecha en formato YYYY-MM-DD.");
    }
    
  };

  const handleGenerateLoan = async () => {
    const loanData = { libro: isbnLoan, usuario:dni, time_in_days:days };
    let esValido = true;
    let errores = [];

    // Validacion de libro
    const libro = data.libros.find((libro) => libro.isbn === loanData.libro);
    if (libro) {
      if (libro.status === "prestado") {
        esValido = false;
        errores.push("Libro no está disponible.");
      }
    } else {
      esValido = false;
      errores.push("Ingrese un libro válido.");
    }
    // Validacion de usuario
    const usuario = data.usuarios.find((usuario) => usuario.dni === loanData.usuario);
    if (usuario) {
      let nPrestamos = 0;
      data.prestamos.forEach((prestamo) => {
        if (prestamo.usuario === usuario.dni) {
          nPrestamos++;
        }
      });
      if (nPrestamos >= 3) {
        esValido = false;
        errores.push("Usuario ya alcanzó el límite de préstamos.");
      }
    } else {
      esValido = false;
      errores.push("Ingrese un usuario válido.");
    }
    //Validacion de dias
    if(loanData.time_in_days>7 || loanData.time_in_days<1){
      esValido = false;
      errores.push("Ingrese un número válido de días.");
    }

    // Mostrar errores si hay
    if (errores.length > 0) {
      toast.warning(errores.join('\n'));
    }
    // Sí data es válida
    if (esValido) {
      try {
        await createPrestamo(loanData);
        toast.success("Préstamo generado con éxito.");
      } catch (error) {
        console.error("Error creando préstamo: ", error);
        toast.error("Hubo un error generando el préstamo.");
      }
    }
  };

  return (
    <div className="bg-white container mx-auto px-4 py-6 sm:px-8 sm:py-10 md:px-12 md:py-12 lg:px-16 lg:py-14 xl:px-20 xl:py-16">
      <header className="flex items-center mb-8">
        <i className="fas fa-search text-xl mr-2"></i>
        <h1 className="text-2xl font-bold">Panel de administración</h1>
      </header>
      <h2 className="text-xl font-bold mb-4">Estadísticas</h2>
      <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-8">
        <div className="bg-white p-6 shadow rounded flex items-center">
          <i className="fas fa-book text-4xl text-gray-500 mr-4"></i>
          <div>
            <h2 className="text-xl font-bold">Libros</h2>
            <p className="text-2xl">{data.libros.length}</p>
          </div>
        </div>
        <div className="bg-white p-6 shadow rounded flex items-center">
          <i className="fas fa-users text-4xl text-gray-500 mr-4"></i>
          <div>
            <h2 className="text-xl font-bold">Usuarios</h2>
            <p className="text-2xl">{data.usuarios.length}</p>
          </div>
        </div>
        <div className="bg-white p-6 shadow rounded flex items-center">
          <i className="fas fa-exchange-alt text-4xl text-gray-500 mr-4"></i>
          <div>
            <h2 className="text-xl font-bold">Préstamos</h2>
            <p className="text-2xl">{data.prestamos.length}</p>
          </div>
        </div>
      </section>

      <section className="bg-white p-6 shadow rounded mb-8">
        <h2 className="text-xl font-bold mb-4">Añadir libro</h2>
        <form
          onSubmit={(e) => {
            e.preventDefault();
            handleAddBook();
          }}
        >
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
            <div>
              <label htmlFor="isbn" className="block text-gray-700">
                ISBN:
              </label>
              <input
                type="text"
                id="isbn"
                value={isbn}
                onChange={(e) => setIsbn(e.target.value)}
                className="w-full sm:w-80 border border-gray-300 p-2 rounded-full"
                required
              />
            </div>
            <div>
              <label htmlFor="author" className="block text-gray-700">
                Autor:
              </label>
              <input
                type="text"
                id="author"
                value={author}
                onChange={(e) => setAuthor(e.target.value)}
                className="w-full sm:w-80 border border-gray-300 p-2 rounded-full"
                required
              />
            </div>
            <div>
              <label htmlFor="title" className="block text-gray-700">
                Título:
              </label>
              <input
                type="text"
                id="title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className="w-full sm:w-80 border border-gray-300 p-2 rounded-full"
                required
              />
            </div>
            <div>
              <label htmlFor="publication" className="block text-gray-700">
                Fecha de publicación:
              </label>
              <DatePicker
                selected={date_publication}
                onChange={(date) => {
                  const year = date.getFullYear();
                  const month = String(date.getMonth() + 1).padStart(2, '0'); // January is 0, so we add 1
                  const day = String(date.getDate()).padStart(2, '0');
                  setPublication(`${year}-${month}-${day}`);
                  console.log(`${year}-${month}-${day}`);
                }}
                className="w-full sm:w-80 border border-gray-300 p-2 rounded-full"
                popperPlacement="right-start"
                showYearDropdown
                showMonthDropdown
                scrollableYearDropdown
                yearDropdownItemNumber={15}
                dropdownMode="select"
                calendarClassName="text-sm"
                dateFormat="yyyy-MM-dd"
              />
            </div>
          </div>
          <div>
            <label htmlFor="genre" className="block text-gray-700">
              Género:
            </label>
            <input
              type="text"
              id="genre"
              value={gender}
              onChange={(e) => setGenre(e.target.value)}
              className="w-80 border border-gray-300 p-2 rounded-full"
              required
            />
          </div>
          <div className="mb-4">
            <label htmlFor="description" className="block text-gray-700">
              Descripción:
            </label>
            <textarea
              id="description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="w-full border border-gray-300 p-2 rounded-full"
            ></textarea>
          </div>
          <button
            type="submit"
            className="bg-black text-white py-2 px-4 rounded-full"
          >
            Añadir
          </button>
        </form>
      </section>

      <section className="bg-white p-6 shadow rounded">
        <h2 className="text-xl font-bold mb-4">Generar préstamo</h2>
        <form
          onSubmit={(e) => {
            e.preventDefault();
            handleGenerateLoan();
          }}
        >
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-4">
            <div>
              <label htmlFor="isbn-loan" className="block text-gray-700">
                ISBN:
              </label>
              <input
                type="text"
                id="isbn-loan"
                value={isbnLoan}
                onChange={(e) => setIsbnLoan(e.target.value)}
                className="w-full sm:w-80 border border-gray-300 p-2 rounded-full"
                required
              />
            </div>
            <div>
              <label htmlFor="dni" className="block text-gray-700">
                DNI:
              </label>
              <input
                type="text"
                id="dni"
                value={dni}
                onChange={(e) => setDni(e.target.value)}
                className="w-full sm:w-80 border border-gray-300 p-2 rounded-full"
                required
              />
            </div>
            <div>
              <label htmlFor="days" className="block text-gray-700">
                Días:
              </label>
              <input
                type="number"
                id="days"
                value={days}
                onChange={(e) => setDays(e.target.value)}
                className="w-full sm:w-80 border border-gray-300 p-2 rounded-full"
                required
              />
            </div>
          </div>
          <button
            type="submit"
            className="bg-black text-white py-2 px-4 rounded-full"
          >
            Generar
          </button>
        </form>
      </section>
      <ToastContainer />
    </div>
    
  );
};
