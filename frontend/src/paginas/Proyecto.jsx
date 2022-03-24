import {useParams} from 'react-router-dom'
import { useEffect } from 'react'

import useProyectos from "../hooks/useProyectos"


const Proyecto = () => {

    const params = useParams()
    const {mostrarProyecto} = useProyectos()

    useEffect( () => {
        mostrarProyecto(params.id)

    }, [])




  return (
    <div>Proyecto</div>
  )
}

export default Proyecto