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
import PersonIcon from "@mui/icons-material/Person";
import { useNavigate, useParams } from "react-router-dom";
import { getAllUsuarios } from "../../api/usuarios.api";

const columns = [
  { id: "dni", label: "DNI", minWidth: 100 },
  { id: "username", label: "Usuario", minWidth: 170 },
  { id: "full_name", label: "Nombre", minWidth: 170 },
  { id: "email", label: "Correo electrónico", minWidth: 170 },
];

export const UsuariosPage = () => {
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [rows, setRows] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [anchorEl, setAnchorEl] = useState(null);
  const [searchBy, setSearchBy] = useState("dni");
  const navigate = useNavigate();
  const userId = useParams().userId;

  const fetchUsers = async () => {
    try {
      const response = await getAllUsuarios();
      const filteredUsers = response.data.filter(user => user.type !== "administrador");
      setRows(filteredUsers);
    } catch (error) {
      console.error("Error fetching users:", error);
    }
  };

  useEffect(() => {
    fetchUsers();
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
      fetchUsers();
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
      fetchUsers();
    }
  };

  return (
    <>
      <Paper sx={{ width: "100%", overflow: "hidden", padding: "12px", backgroundColor: "white" }}>
        <Stack
          direction="row"
          alignItems="center"
          spacing={1}
          sx={{ padding: "20px" }}
        >
          <PersonIcon />
          <Typography gutterBottom variant="h5" component="div">
            Usuarios
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
          <Autocomplete
            id="free-solo-demo"
            freeSolo
            options={rows.map((row) => row[searchBy])}
            renderInput={(params) => (
              <TextField
                {...params}
                label={`${
                  searchBy === "dni"
                    ? "DNI"
                    : searchBy === "username"
                    ? "Usuario"
                    : searchBy === "email"
                    ? "Correo electrónico"
                    : "Buscar"
                }`}
                sx={{ width: 300, backgroundColor: "white" }}
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
            <SearchIcon />
          </IconButton>
          <Menu
            anchorEl={anchorEl}
            open={Boolean(anchorEl)}
            onClose={() => handleFilterClose(null)}
          >
            {["dni", "username", "email"].map((filter) => (
              <MenuItem key={filter} onClick={() => handleFilterClose(filter)}>
                <ListItemIcon>
                  <SearchIcon />
                </ListItemIcon>{" "}
                {filter === "dni"
                  ? "DNI"
                  : filter === "username"
                  ? "Usuario"
                  : "Correo electrónico"}
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
                    sx={{ backgroundColor: "#c8e6c9", fontWeight: "bold", borderBottom: "2px solid #e0e0e0" }}
                  >
                    <Stack direction="row" alignItems="center" spacing={1}>
                      <FilterAltIcon fontSize="small" />
                      {column.label}
                    </Stack>
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
                      key={row.dni}
                      onClick={() => navigate(`${row.dni}`)}
                    >
                      {columns.map((column) => {
                        const value = row[column.id];
                        return (
                          <TableCell key={column.id} align={column.align} sx={{ borderBottom: "1px solid #e0e0e0" }}>
                            {value}
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
    </>
  );
};
