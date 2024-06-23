import React, { useEffect, useState } from "react";
import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TablePagination from "@mui/material/TablePagination";
import TableRow from "@mui/material/TableRow";
import {
  Box,
  Typography,
  TextField,
  Autocomplete,
  Divider,
  Stack,
  IconButton,
  Menu,
  MenuItem,
  ListItemIcon,
} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import FilterAltIcon from "@mui/icons-material/FilterAlt";
import MenuBookIcon from "@mui/icons-material/MenuBook";
import { useNavigate, useParams } from "react-router-dom";
import { getAllLibros } from "../../api/libros.api"; // Importa la función para obtener libros

const columns = [
  { id: "isbn", label: "ISBN", minWidth: 100 },
  { id: "title", label: "Título", minWidth: 170 },
  { id: "author", label: "Autor", minWidth: 170 },
  { id: "gender", label: "Género", minWidth: 170 },
  { id: "status", label: "Status", minWidth: 100 },
];

export const LibrosPage = () => {
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [rows, setRows] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [anchorEl, setAnchorEl] = useState(null);
  const [searchBy, setSearchBy] = useState("title");
  const navigate = useNavigate();
  const userId= (useParams()).userId;

  const fetchLibros = async () => {
    try {
      const response = await getAllLibros();
      setRows(response.data);
    } catch (error) {
      console.error("Error fetching libros:", error);
    }
  };

  useEffect(() => {
    fetchLibros();
  }, []);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  const handleSearch = (event, value) => {
    setSearchTerm(value);
    if (value === "") {
      fetchLibros();
    } else {
      const filteredRows = rows.filter((row) =>
        row[searchBy].toLowerCase().includes(value.toLowerCase())
      );
      setRows(filteredRows);
    }
  };

  const handleFilterClose = (filter) => {
    setAnchorEl(null);
    if (filter) {
      setSearchBy(filter);
      setSearchTerm(""); 
      fetchLibros(); 
    }
  };

  return (
    <>
      <Paper sx={{ width: "100%", overflow: "hidden", padding: "12px" }}>
        <Stack
          direction="row"
          alignItems="center"
          spacing={1}
          sx={{ padding: "20px" }}
        >
          <MenuBookIcon />
          <Typography gutterBottom variant="h5" component="div">
            Lista de libros
          </Typography>
        </Stack>
        <Divider />
        <Box height={10} />
        <Stack
          direction="row"
          spacing={2}
          className="my-2 mb-2"
          alignItems="center"
        >
          <SearchIcon />
          <Autocomplete
            id="free-solo-demo"
            freeSolo
            options={rows.map((row) => row[searchBy])}
            renderInput={(params) => (
              <TextField
                {...params}
                label={`Buscar libro por ${
                  searchBy === "title"
                    ? "título"
                    : searchBy === "author"
                    ? "autor"
                    : "género"
                }`}
                sx={{ width: 400 }}
              />
            )}
            onInputChange={handleSearch}
            value={searchTerm}
          />

          <IconButton
            onClick={(event) => setAnchorEl(event.currentTarget)}
            sx={{
              ml: 1,
              borderRadius: '8px', 
              border: '1px solid', 
              borderColor: 'rgba(0, 0, 0, 0.23)', 
              padding: '8px',
              '&:hover': {
                backgroundColor: 'rgba(0, 0, 0, 0.08)'
              }
            }}          
          > 
            <FilterAltIcon />
          </IconButton>
          <Menu
            anchorEl={anchorEl}
            open={Boolean(anchorEl)}
            onClose={() => handleFilterClose(null)}
          >
            {["title", "author", "gender"].map((filter) => (
              <MenuItem key={filter} onClick={() => handleFilterClose(filter)}>
                <ListItemIcon>
                  <FilterAltIcon />
                </ListItemIcon>{" "}
                {filter === "title"
                  ? "Título"
                  : filter === "author"
                  ? "Autor"
                  : "Género"}
              </MenuItem>
            ))}
          </Menu>
          <Typography
            variant="h6"
            component="div"
            sx={{ flexGrow: 1 }}
          ></Typography>
        </Stack>
        <Box height={10} />
        <TableContainer sx={{ maxHeight: 440 }}>
          <Table stickyHeader aria-label="sticky table">
            <TableHead>
              <TableRow>
                {columns.map((column) => (
                  <TableCell
                    key={column.id}
                    align={column.align}
                    style={{ minWidth: column.minWidth }}
                    sx={{ backgroundColor: "#9AC07C", fontWeight: "bold" }}
                  >
                    {column.label}
                  </TableCell>
                ))}
              </TableRow>
            </TableHead>
            <TableBody>
              {rows
                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map((row) => {
                  return (
                    <TableRow
                      hover
                      role="checkbox"
                      tabIndex={-1}
                      key={row.isbn}
                      onClick={() => navigate(`${row.isbn}`)}
                    >
                      {columns.map((column) => {
                        const value = row[column.id];
                        if (column.id === "status") {
                          return (
                            <TableCell key={column.id} align={column.align}>
                              <span
                                style={{
                                  color:
                                    value === "disponible"
                                      ? "#498B58"
                                      : "#913D3D",
                                  backgroundColor:
                                    value === "disponible"
                                      ? "#D0FFD8"
                                      : "#F77272",
                                  fontWeight: "bold",
                                  padding: "2px 4px",
                                  borderRadius: "4px",
                                  display: "inline-block",
                                }}
                              >
                                {value}
                              </span>
                            </TableCell>
                          );
                        } else {
                          return (
                            <TableCell key={column.id} align={column.align}>
                              {value}
                            </TableCell>
                          );
                        }
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
    </>
  );
};
