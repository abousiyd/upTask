import mongoose from "mongoose";

const proyectosSchema = mongoose.Schema({
    nombre:{
        type: String,
        trim: true,
        require: true
    },
    descripcion:{
        type: String,
        trim: true,
        require: true
    },
    cliente:{
        type: String,
        trim: true,
        require: true
    },
    creador:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Usuario'
    },
    fechaEntrega:{
        type: Date,
        trim: Date.now()
    },
    Colaboradores: [
        {
            type: mongoose.Schema.Types.ObjectId, 
            ref: 'Usuario'
        }
    ]    
}, 
    {
        timestamps: true,
    }
)

const Proyecto = mongoose.model("Proyecto", proyectosSchema)

export default Proyecto;
