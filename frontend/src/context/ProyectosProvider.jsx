import { useState, useEffect, createContext } from 'react'
import { useNavigate } from 'react-router-dom'
import axios from '../../axios'


const ProyectosContext = createContext()

const ProyectosProvider = ({children}) => {

    const [proyectos, setProyectos] = useState([])
    const [alerta, setAlerta] = useState([])

    const navigate = useNavigate()

    const mostrarAlerta = (alerta) => {
        setAlerta(alerta)        
        eliminarAlerta()
    }

    const eliminarAlerta = () => {
        setTimeout( () => {
            setAlerta({
                msg: null,
                error: false
            })
        }, 5000 )
    }

    const submitProyecto = async proyecto => {

        try{
            const token = localStorage.getItem('token')
            if(!token) return

            const config = {
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`
                }
            }

            const {data} = await axios().post('/proyectos', proyecto, config)
            console.log(data, 9000)

            setAlerta({
                msg: "Proyecto Creado Correctamente",
                error: false
            })
            setTimeout( () => {
                setAlerta({})
                navigate('/proyectos')
            }, 3000)

        }catch(error) {

        }
    }

    return (
        <ProyectosContext.Provider
            value={{
                proyectos,
                mostrarAlerta,
                alerta,
                submitProyecto
            }}
        >{children}
        </ProyectosContext.Provider> 
    )
}

export {
    ProyectosProvider
};

export default ProyectosContext;