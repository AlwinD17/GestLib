import React from "react"
import { RouterProvider } from "react-router-dom"
import routes from './Routes/Routing'

function App() {

  return (
    <>
      <RouterProvider router={routes} />
    </>
  )
}

export default App
