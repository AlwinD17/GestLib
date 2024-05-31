import * as React from "react";
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
import { useNavigate } from "react-router-dom";
import SearchIcon from "@mui/icons-material/Search";
import FilterAltIcon from "@mui/icons-material/FilterAlt";
import MenuBookIcon from "@mui/icons-material/MenuBook";

const columns = [
  { id: "isbn", label: "ISBN", minWidth: 100 },
  { id: "title", label: "Título", minWidth: 170 },
  { id: "author", label: "Autor", minWidth: 170 },
  { id: "genre", label: "Género", minWidth: 170 },
  { id: "status", label: "Status", minWidth: 100 },
];

function createData(id, isbn, title, author, genre, status) {
  return { id, isbn, title, author, genre, status };
}

const initialRows = [
  createData(
    1,
    "11100000",
    "Titulooooooooooooooooooo 1",
    "Autor1",
    "Género1",
    "Disponible"
  ),
  createData(
    2,
    "11100001",
    "Titulooooooooooooooooooo 2",
    "Autor2",
    "Género2",
    "Prestado"
  ),
  createData(
    3,
    "11100002",
    "Titulooooooooooooooooooo 3",
    "Autor3",
    "Género3",
    "Prestado"
  ),
  createData(
    4,
    "11100003",
    "Titulooooooooooooooooooo 4",
    "Autor4",
    "Género4",
    "Disponible"
  ),
  createData(
    5,
    "11100004",
    "Titulooooooooooooooooooo 5",
    "Autor5",
    "Género5",
    "Disponible"
  ),
  createData(
    6,
    "11100005",
    "Titulooooooooooooooooooo 6",
    "Autor6",
    "Género6",
    "Disponible"
  ),
  createData(
    7,
    "11100006",
    "Titulooooooooooooooooooo 7",
    "Autor6",
    "Género6",
    "Prestado"
  ),
  createData(
    8,
    "11100007",
    "Titulooooooooooooooooooo 8",
    "Autor5",
    "Género4",
    "Disponible"
  ),
  createData(
    9,
    "11100008",
    "Titulooooooooooooooooooo 9",
    "Autor7",
    "Género7",
    "Prestado"
  ),
  createData(
    10,
    "11100009",
    "Titulooooooooooooooooooo 10",
    "Autor3",
    "Género2",
    "Disponible"
  ),
  createData(
    11,
    "11100010",
    "Titulooooooooooooooooooo 11",
    "Autor3",
    "Género3",
    "Disponible"
  ),
  createData(
    12,
    "11100011",
    "Titulooooooooooooooooooo 12",
    "Autor2",
    "Género3",
    "Disponible"
  ),
];

export const LibrosPage = () => {
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(5);
  const [rows, setRows] = React.useState(initialRows);
  const [searchTerm, setSearchTerm] = React.useState("");
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [searchBy, setSearchBy] = React.useState("title");
  const open = Boolean(anchorEl);
  const navigate = useNavigate();

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
      setRows(initialRows);
    } else {
      const filteredRows = initialRows.filter((row) =>
        row[searchBy].toLowerCase().includes(value.toLowerCase())
      );
      setRows(filteredRows);
    }
  };

  const handleFilterClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleFilterClose = (filter) => {
    setAnchorEl(null);
    if (filter) {
      setSearchBy(filter);
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
            options={initialRows.map((row) => row.title)}
            renderInput={(params) => (
              <TextField {...params} label="Buscar Libro" sx={{ width: 400 }} />
            )}
            onInputChange={handleSearch}
          />
          <IconButton onClick={handleFilterClick} sx={{ ml: 1 }}>
            <FilterAltIcon />
          </IconButton>
          <Menu
            anchorEl={anchorEl}
            open={open}
            onClose={() => handleFilterClose(null)}
          >
            <MenuItem onClick={() => handleFilterClose("title")}>
              <ListItemIcon>
                <FilterAltIcon />
              </ListItemIcon>{" "}
              Título
            </MenuItem>
            <MenuItem onClick={() => handleFilterClose("author")}>
              <ListItemIcon>
                <FilterAltIcon />
              </ListItemIcon>{" "}
              Autor
            </MenuItem>
            <MenuItem onClick={() => handleFilterClose("genre")}>
              <ListItemIcon>
                <FilterAltIcon />
              </ListItemIcon>{" "}
              Género
            </MenuItem>
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
                      key={row.id}
                      onClick={() => navigate("/libro")}
                    >
                      {columns.map((column) => {
                        const value = row[column.id];
                        if (column.id === "status") {
                          return (
                            <TableCell key={column.id} align={column.align}>
                              <span
                                style={{
                                  color:
                                    value === "Disponible"
                                      ? "#498B58"
                                      : "#913D3D",
                                  backgroundColor:
                                    value === "Disponible"
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
