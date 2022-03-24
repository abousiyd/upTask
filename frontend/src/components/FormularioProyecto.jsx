import {useState} from 'react'
import useProyectos from '../hooks/useProyectos'
import Alerta from './Alerta'

const FormularioProyecto = () => {

    const [nombre, setNombre] = useState('')
    const [descripcion, setDescripcion] = useState('')
    const [fechaEntrega, setFechaEntrega] = useState('')
    const [cliente, setCliente] = useState('')

    const {mostrarAlerta, alerta, submitProyecto} = useProyectos()

    const handleOnSubmit = async e => {
        e.preventDefault()

        if([nombre, descripcion, fechaEntrega, cliente].includes('')) {
            
            mostrarAlerta({
                msg: 'Todos los Campos son Obligatorios',
                error: true
            })
            return
        }
        
        //pasar datos hacia el providor
        await submitProyecto({nombre, descripcion, fechaEntrega, cliente})
        setNombre('')
        setDescripcion('')
        setFechaEntrega('')
        setCliente('')

    }

    const {msg} = alerta

  return (
    <form 
        onSubmit={handleOnSubmit}
        className='bg-white py-10 px-5 md:w-1/2 rounded-lg shadow'
    >
        {msg && <Alerta alerta={alerta} />}

        <div className='mb-5'>
            <label 
                className='text-gray-700 uppercase font-bold text-sm'
                htmlFor="nombre"
            >Nombre Proyecto</label>

            <input 
                id='nombre'
                type='text'
                className='border w-full p-2 mt-2 placeholder-gray-400 rounded-md'
                placeholder='Nombre del Proyecto'
                value={nombre}
                onChange={e => setNombre(e.target.value)}
            />

            <label 
                className='text-gray-700 uppercase font-bold text-sm'
                htmlFor="descripcion"
            >Descripción</label>

            <textarea 
                id='descripcion'
                type='text'
                className='border w-full p-2 mt-2 placeholder-gray-400 rounded-md'
                placeholder='descripcion del Proyecto'
                value={descripcion}
                onChange={e => setDescripcion(e.target.value)}
            />

            <label 
                className='text-gray-700 uppercase font-bold text-sm'
                htmlFor="fecha-entrega"
            >Fecha Entrega</label>

            <input 
                id='fecha-entrega'
                type='date'
                className='border w-full p-2 mt-2 placeholder-gray-400 rounded-md'
                value={fechaEntrega}
                onChange={e => setFechaEntrega(e.target.value)}
            />

            <label 
                className='text-gray-700 uppercase font-bold text-sm'
                htmlFor="cliente"
            >Nombre del Cliente</label>

            <input 
                id='cliente'
                type='text'
                className='border w-full p-2 mt-2 placeholder-gray-400 rounded-md'
                placeholder='Nombre del Cliente'
                value={cliente}
                onChange={e => setCliente(e.target.value)}
            />

            <input
                type='submit'
                value='Crear Proyecto'
                className=' mt-5 bg-sky-600 w-full p-3 uppercase font-bold text-white rounded cursor-pointer hover:bg-sky-700 transition-colors'
            />

        </div>
    </form>
  )
}

export default FormularioProyecto