import {Outlet} from "react-router-dom";
import React from 'react'

export const SideBar = () => {
  return (
    <>
        <div>SideBar</div>

        <Outlet></Outlet>
    </>
  )
}
