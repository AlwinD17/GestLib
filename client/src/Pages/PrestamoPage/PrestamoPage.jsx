import React from "react";
import CompareArrowsIcon from "@mui/icons-material/CompareArrows";
import MenuBookIcon from "@mui/icons-material/MenuBook";
import {getPrestamo} from "../../api/prestamos.api";
import {getUsuario} from "../../api/usuarios.api";
import {useLoaderData} from "react-router-dom";

export async function loader({params}){
  const prestamo=(await getPrestamo(params.prestamoId)).data;
  const userType=(await getUsuario(params.userId)).data.type;
  return {prestamo,userType};
}

export const PrestamoPage = () => {
  const data=useLoaderData();
  console.log(data);
  return (
    <div className="max-w-3xl p-4">
      <div className="max-w-3xl mx-auto p-4">
        <div className="flex items-center mb-4">
          <CompareArrowsIcon fontSize="large" />
          <h1 className="text-2xl font-bold" style={{ marginLeft: "20px" }}>
            Préstamo
          </h1>
        </div>
        <div
          className="bg-white border rounded-lg p-6"
          style={{
            borderWidth: "2px",
            borderStyle: "solid",
            borderColor: "#ccc",
            fontSize: "1.2rem",
          }}
        >
          <div
            className="flex items-center mb-4"
            style={{ paddingBottom: "15px" }}
          >
            <MenuBookIcon style={{ fontSize: "3rem" }} />
            <h2
              className="text-xl font-bold"
              style={{ marginLeft: "15px", fontSize: "0.9rem" }}
            >
              PRÉSTAMO
            </h2>
          </div>
          <div className="text-gray-400 mb-2" style={{ paddingBottom: "30px" }}>
            <span className="font-bold text-gray-700">Código:</span> {data.prestamo.id}
          </div>
          <div className="text-gray-400 mb-2" style={{ paddingBottom: "30px" }}>
            <span className="font-bold text-gray-700">ISBN:</span> {data.prestamo.libro}
          </div>
          <div className="text-gray-400 mb-2" style={{ paddingBottom: "30px" }}>
            <span className="font-bold text-gray-700">DNI:</span>{" "}
            {data.prestamo.usuario}
          </div>
          <div className="text-gray-400 mb-2" style={{ paddingBottom: "30px" }}>
            <span className="font-bold text-gray-700">Fecha de inicio:</span>{" "}
            {data.prestamo.start_date}
          </div>
          <div className="text-gray-400 mb-4" style={{ paddingBottom: "30px" }}>
            <span className="font-bold text-gray-700">
              Fecha de vencimiento:
            </span>{" "}
            {data.prestamo.end_date}
          </div>
          <div className="text-gray-700">
            <span className="font-bold">Status:</span>{" "}
            <span className={` py-1 px-3 rounded font-semibold ${data.prestamo.status=="activo"?"bg-green-200 text-green-700":data.prestamo.status=="terminado"?"bg-gray-200 text-gray-700":"bg-red-200 text-red-700"}`}>
              {data.prestamo.status}
            </span>
          </div>
          {data.userType=="administrador"&&<button type="submit" className="mt-10 rounded-3xl border border-gray-950 bg-gray-950 px-12 py-2 text-sm font-medium text-white hover:bg-gray-900 focus:outline-none focus:ring-gray-600  cursor-pointer">
            Editar préstamo
          </button>}
        </div>
      </div>
    </div>
  );
};
