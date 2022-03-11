import jwt from "jsonwebtoken";
import Usuario from "../models/Usuario.js";


const checkAuth = async (req, res, next) => {

    if(req.headers.authorization && req.headers.authorization.startsWith("Bearer")) {
        try {
            const token = req.headers.authorization.split(" ")[1]

            const decoded = jwt.verify(token, process.env.JWT_SECRET)

            req.usuario = await Usuario.findById(decoded.id).select("-password -confirmado -token -createdAt -updatedAt -__v")
            // es para quitar los seguintes parametros, ex: -xxxx -aaaa
            // .select("-password - confirmado -token -createdAt -updateAt -__v")
            next()
        } catch (error) {
            return res.status(404).json({msg: "Token no valido"})
        }
    } else {
        const error = new Error("No hay token")
        return res.status(401).json({msg: error.message})
    }
}

export default checkAuth;