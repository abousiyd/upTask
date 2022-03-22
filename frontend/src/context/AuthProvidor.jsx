import {useState, useEffect, createContext} from 'react'
import { useNavigate } from 'react-router-dom'
import axios from '../../axios'

const AuthContext = createContext()

const AuthProvidor = ({children}) => {

    const [auth, setAuth] = useState({}) // para returnar datos una vez estamos logeados

    const navigate = useNavigate()

    useEffect( () => {
        const autenticarUsuario = async () => {
            const token = localStorage.getItem('token')

            if(!token) return
            console.log('si hay token', token)


            const config = {
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`
                }
            }
    
            try{
                const { data } = await axios().get(`/usuarios/perfil`, config)
                setAuth(data)
                navigate('/proyectos')
            }catch(error) {
                setAuth({})
            }
        }
        autenticarUsuario()
    }, [])


    return (
        < AuthContext.Provider
            value={{
                auth,
                setAuth
            }}
        >
            {children}
        </AuthContext.Provider>
    )
}

export {
    AuthProvidor
};

export default AuthContext;