import mongoose from "mongoose";


const proyectosSchema = mongoose.Schema({
    name:{
        type: String,
        trim: true,
        require: true
    },
    description:{
        type: String,
        trim: true,
        require: true
    },
    fechaEntrega:{
        type: Date,
        trim: Date.now()
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

const Proyecto = mongoose-module("Proyecto", proyectosSchema)

export default Proyecto;