import * as React from "react";
import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TablePagination from "@mui/material/TablePagination";
import TableRow from "@mui/material/TableRow";
import { Box, Typography, IconButton, Stack, TextField, Grid } from "@mui/material";
import CompareArrowsIcon from '@mui/icons-material/CompareArrows';
import FilterAltIcon from '@mui/icons-material/FilterAlt';
import SearchIcon from '@mui/icons-material/Search';
import { getAllPrestamos } from "../../api/prestamos.api"; 
import { useLoaderData } from "react-router-dom";

export async function loader(){
  const prestamos=(await getAllPrestamos()).data;
  return prestamos;
}

const columns = [
  { id: "codigo", label: "Código", minWidth: 100, icon: <FilterAltIcon /> },
  { id: "isbn", label: "ISBN", minWidth: 100, icon: <FilterAltIcon /> },
  { id: "dni", label: "DNI", minWidth: 100, icon: <FilterAltIcon /> },
  { id: "fecha_vencimiento", label: "Fecha vencimiento", minWidth: 100, icon: <FilterAltIcon /> },
  { id: "status", label: "Status", minWidth: 100, icon: <FilterAltIcon /> },
];

function createData(codigo, isbn, dni,fecha_vencimiento, status) {
  return { codigo, isbn, dni,fecha_vencimiento, status };
}



export const PrestamosPage = () => {
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(5);
  const [searchQuery, setSearchQuery] = React.useState("");
  const prestamos=useLoaderData();
  

  const rows=prestamos.map((prestamo)=>createData(prestamo.id,prestamo.libro,prestamo.usuario,prestamo.end_date,prestamo.status));

  

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  const handleSearch = (event) => {
    setSearchQuery(event.target.value);
  };

  const filteredRows = rows.filter((row) => {
    return (
      row.codigo.toLowerCase().includes(searchQuery.toLowerCase()) ||
      row.isbn.toLowerCase().includes(searchQuery.toLowerCase()) ||
      row.dni.toLowerCase().includes(searchQuery.toLowerCase()) ||
      row.fecha_vencimiento.toLowerCase().includes(searchQuery.toLowerCase()) ||
      row.status.toLowerCase().includes(searchQuery.toLowerCase())
    );
  });

  return (
    <Box
      component="main"
      sx={{ flexGrow: 1, bgcolor: "background.default", p: 3 }}
    >
      <Paper sx={{ width: "100%", overflow: "hidden", padding: "12px" }}>
        <Stack
          direction="row"
          alignItems="center"
          spacing={1}
          sx={{ padding: "5px", position: "relative" }}
        >
          <IconButton sx={{ fontSize: 40 }}>
            <CompareArrowsIcon fontSize="inherit" />
          </IconButton>
          <Typography gutterBottom variant="h5" component="div"
            sx={{ fontSize: '30px', fontFamily: 'Times new roman,sans-serif' }}
          >
            Préstamos
          </Typography>
        </Stack>
        <Grid
          container
          direction="row"
          alignItems="center"
          spacing={1}
          sx={{ padding: "5px" }}
        >

          <Grid item xs={12}> {/* Este Grid item ocupará todo el ancho disponible */}
            <Stack
              direction="row"
              alignItems="center"
              spacing={1}
            >
              <SearchIcon />
              <TextField
                label="Buscar préstamo"
                variant="outlined"
                size="medium"
                style={{ width: '400px' }} // Ajustar el ancho del TextField según sea necesario
                value={searchQuery}
                onChange={handleSearch}
              />

            </Stack>
          </Grid>
        </Grid>
        <Box height={10} />
        <TableContainer sx={{ maxHeight: 440 }}>
          <Table stickyHeader aria-label="sticky table">
            <TableHead>
              <TableRow>
                {columns.map((column) => (
                  <TableCell
                    key={column.id}
                    style={{
                      minWidth: column.minWidth,
                      fontWeight: "bold",
                      backgroundColor: "#D7E8D0",
                    }
                    }
                  >
                    <Stack direction="row" spacing={1} alignItems="center">
                      {column.icon && column.icon}
                      <span>{column.label}</span>
                    </Stack>
                  </TableCell>
                ))}
              </TableRow>
            </TableHead>
            <TableBody>
              {filteredRows
                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map((row) => {
                  return (
                    <TableRow hover role="checkbox" tabIndex={-1} key={row.codigo}>
                      {columns.map((column) => {
                        const value = row[column.id];
                        return (
                          <TableCell key={column.id}>
                            {column.id === "status" ? (
                              <span
                                style={{
                                  color: value === "Activo" ? "#498B58" : value === "Vencido" ? "#913D3D" : "#5F6368",
                                  backgroundColor: value === "Terminado" ? "#72A1F7" : value === "Activo" ? "#D0FFD8" : value === "Vencido" ? "#F77272" : "#E1E3E5",
                                  fontWeight: "bold",
                                  padding: "2px 4px",
                                  borderRadius: "4px",
                                  display: "inline-block",
                                }}
                              >
                                {value === "Terminado" ? <span style={{ color: "#FFFFFF" }}>{value}</span> : value}
                              </span>
                            ) : (
                              value
                            )}
                          </TableCell>
                        );
                      })}
                    </TableRow>
                  );
                })}
            </TableBody>
          </Table>
        </TableContainer>
        <TablePagination
          rowsPerPageOptions={[5, 10, 25]}
          component="div"
          count={rows.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      </Paper>
    </Box>
  );
}
