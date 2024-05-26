import { createBrowserRouter } from 'react-router-dom'
import { 
   Landing, 
  } from '../Pages'
import { HomeLayout } from '../Layouts';

const routes = createBrowserRouter([
    {
      element: <HomeLayout />,
      children:[
        {
          name: 'landing',
          path: '/',
          element: <Landing />,
        },
        // {
        //   name: 'login',
        //   path: '/login',
        //   element: <Login />,
        // },
        // {
        //   name: 'register',
        //   path: '/register',
        //   element: <Register />,
        // },
      ]
    }
])


export default routes