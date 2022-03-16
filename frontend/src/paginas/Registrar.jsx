import {useState} from 'react'
import axios from "../../axios"
import { Link } from 'react-router-dom';
import Alerta from '../components/Alerta';


const Registrar = () => {

    const [nombre, setNombre] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [repetirPassword, setRepetirPassword] = useState('')
    const [alerta, setAlerta] = useState({
        msg: null,
        error: false
    })
    

    const handleOnSubmit = async (e) => {
        e.preventDefault()
        
        if([nombre, email, password, repetirPassword].includes('')) {
            setAlerta({
                msg: "Todos los campos son obligatorios",
                error: true
            })
            eliminarAlerta()
            return
        }
        if(password !== repetirPassword) {
            setAlerta({
                msg: "El Password no coincide con el alterior",
                error: true
            })
            eliminarAlerta()
            return
        }
        if(password.length < 3) {
            setAlerta({
                msg: "El Password es muy corto, minimi 3 caracteres",
                error: true
            })
            eliminarAlerta()
            return
        }

        setAlerta({})

        try{
            // estoy importando el url para hacer llamada al servidor des de axios
            const {data} = await axios().post(`/usuarios`, {nombre, password, email})
            // const data = await axios().post(`http://localhost:4000/api/usuarios`, {nombre, password, email})
            setAlerta({
                msg: data.msg,
                error: false
            })

            setNombre('')
            setEmail('')
            setPassword('')
            setRepetirPassword('')
            eliminarAlerta('')

        }catch(error) {
            // error del servidor
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
        }, 8000 )

    }

    const {msg} = alerta

    return (
        <>
            <h1 className='text-sky-600 font-black text-6xl capitalize'>
                Crea tu cuenta y administra tus <span className=' text-slate-700'>proyectos</span>
            </h1>

            {msg && <Alerta alerta={alerta} />}

            <form className="my-10 bg-white shadow rounded-lg p-10" onSubmit={handleOnSubmit}>
            <div className='my-5'>

                <label
                    className='uppercase text-gray-600 block text-xl font-bold'
                    htmlFor='nombre'
                >Nombre</label>

                <input 
                    id='nombre'
                    type="text" 
                    placeholder='Tu Nombre' 
                    className='w-full mt-3 p-3 border rounded-xl bg-gray-50'
                    value={nombre}
                    onChange={e  => setNombre(e.target.value)}
                    />
                </div>

                <div className='my-5'>

                    <label
                        className='uppercase text-gray-600 block text-xl font-bold'
                        htmlFor='email'
                    >Email</label>

                    <input 
                        id='email'
                        type="email" 
                        placeholder='Email de registro' 
                        className='w-full mt-3 p-3 border rounded-xl bg-gray-50'
                        value={email}
                        onChange={e  => setEmail(e.target.value)}
                        />
                </div>

                <div className='my-5'>

                    <label
                        className='uppercase text-gray-600 block text-xl font-bold'
                        htmlFor='password'
                    >Password</label>

                    <input 
                        id='password'
                        type="password" 
                        placeholder='Password de registro' 
                        className='w-full mt-3 p-3 border rounded-xl bg-gray-50'
                        value={password}
                        onChange={e  => setPassword(e.target.value)}
                        />
                </div>

                <div className='my-5'>

                    <label
                        className='uppercase text-gray-600 block text-xl font-bold'
                        htmlFor='password2'
                    >Repetir Password</label>

                    <input 
                        id='password2'
                        type="password" 
                        placeholder='Repetir Tu Password' 
                        className='w-full mt-3 p-3 border rounded-xl bg-gray-50'
                        value={repetirPassword}
                        onChange={e  => setRepetirPassword(e.target.value)}
                        />
                </div>

                <input 
                    type="submit" 
                    value="Crear Cuenta" 
                    className='bg-sky-700 mb-5 w-full py-3 text-white uppercase font-bold rounded hover:cursor-pointer hover:bg-sky-800 transition-colors'
                />
            </form>

            <nav className='lg:flex lg:justify-between'>
                <Link
                    className='block text-center my-5 text-state-500 uppercase text-sm'
                    to="/"
                >¿Ya tienes una cuenta? Inicia Sesión</Link>

                <Link
                    className='block text-center my-5 text-state-500 uppercase text-sm'
                    to="/olvide-password"
                >Olvide Mi Passsword</Link>
            </nav>
        </>
    )
}

export default Registrar;