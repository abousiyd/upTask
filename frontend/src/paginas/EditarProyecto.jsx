import { useEffect } from 'react'
import {useParams, Link} from 'react-router-dom'
import useProyectos from "../hooks/useProyectos"
import FormularioProyecto from '../components/FormularioProyecto'

export const EditarProyecto = () => {

    const params = useParams()
    const {mostrarProyecto, proyecto, cargando} = useProyectos()


    useEffect( () => {
        mostrarProyecto(params.id)

    }, [])

    const {nombre} = proyecto

    if(cargando) return 'cargando...'
  return (
    <div>
        <h1 className='font-black text-4xl'>Editar Proyecto: {nombre}</h1>

        <div className='mt-10 flex justify-center'>
            <FormularioProyecto />
        </div>
    </div>
  )
}

export default EditarProyecto;