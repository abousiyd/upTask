import Proyecto from "../models/Proyecto.js"
import Tarea from "../models/Tarea.js"

const agregarTarea = async (req, res) => {

    const { body: {proyecto}} = req

    const existeProyecto = await Proyecto.findById(proyecto)

    if(!existeProyecto) {
        const error = new Error("El proyecto no existe")
        return res.status(404).json({msg: error.message})
    }

    if(existeProyecto.creador.toString() !== req.usuario._id.toString()) {
        const error = new Error("No tienes permisos para añadir la tarea")
        return res.status(404).json({msg: error.message})
    }

    try{
        const tareaAlmacenada = await Tarea.create(req.body)
        return res.json(tareaAlmacenada)
    } catch(error) {
        return res.status(404).json({msg: "No se ha creado la tarea"})
    }
}

const obtenerTarea = async (req, res) => {

    const {params: {id}} = req
    
    const tarea = await Tarea.findById(id).populate("proyecto")

    if(!tarea) {
        return res.status(404).json({msg: "Tarea no encontrada"})
    }

    if(tarea.proyecto.creador.toString() !== req.usuario._id.toString()) {
        return res.status(403).json({msg: "Acción no valida"})
    }

    res.json(tarea)
}


const actualizarTarea = async (req, res) => {

    const {params: {id}} = req
    
    const tarea = await Tarea.findById(id).populate("proyecto")

    if(!tarea) {
        return res.status(404).json({msg: "Tarea no encontrada"})
    }

    if(tarea.proyecto.creador.toString() !== req.usuario._id.toString()) {
        return res.status(403).json({msg: "Acción no valida"})
    }

    tarea.nombre = req.body.nombre || tarea.nombre
    tarea.description = req.body.description || tarea.description
    tarea.prioridad = req.body.prioridad || tarea.prioridad
    tarea.fechaEntrega = req.body.fechaEntrega || tarea.fechaEntrega

    try{
        const tareaAlmacenada = await tarea.save()
        res.json(tareaAlmacenada)

    }catch(error) {
        console.log(error)
    }
}

const eliminarTarea = async (req, res) => {

    const {params: {id}} = req
    
    const tarea = await Tarea.findById(id).populate("proyecto")

    if(!tarea) {
        return res.status(404).json({msg: "Tarea no encontrada"})
    }

    if(tarea.proyecto.creador.toString() !== req.usuario._id.toString()) {
        return res.status(403).json({msg: "Acción no valida"})
    }

    try{
        await tarea.deleteOne()
        res.json({msg: "Tarea eliminada"})

    }catch(error) {
        console.log(error)
    }

}


const cambiarEstado = async (req, res) => {}


export {
    agregarTarea,
    obtenerTarea,
    actualizarTarea,
    eliminarTarea,
    cambiarEstado
}