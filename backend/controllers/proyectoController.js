import Proyecto from "../models/Proyecto.js"

//crear nuevo proyecto
const nuevoProyecto = async (req, res) => {
    
    const proyecto = new Proyecto(req.body)
    proyecto.creador = req.usuario._id
    console.log(proyecto)
    
    try{
        const proyectoAlmacenado = await proyecto.save();
        res.json(proyectoAlmacenado)
    }catch(error) {
        console.log(error)
    }
};
//obtener proyectos de todos los usuarios logeados.
const obtenerProyectos = async (req, res) => {
    // .where("creador").equals(req.usuario) >>>> para evitar que me traiga todos los proyectos de la bd
    const proyectos = await Proyecto.find().where("creador").equals(req.usuario)
    res.json(proyectos)
};


const obtenerProyecto = async (req, res) => {
    const {params: {id}} = req
    try{
        const proyecto = await Proyecto.findById(id)
        
        if(proyecto.creador.toString() !== req.usuario._id.toString()) {
            return res.status(401).json({msg: "Acción no valida"})
        }

        return res.json(proyecto)
    }catch(error){ 
        return res.status(404).json({msg: "No encuentrado"})
    }
};

const editarProyecto = async (req, res) => {
    const {params: {id}} = req
    try{
        const proyecto = await Proyecto.findById(id)
        console.log(proyecto)
        
        if(proyecto.creador.toString() !== req.usuario._id.toString()) {
            return res.status(401).json({msg: "Acción no valida"})
        }

        proyecto.nombre = req.body.nombre || proyecto.nombre
        proyecto.description = req.body.description || proyecto.description
        proyecto.fechaEntrega = req.body.fechaEntrega || proyecto.fechaEntrega
        proyecto.cliente = req.body.cliente || proyecto.cliente

        if(proyecto){
            proyecto.save()
            res.json({msg: "Proyecto Editado Correctamente"})
            return res.json(proyecto)
        }else {
            console.log(error)
        }

    }catch(error){ 
        return res.status(404).json({msg: "No encuentrado", error})
    }
};

const eliminarProyecto = async (req, res) => {
    const {params: {id}} = req
    try{
        const proyecto = await Proyecto.findById(id)
        console.log(proyecto)
        
        // TODO
        if(proyecto.creador.toString() !== req.usuario._id.toString()) {
            return res.status(401).json({msg: "Acción no valida"})
        }

        if(proyecto){
            await Proyecto.deleteOne({_id: id})
            return res.json({msg: "Proyecto Eliminado"})
            // return res.json(proyecto)
        }

    }catch(error){ 
        return res.status(404).json({msg: "No encuentrado", error})
    }
};

const agregarColaborador = async (req, res) => {};

const eliminarColaborador = async (req, res) => {};

const obtenerTareas = async (req, res) => {};


export {
    obtenerProyectos, 
    nuevoProyecto, 
    obtenerProyecto, 
    editarProyecto, 
    eliminarProyecto, 
    agregarColaborador, 
    eliminarColaborador, 
    obtenerTareas
}
