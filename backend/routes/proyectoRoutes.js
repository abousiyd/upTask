import express from "express";
const router = express.Router()
import {obtenerProyectos, nuevoProyecto, obtenerProyecto, editarProyecto, eliminarProyecto, agregarColaborador, eliminarColaborador, obtenerTareas} from "../controllers/proyectoController.js"
import checkAuth from "../middleware/checkAuth.js"


// primero revisar la authenticacion del usuario y despues ontenerProyectos
router.get('/', checkAuth, obtenerProyectos)
router.post('/', checkAuth, nuevoProyecto)

router.get('/:id', checkAuth, obtenerProyecto)
router.put('/:id', checkAuth, editarProyecto)
router.delete('/:id', checkAuth, eliminarProyecto)

router.get('/tareas/:id', checkAuth, obtenerTareas)
router.get('/agregar-colaborador/:id', checkAuth, agregarColaborador)
router.get('/eliminar-colaborador/:id', checkAuth, eliminarColaborador)

export default router;