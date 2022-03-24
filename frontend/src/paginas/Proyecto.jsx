import {useParams} from 'react-router-dom'
import { useEffect } from 'react'

import useProyectos from "../hooks/useProyectos"


const Proyecto = () => {

    const params = useParams()
    const {mostrarProyecto, proyecto, cargando} = useProyectos()

    console.log(proyecto)

    useEffect( () => {
        mostrarProyecto(params.id)

    }, [])

    const {nombre} = proyecto

  return (

    cargando ? 'Cargando...' : (
        <div>
            <h1 className='font-black text-4xl'>{nombre}</h1>
        </div>
    )
  )
}

export default Proyecto