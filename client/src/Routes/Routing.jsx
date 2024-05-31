import { createBrowserRouter } from 'react-router-dom'

import {SideBar} from '../Components/SideBar/SideBar';
import {LoginPage} from '../Pages/LoginPage/LoginPage';
import {RegistrarsePage} from '../Pages/RegistrarsePage/RegistrarsePage';
import {LibrosPage} from '../Pages/LibrosPage/LibrosPage';
import {LibroPage} from '../Pages/LibroPage/LibroPage';
import {UsuariosPage} from '../Pages/UsuariosPage/UsuariosPage';
import {PerfilPage} from '../Pages/PerfilPage/PerfilPage';
import {PrestamosPage} from '../Pages/PrestamosPage/PrestamosPage';
import {PrestamoPage} from '../Pages/PrestamoPage/PrestamoPage';
import {CanastaPage} from '../Pages/CanastaPage/CanastaPage';
import {PanelAdministracionPage} from '../Pages/PanelAdministracionPage/PanelAdministracionPage';



const routes = createBrowserRouter([
    
    {
      path:"/",
      element:<LoginPage/>
      /*loader:...*/
    },
    {
      path:"/register",
      element:<RegistrarsePage/>
      /*loader:...*/
    },
    {
      /*path:"/:userId"*/
      path:"/",
      element:<SideBar/>,
      children:[
        {
          /*path:"/:userId/libros"*/
          path: '/libros',
          element: <LibrosPage />,
          /*loader:...*/
        },
        {
          /*path:"/:userId/libro/:libroId"*/
          path: '/libro',
          element: <LibroPage/>,
          /*loader:...*/
        },
        {
          /*path:"/:userId/usuarios"*/
          path: '/usuarios',
          element: <UsuariosPage/>,
          /*loader:...*/
        },
        {
          /*path:"/:userId/perfil/:perfilId"*/
          path: '/perfil',
          element: <PerfilPage/>,
          /*loader:...*/
        },
        {
          /*path:"/:userId/prestamos"*/
          path: '/prestamos',
          element: <PrestamosPage/>,
          /*loader:...*/
        },
        {
          /*path:"/:userId/prestamo/:prestamoId"*/
          path: '/prestamo',
          element: <PrestamoPage/>,
          /*loader:...*/
        },
        {
          /*path:"/:userId/canasta"*/
          path: '/canasta',
          element: <CanastaPage/>,
          /*loader:...*/
        },
        {
          /*path:"/:userId/panel-administracion"*/
          path: '/panel-administracion',
          element: <PanelAdministracionPage/>,
          /*loader:...*/
        }
      ]
    }
]);


export default routes;