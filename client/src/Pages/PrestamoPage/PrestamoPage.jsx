import React from "react";
import CompareArrowsIcon from "@mui/icons-material/CompareArrows";
import MenuBookIcon from "@mui/icons-material/MenuBook";
export const PrestamoPage = () => {
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
          <div className="text-gray-700 mb-2" style={{ paddingBottom: "30px" }}>
            <span className="font-bold">Código:</span> 11100000
          </div>
          <div className="text-gray-400 mb-2" style={{ paddingBottom: "30px" }}>
            <span className="font-bold text-gray-700">ISBN:</span> Autooooooooo1
          </div>
          <div className="text-gray-400 mb-2" style={{ paddingBottom: "30px" }}>
            <span className="font-bold text-gray-700">DNI:</span>{" "}
            Géneroooooooooo1
          </div>
          <div className="text-gray-400 mb-2" style={{ paddingBottom: "30px" }}>
            <span className="font-bold text-gray-700">Fecha de inicio:</span>{" "}
            10/07/1999
          </div>
          <div className="text-gray-400 mb-4" style={{ paddingBottom: "30px" }}>
            <span className="font-bold text-gray-700">
              Fecha de vencimiento:
            </span>{" "}
            10/07/1999
          </div>
          <div className="text-gray-700">
            <span className="font-bold">Status:</span>{" "}
            <span className="bg-green-100 text-green-700 py-1 px-3 rounded">
              Activo
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};
