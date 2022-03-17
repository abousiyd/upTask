import {useEffect, useState} from 'react'
import {useParams, Link} from "react-router-dom"
import axios from "../../axios"
import Alerta from "../components/Alerta"

const NuevoPassword = () => {

    const params = useParams()
    const {token} = params
    const [alerta, setAlerta] = useState({})
  const [tokenValido, setTokenValido] = useState(false)


    useEffect( () => {

        const comprobarToken = async () => {

            try{
                await axios().get(`/usuarios/olvidar-password/${token}`)
                setTokenValido(true)
            }catch(error) {
                setAlerta({
                    msg: error.response.data.msg,
                    error: true
                })
                eliminarAlerta()
            }
        }
        comprobarToken()
    }, [])

    const eliminarAlerta = () => {
        setTimeout( () => {
            setAlerta({
                msg: null,
                error: false
            })
        }, 5000 )
    }

    const {msg} = alerta

  return (
    <>
            <h1 className='text-sky-600 font-black text-6xl capitalize'>
                Reestablece tu password y no pierdas acceso a tus <span className=' text-slate-700'>proyectos</span>
            </h1>

            {msg && <Alerta alerta={alerta} />}

            {tokenValido && 
            
            <form className="my-10 bg-white shadow rounded-lg p-10">
            
                <div className='my-5'>

                    <label
                        className='uppercase text-gray-600 block text-xl font-bold'
                        htmlFor='password'
                    >Nuevo Password</label>

                    <input 
                        id='password'
                        type="password" 
                        placeholder='Escribe tu nuevo password' 
                        className='w-full mt-3 p-3 border rounded-xl bg-gray-50'
                        />
                </div>

                <input 
                    type="submit" 
                    value="Guardar nuevo password" 
                    className='bg-sky-700 mb-5 w-full py-3 text-white uppercase font-bold rounded hover:cursor-pointer hover:bg-sky-800 transition-colors'
                />
            </form>
            }
        </>
  )
}

export default NuevoPassword