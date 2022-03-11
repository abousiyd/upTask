import express from "express";
const router = express.Router()

import {registrar, autenticar, confirmar, olvidarPassword, comprobarToken, nuevoPassword, perfil} from "../controllers/usuarioController.js"
import checkAuth from "../middleware/checkAuth.js"

router.post('/', registrar )
router.post('/login', autenticar )
router.get('/confirmar/:token', confirmar )
router.post('/olvidar-password', olvidarPassword )
router.get('/olvidar-password/:token', comprobarToken )
router.post('/olvidar-password/:token', nuevoPassword )

router.get("/perfil", checkAuth, perfil)
// checkAuth: comprobar si jwt esta valido, toda las comprobaciones validas, despues al seguinte middleware PERFIL


export default router;