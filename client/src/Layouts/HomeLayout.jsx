import React from 'react'
import { Outlet } from 'react-router-dom'
import { Header, Footer } from '../Components'

const HomeLayout = () =>{
    return(
    <>
        <div>
            <Header />
            <Outlet />
            <Footer />
        </div>
    </>)
}

export default HomeLayout