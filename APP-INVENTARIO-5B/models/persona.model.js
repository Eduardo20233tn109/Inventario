const mongoose = require('mongoose');
const PersonaSchema = mongoose.Schema({
    nombre: {type: String, required: true},
    apellido: {type: String, required: true},
    fechaNacimiento: {type: Date, required: true},
    rfc:{type: String, required: true, unique: true},
    correo: {type: String, required: true, unique: true},
});
//en mongo aparacera el nombre de la coleccion en plural, en este caso "Personas"
module.exports = mongoose.model('Persona', PersonaSchema);