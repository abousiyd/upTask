import {useEffect, useState} from 'react'
import {useParams, Link} from "react-router-dom"
import axios from "../../axios"
import Alerta from "../components/Alerta"

const NuevoPassword = () => {

    const params = useParams()
    const {token} = params
    const [alerta, setAlerta] = useState({})
    const [tokenValido, setTokenValido] = useState(false)
    const [password, setPassword] = useState('')
    const [passwordModificado, setPasswordModificado] = useState(false)


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

    const handleSubmit = async (e) => {
        e.preventDefault()
        
        if(password.length < 3 || password === '') {
            setAlerta({
                msg: "El password minimo es de 3 caracteres",
                error: true
            })
            return
        }

        try{
            const {data} = await axios().post(`/usuarios/olvidar-password/${token}`, {password})
            setAlerta({
                msg: data.msg,
                error: false
            })
            setPassword('')
            setPasswordModificado(true) //en caso de que el password sea modificado pues pasamos a true y nos rederecciona a / "login"
        }catch(error) {
            setAlerta({
                msg: error.response.data.msg,
                error: true
            })
            eliminarAlerta()
        }
    }

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
            
                <form 
                    className="my-10 bg-white shadow rounded-lg p-10"
                    onSubmit={handleSubmit}
                >
                
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
                            value={password}
                            onChange={e => setPassword(e.target.value) }
                            />
                    </div>

                    <input 
                        type="submit" 
                        value="Guardar nuevo password" 
                        className='bg-sky-700 mb-5 w-full py-3 text-white uppercase font-bold rounded hover:cursor-pointer hover:bg-sky-800 transition-colors'
                    />
                </form>
            }

            {
                passwordModificado && (
                <Link
                        className='block text-center my-5 text-state-500 uppercase text-sm'
                        to="/"
                    >Iniciar Sesi??n</Link>
                )
          }
        </>
  )
}

export default NuevoPassword