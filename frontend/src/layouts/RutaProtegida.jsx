import { Outlet, Navigate } from "react-router-dom";
import useAuth from "../hooks/useAuth";

const RutaProtegida = () => {

    const { auth } = useAuth()

    console.log(auth, 1100)
  return (
    <>
    {auth._id ? 'molt be desgraciat' : <Navigate to={'/'} />}
    </>

  )
}

export default RutaProtegida