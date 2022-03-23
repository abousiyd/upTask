import React from 'react'
import useProyectos from "../hooks/useProyectos"


const Proyectos = () => {

  const {proyectos} = useProyectos()
  console.log(proyectos, 33322111)

  return (
    <>
      <h1 className='text-4xl font-black'>Proyectos</h1>

      <div>
        
      </div>
    </>
  )
}

export default Proyectos