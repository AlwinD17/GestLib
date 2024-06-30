import React, { useEffect, useState } from "react";
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
  Checkbox,
  Button,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TablePagination,
  TableRow,
} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import FilterAltIcon from "@mui/icons-material/FilterAlt";
import ShoppingBasketIcon from "@mui/icons-material/ShoppingBasket";
import { useNavigate, useParams } from "react-router-dom";
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const columns = [
  { id: "isbn", label: "ISBN", minWidth: 100 },
  { id: "title", label: "Título", minWidth: 170 },
  { id: "author", label: "Autor", minWidth: 170 },
  { id: "gender", label: "Género", minWidth: 170 },
  { id: "status", label: "Status", minWidth: 100 },
];

export const CanastaPage = () => {
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [rows, setRows] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [anchorEl, setAnchorEl] = useState(null);
  const [searchBy, setSearchBy] = useState("title");
  const [selected, setSelected] = useState([]);
  const navigate = useNavigate();
  const { userId } = useParams(); // Utilizamos userId(dni)

  useEffect(() => {
    const storedCanasta = JSON.parse(localStorage.getItem(`canasta_${userId}`)) || [];
    setRows(storedCanasta);
  }, [userId]); // Actualizamos useEffect para que dependa de userId

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
      const storedCanasta = JSON.parse(localStorage.getItem(`canasta_${userId}`)) || [];
      setRows(storedCanasta);
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
      const storedCanasta = JSON.parse(localStorage.getItem(`canasta_${userId}`)) || [];
      setRows(storedCanasta);
    }
  };

  const handleSelect = (isbn) => {
    const newSelected = [...selected];
    if (newSelected.includes(isbn)) {
      const index = newSelected.indexOf(isbn);
      newSelected.splice(index, 1);
    } else {
      newSelected.push(isbn);
    }
    setSelected(newSelected);
  };

  const handleDelete = () => {
    const newRows = rows.filter(row => !selected.includes(row.isbn));
    setRows(newRows);
    setSelected([]);
    localStorage.setItem(`canasta_${userId}`, JSON.stringify(newRows));
    toast.success("Libro eliminado de la canasta");
  };

  return (
    <>
      <ToastContainer />
      <Paper sx={{ width: "100%", overflow: "hidden", padding: "12px" }}>
        <Stack
          direction="row"
          alignItems="center"
          spacing={1}
          sx={{ padding: "20px" }}
        >
          <ShoppingBasketIcon />
          <Typography gutterBottom variant="h5" component="div">
            Canasta de libros
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
                <TableCell padding="checkbox" sx={{ backgroundColor: "#F5CBA7", fontWeight: "bold" }}>
                  <Checkbox
                    indeterminate={selected.length > 0 && selected.length < rows.length}
                    checked={rows.length > 0 && selected.length === rows.length}
                    onChange={() => {
                      if (selected.length === rows.length) {
                        setSelected([]);
                      } else {
                        setSelected(rows.map((row) => row.isbn));
                      }
                    }}
                  />
                </TableCell>
                {columns.map((column) => (
                  <TableCell
                    key={column.id}
                    align={column.align}
                    style={{ minWidth: column.minWidth }}
                    sx={{ backgroundColor: "#F5CBA7", fontWeight: "bold" }}
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
                  const isSelected = selected.includes(row.isbn);
                  return (
                    <TableRow
                      hover
                      role="checkbox"
                      tabIndex={-1}
                      key={row.isbn}
                      // onClick={() => navigate(`${row.isbn}`)}
                    >
                      <TableCell padding="checkbox">
                        <Checkbox
                          checked={isSelected}
                          onChange={() => handleSelect(row.isbn)}
                        />
                      </TableCell>
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
      <Button
        variant="contained"
        onClick={handleDelete}
        disabled={selected.length === 0}
        sx={{ margin: "16px", display: 'block', marginLeft: 'auto', marginRight: 'auto', backgroundColor: "#E74C3C " }}
      >
        Eliminar libro
      </Button>
    </>
  );
};
