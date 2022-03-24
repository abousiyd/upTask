import React from 'react'
import useProyectos from "../hooks/useProyectos"
import PreviewProyecto from '../components/PreviewProyecto'


const Proyectos = () => {

  const {proyectos} = useProyectos()
  console.log(proyectos, 33322111)

  return (
    <>
      <h1 className='text-4xl font-black'>Proyectos</h1>

      <div className='bg-white shadow mt-10 rounded-lg p-5'>
        {proyectos.length ? 
          proyectos.map( proyecto => (
            <PreviewProyecto 
              key={proyectos._id}
              proyecto={proyecto}
            />
          ))
        :  <p className='text-center text-gray-600 uppercase'>No hay Proyectos</p>}
      </div>
    </>
  )
}

export default Proyectos