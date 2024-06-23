import React from 'react';
import BackgroundImage from "../../assets/backgroundImageLogin.svg";
import LogoImage from "../../assets/logo.png"
import {useNavigate, useLoaderData} from "react-router-dom";
import {useForm} from "react-hook-form";
import {getAllUsuarios} from "../../api/usuarios.api";


export async function loader(){
  const usuarios= (await getAllUsuarios()).data;
  return{usuarios};
}

export const LoginPage = () => {

  const dataapi=useLoaderData();
  console.log(dataapi.usuarios);
  const navigate=useNavigate();
  const {register,handleSubmit}=useForm();
  
  const onLoginButtom=handleSubmit(dataForm=>{
    console.log(dataForm);
    const foundUser=dataapi.usuarios.find(user=>user.username==dataForm.username&&user.password==dataForm.password);

    if(foundUser){
        navigate(`/${foundUser.dni}/libros`);       
    }
    else{
        alert("Usuario no válido");
    }
  });

  return (
    <main className='h-screen px-4 py-10'>
        <div 
        className=" flex justify-center lg:justify-start h-full p-10 bg-cover bg-center"
        style={{ backgroundImage: `url(${BackgroundImage})` }}
        >
          <form onSubmit={onLoginButtom} className='flex flex-col border-gray-950 border items-center justify-between bg-white h-full w-[430px] rounded-3xl p-10'>
              <div>
                <div className='flex justify-center'>
                  <img className="w-24"src={LogoImage}></img>
                </div>
                <h1 className='text-3xl font-bold mt-6 text-gray-400 text-center' >Inicia sesión</h1>
                <label htmlFor="Username" className=" w-72 mt-10 relative block rounded-md border border-gray-200 shadow-sm focus-within:border-blue-600 focus-within:ring-1 focus-within:ring-blue-600">
                  <input type="text" id="Username"
                    className="peer mt-6 px-3 pb-2 border-none bg-transparent placeholder-transparent focus:outline-none "
                    placeholder="Username"
                    {...register("username",{required:true})}
                  />
                  <span className=" absolute start-2.5 top-0 -translate-y-1/2 bg-white p-0.5 text-xs text-gray-700 transition-all peer-placeholder-shown:top-1/2 peer-placeholder-shown:text-sm peer-focus:top-0 peer-focus:text-xs">
                    Usuario
                  </span>
                </label>
                <label htmlFor="Password" className=" mt-10 relative block rounded-md border border-gray-200 shadow-sm focus-within:border-blue-600 focus-within:ring-1 focus-within:ring-blue-600">
                  <input type="password" id="Password"
                    className="peer mt-6 px-3 pb-2 border-none bg-transparent placeholder-transparent focus:outline-none "
                    placeholder="Password"
                    {...register("password",{required:true})}
                  />
                  <span className="absolute start-2.5 top-0 -translate-y-1/2 bg-white p-0.5 text-xs text-gray-700 transition-all peer-placeholder-shown:top-1/2 peer-placeholder-shown:text-sm peer-focus:top-0 peer-focus:text-xs">
                    Contraseña
                  </span>
                </label>
              </div>

              <div className='flex flex-col gap-y-7'>
                <button type="submit" className="rounded-3xl border border-gray-950 bg-gray-950 px-16 py-2 text-sm font-medium text-white hover:bg-gray-900 focus:outline-none focus:ring-gray-600  cursor-pointer">
                  Login
                </button>
                <a href='/register' className='text-center hover:underline cursor-pointer'>
                  Registrarse
                </a>
              </div>
          </form> 
        </div>
    </main>
    
  )
}
