import React, { useState } from "react";
import {useLoaderData} from "react-router-dom";
import axios from "axios";
import "@fortawesome/fontawesome-free/css/all.min.css";
import { createLibro } from "../../api/libros.api";

export async function loader(){

}

export const PanelAdministracionPage = () => {
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
    try {
      await createLibro(bookData)
      alert("Libro añadido con éxito");
    } catch (error) {
      console.error("Error al añadir libro:", error);
      alert("Hubo un error al añadir el libro");
    }
  };

  const handleGenerateLoan = async () => {
    const loanData = { isbn: isbnLoan, dni, days };
    try {
      await axios.post("URL_DEL_BACKEND/api/v1/prestamos/", loanData);
      alert("Préstamo generado con éxito");
    } catch (error) {
      console.error("Error al generar préstamo:", error);
      alert("Hubo un error al generar el préstamo");
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
            <p className="text-2xl">3 000</p>
          </div>
        </div>
        <div className="bg-white p-6 shadow rounded flex items-center">
          <i className="fas fa-users text-4xl text-gray-500 mr-4"></i>
          <div>
            <h2 className="text-xl font-bold">Usuarios</h2>
            <p className="text-2xl">150</p>
          </div>
        </div>
        <div className="bg-white p-6 shadow rounded flex items-center">
          <i className="fas fa-exchange-alt text-4xl text-gray-500 mr-4"></i>
          <div>
            <h2 className="text-xl font-bold">Préstamos</h2>
            <p className="text-2xl">51</p>
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
              />
            </div>
            <div>
              <label htmlFor="publication" className="block text-gray-700">
                Fecha de publicación:
              </label>
              <input
                type="text"
                id="publication"
                value={date_publication}
                onChange={(e) => setPublication(e.target.value)}
                className="w-full sm:w-80 border border-gray-300 p-2 rounded-full"
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
              />
            </div>
            <div>
              <label htmlFor="days" className="block text-gray-700">
                Días:
              </label>
              <input
                type="text"
                id="days"
                value={days}
                onChange={(e) => setDays(e.target.value)}
                className="w-full sm:w-80 border border-gray-300 p-2 rounded-full"
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
    </div>
  );
};
