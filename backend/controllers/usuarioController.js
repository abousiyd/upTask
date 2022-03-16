import Usuario from "../models/Usuario.js"
import generarId from "../helpers/generarId.js";
import generarJWT from "../helpers/generarJWT.js";


const registrar = async (req, res) => {
    // Evitar registros duplicados
    const { body: {email}} = req

    const existeUsuario = await Usuario.findOne({email})
    if(existeUsuario) {
        const error = new Error("Usuario ya registrado")
        return res.status(400).json({msg: error.message})
    }
    try{
        const usuario = new Usuario(req.body)
        usuario.token = generarId()
        await usuario.save();
        res.json({
            msg: "Usuario Creado Correctamente, Revisa tu Email para confirmar tu cuenta",
        })
    } catch(error) {
        console.log(error)
    }
}

const autenticar = async (req, res) => {
    const { body: {email, password}} = req
    // Comprobar si el usuario existe
    const usuario = await Usuario.findOne({email})
    if(!usuario) {
        const error = new Error("Usuario no existe")
        return res.status(404).json({msg: error.message})
    }
    // Comprobar si el usuario esta confirmado
    if(!usuario.confirmado) {
        const error = new Error("Tu cuenta no ha sido confirmada")
        return res.status(403).json({msg: error.message})
    }
    // comprobar si el password esta correcto
    if(await usuario.comprobarPassword(password)) {
        res.json({
            _id: usuario._id,
            nombre: usuario.nombre,
            email: usuario.email,
            token: generarJWT(usuario._id) // aqui estoy generando un token para el usuario logeado
        })
    }else{
        const error = new Error("El password es incorrecto")
        return res.status(403).json({msg: error.message})
    }
}
// confirmacion del password antes de logear
const confirmar = async (req, res) => {
    const { params: {token}} = req

    const usuarioConfirmar = await Usuario.findOne({token})
    if(!usuarioConfirmar) {
        const error = new Error("Token no valido")
        return res.status(403).json({msg: error.message})
    }
    try{
        usuarioConfirmar.confirmado = true;
        usuarioConfirmar.token = ''; // la llave token se usa una sola vez para logear, despues se borra, asi no sea visto para utros usuarios.
        res.json({msg: "Usuario confirmado correctamente"})
    }catch(error){
        console.log(error)
    }

}

const olvidarPassword = async (req, res) => {
    const { body: {email}} = req
    const usuario = await Usuario.findOne({email})
    await usuario.save()
    res.json({msg: "Hemos enviado un email con las instrucciones"})
    if(!usuario) {
        const error = new Error("El usuario no existe")
        return res.status(404).json({msg: error.message})
    }

    try{
        usuario.token = generarId()
        console.log("aqi etamos", usuario)
    }catch(error) {
        console.log(error)
    }
}

const comprobarToken = async (req, res) => {
    const { params: {token}} = req

    const tokenValido = await Usuario.findOne({token})
    
    if(tokenValido) {
        res.json({msg: "Token valido y el usuario existe"})
    }else {
        const error = new Error("Token no valido")
        return res.status(404).json({msg: error.message})
    }
}

const nuevoPassword = async (req, res) => {
    const { params: {token}} = req
    const { body: {password}} = req

    const usuario = await Usuario.findOne({token})

    if(usuario) {
        usuario.password = password
        usuario.token = ""
        await usuario.save()
        res.json({msg: "Password ha sido modificado correctamente"})
    }else{
        const error = new Error("Token no valido")
        return res.status(404).json({msg: error.message})
    }
}

const perfil = async (req, res) => {

    const {usuario} = req
    res.json(usuario)
}


export {registrar, autenticar, confirmar, olvidarPassword, comprobarToken, nuevoPassword, perfil}
