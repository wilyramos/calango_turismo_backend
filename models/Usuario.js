import mongoose from "mongoose";
import bcrypt from "bcrypt";
import generarId from "../helpers/generarId.js";

const UsuarioSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
        trim: true
    },
    password: {
        type: String,
        required: true,
    },
    preferences: {
        interests: [String],  // Naturaleza, cultura, deportes, etc.
        budget: Number,
    },
    recomendations: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Place",
        }
    ],
    visitedPlaces: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Place",
        }
    ],
    role: {
        type: String,
        default: "user",
    },
    token :{
        type: String,
        default: generarId()
    },
    confirmado: {
        type: Boolean,
        default: false
    },
});

UsuarioSchema.pre("save", async function(next) {
    const usuario = this;

    if (!usuario.isModified("password")) {
        return next();
    }
    const salt = await bcrypt.genSalt(10);
    const hash = await bcrypt.hash(usuario.password, salt);
    usuario.password = hash;
    next();
}); // Middleware for hashing password

UsuarioSchema.methods.comparePassword = async function(passwordForm) {
    return await bcrypt.compare(passwordForm, this.password);
}; // Method for comparing password

const Usuario = mongoose.model("Usuario", UsuarioSchema);
export default Usuario;

