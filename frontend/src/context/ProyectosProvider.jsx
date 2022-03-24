import { useState, useEffect, createContext } from 'react'
import { useNavigate } from 'react-router-dom'
import axios from '../../axios'

const ProyectosContext = createContext()

const ProyectosProvider = ({children}) => {

    const [proyectos, setProyectos] = useState([])
    const [alerta, setAlerta] = useState({})
    const [proyecto, setProyecto] = useState({})
    const [cargando, setCargando] = useState(false)


    const navigate = useNavigate()

    useEffect( () => {
        const mostrarProyectos =  async () => {
            try{
                const token = localStorage.getItem('token')
                if(!token) return

                const config = {
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: `Bearer ${token}`
                    }
                }

                const {data} = await axios().get('/proyectos', config)
                setProyectos(data)
                // console.log(data)
            }catch(error){
                console.log(error)
            }
        }
        mostrarProyectos()
    }, [])

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

            const { data } = await axios().post('/proyectos', proyecto, config)
            setProyectos([  // setear estado de proyectos
                ...proyectos,
                data
            ])
            setAlerta({
                msg: "Proyecto Creado Correctamente",
                error: false
            })
            setTimeout( () => {
                setAlerta({})
                navigate('/proyectos')
            }, 3000)

        }catch(error) {
            console.log(error)
        }
    }

    const mostrarProyecto = async (id) =>{
        setCargando(true)
        try{
            const token = localStorage.getItem('token')
            if(!token) return

            const config = {
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`
                }
            }

            const { data } = await axios().get(`/proyectos/${id}`, config)
            setProyecto(data)
        }catch(error) {
            console.log(error)
        }finally{
            setCargando(false)
        }

    }

    return (
        <ProyectosContext.Provider
            value={{
                proyectos,
                mostrarAlerta,
                alerta,
                submitProyecto,
                mostrarProyecto,
                proyecto,
                cargando
            }}
        >{children}
        </ProyectosContext.Provider> 
    )
}

export {
    ProyectosProvider
};

export default ProyectosContext;