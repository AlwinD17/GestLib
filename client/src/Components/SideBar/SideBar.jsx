import React, { useState } from "react";
import { Outlet, useNavigate, useParams, useLoaderData } from "react-router-dom";
import { getUsuario } from "../../api/usuarios.api";
import Box from "@mui/material/Box";
import Drawer from "@mui/material/Drawer";
import CssBaseline from "@mui/material/CssBaseline";
import Toolbar from "@mui/material/Toolbar";
import List from "@mui/material/List";
import Typography from "@mui/material/Typography";
import Divider from "@mui/material/Divider";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import BookIcon from "@mui/icons-material/Book";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import AssignmentIcon from "@mui/icons-material/Assignment";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import DashboardIcon from "@mui/icons-material/Dashboard";
import PeopleIcon from "@mui/icons-material/People";
import ExitToAppIcon from "@mui/icons-material/ExitToApp";
import logo from "../../assets/logo.png";
const drawerWidth = 240;

export async function loader({params}){
  const userId=params.userId;
  const user= (await getUsuario(userId)).data;
  return user;
}

export const SideBar = () => {
  const navigate = useNavigate();
  const user=useLoaderData();
  const [selectedItem, setSelectedItem] = useState(`/${user.dni}/libros`);
  

  const handleItemClick = (route) => {
    navigate(route);
    setSelectedItem(route);
  };

  return (
    <Box sx={{ display: "flex" }}>
      <CssBaseline />
      <Drawer
        sx={{
          width: drawerWidth,
          flexShrink: 0,
          "& .MuiDrawer-paper": {
            width: drawerWidth,
            boxSizing: "border-box",
            backgroundColor: "#EFE1D0",
          },
        }}
        variant="permanent"
        anchor="left"
      >
        <Toolbar sx={{ display: "flex", justifyContent: "center", alignItems: "center" }}>
          <img
            src={logo}
            alt="Library Logo"
            // style={{ maxWidth: "100%", height: "auto" }}
          />
        </Toolbar>
        <Divider />
        <List>
          <ListItem disablePadding>
            <ListItemButton
              onClick={() => handleItemClick(`/${user.dni}/libros`)}
              sx={selectedItem === `/${user.dni}/libros` ? { backgroundColor: "#DFBEAD" } : null}
            >
              <ListItemIcon>
                <BookIcon />
              </ListItemIcon>
              <ListItemText primary="Libros" />
            </ListItemButton>
          </ListItem>
          <ListItem disablePadding>
            <ListItemButton
              onClick={() => handleItemClick(`/${user.dni}/usuarios/${user.dni}`)}
              sx={selectedItem === `/${user.dni}/usuarios/${user.dni}` ? { backgroundColor: "#DFBEAD" } : null}
            >
              <ListItemIcon>
                <AccountCircleIcon />
              </ListItemIcon>
              <ListItemText primary="Perfil" />
            </ListItemButton>
          </ListItem>
          <ListItem disablePadding>
            <ListItemButton
              onClick={() => handleItemClick(`/${user.dni}/prestamos`)}
              sx={selectedItem === `/${user.dni}/prestamos` ? { backgroundColor: "#DFBEAD" } : null}
            >
              <ListItemIcon>
                <AssignmentIcon />
              </ListItemIcon>
              <ListItemText primary="Préstamos" />
            </ListItemButton>
          </ListItem>
          {user.type=="cliente"&&<ListItem disablePadding>
            <ListItemButton
              onClick={() => handleItemClick(`/${user.dni}/canasta`)}
              sx={selectedItem === `/${user.dni}/canasta` ? { backgroundColor: "#DFBEAD" } : null}
            >
              <ListItemIcon>
                <ShoppingCartIcon />
              </ListItemIcon>
              <ListItemText primary="Canasta" />
            </ListItemButton>
          </ListItem>}
          {user.type=="administrador"&&<ListItem disablePadding>
            <ListItemButton
              onClick={() => handleItemClick(`/${user.dni}/panel-administracion`)}
              sx={selectedItem === `/${user.dni}/panel-administracion` ? { backgroundColor: "#DFBEAD" } : null}
            >
              <ListItemIcon>
                <DashboardIcon />
              </ListItemIcon>
              <ListItemText primary="Panel de Administración" />
            </ListItemButton>
          </ListItem>}
          {user.type=="administrador"&&<ListItem disablePadding>
            <ListItemButton
              onClick={() => handleItemClick(`/${user.dni}/usuarios`)}
              sx={selectedItem === `/${user.dni}/usuarios` ? { backgroundColor: "#DFBEAD" } : null}
            >
              <ListItemIcon>
                <PeopleIcon />
              </ListItemIcon>
              <ListItemText primary="Usuarios" />
            </ListItemButton>
          </ListItem>}
        </List>
        
        <List sx={{ marginTop: 'auto' }}>
        <Divider />
          <ListItem disablePadding>
            <ListItemButton 
             onClick={() => handleItemClick(`/`)}
            >
              <ListItemIcon>
                <ExitToAppIcon />
              </ListItemIcon>
              <ListItemText primary="Cerrar Sesión" />
            </ListItemButton>
          </ListItem>
        </List>
      </Drawer>
      <Box
        component="main"
        sx={{ flexGrow: 1, bgcolor: "background.default", p: 3 }}
      >
        <Outlet />
      </Box>
    </Box>
  );
};
