import { createBrowserRouter } from 'react-router-dom'

import {SideBar, loader as sidebarLoader} from '../Components/SideBar/SideBar';
import {LoginPage, loader as loginLoader} from '../Pages/LoginPage/LoginPage';
import {RegistrarsePage} from '../Pages/RegistrarsePage/RegistrarsePage';
import {LibrosPage} from '../Pages/LibrosPage/LibrosPage';
import {LibroPage, loader as libroLoader} from '../Pages/LibroPage/LibroPage';
import {UsuariosPage} from '../Pages/UsuariosPage/UsuariosPage';
import {PerfilPage, loader as loaderPerfil} from '../Pages/PerfilPage/PerfilPage';
import {PrestamosPage} from '../Pages/PrestamosPage/PrestamosPage';
import {PrestamoPage} from '../Pages/PrestamoPage/PrestamoPage';
import {CanastaPage} from '../Pages/CanastaPage/CanastaPage';
import {PanelAdministracionPage} from '../Pages/PanelAdministracionPage/PanelAdministracionPage';



const routes = createBrowserRouter([
    
    {
      path:"/",
      element:<LoginPage/>,
      loader: loginLoader
    },
    {
      path:"/register",
      element:<RegistrarsePage/>
      /*loader:...*/
    },
    {
      path:"/:userId",
      element:<SideBar/>,
      loader:sidebarLoader,
      children:[
        {
          path:"/:userId/libros",
          element: <LibrosPage />,
          /*loader:...*/
        },
        {
          path:"/:userId/libros/:libroId",
          element: <LibroPage/>,
          loader: libroLoader
        },
        {
          path:"/:userId/usuarios",
          element: <UsuariosPage/>,
          /*loader:...*/
        },
        {
          path:"/:userId/usuarios/:perfilId",
          element: <PerfilPage/>,
          loader: loaderPerfil
        },
        {
          path:"/:userId/prestamos",
          element: <PrestamosPage/>,
          /*loader:...*/
        },
        {
          path:"/:userId/prestamos/:prestamoId",
          element: <PrestamoPage/>,
          /*loader:...*/
        },
        {
          path:"/:userId/canasta",
          element: <CanastaPage/>,
          /*loader:...*/
        },
        {
          path:"/:userId/panel-administracion",
          element: <PanelAdministracionPage/>,
          /*loader:...*/
        }
      ]
    }
]);


export default routes;