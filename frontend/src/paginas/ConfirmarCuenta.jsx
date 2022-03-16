import {useEffect, useState} from 'react'
import {useParams, Link} from "react-router-dom"
import axios from "../../axios"
import Alerta from "../components/Alerta"

const ConfirmarCuenta = () => {

  const params = useParams() // obtenir el id o token del usuario, que se asigna en el phat de la routas: App.jsx   >>> <Route path="confirmar/:id" index element={<ConfirmarCuenta />} />
  const {id} = params

console.log(id)

  const [alerta, setAlerta] = useState({})
  const [cuentaConfirmada, setCuentaConfirmada] = useState(false)

  useEffect( () => {
    
    const confirmarCuenta = async () => {
      
      try{
        //no escribo toda la url pk en axios tengo variable almacenada
        const url = `/usuarios/confirmar/${id}`
        const {data} = await axios().get(url)
        console.log(data, 121212)
        setAlerta({
          msg: data.msg,
          error: false
        })
        setCuentaConfirmada(true)
      }catch(error) {
        console.log(error)
        setAlerta({
          msg: error.response.data.msg,
          error: true
        })
      }
    }
    confirmarCuenta()
  }, [])

  const {msg} = alerta;
  return (
    <>
        <h1 className='text-sky-600 font-black text-6xl capitalize'>
            Confirma tu cuenta y comienza a crear tu <span className=' text-slate-700'>proyectos</span>
        </h1>

        <div className='mt-20 md:mt-5 shadow-llg px-5 py-10 rounded-xl bg-white'>
          {msg && <Alerta alerta={alerta} />}

          {
            cuentaConfirmada && (
              <Link
                    className='block text-center my-5 text-state-500 uppercase text-sm'
                    to="/"
                >Iniciar Sesión</Link>
            )
          }
        </div>
    </>
  )
}

export default ConfirmarCuenta