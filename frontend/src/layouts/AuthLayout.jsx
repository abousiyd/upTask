import React from 'react'
import { Outlet } from "react-router-dom";

const AuthLayout = () => {
    return (
        <>
        <main className='container max-auto mt-5 md:mt-20 p-5 md:flex md:justify-center bg-red-100'>
            <div className='md:w-2/3 lg:1/2'>
                <Outlet/>

            </div>
        </main>
        </>
    )
}

export default AuthLayout;