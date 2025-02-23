const PersonaRepository = require('../repositories/persona.repository');
const Validaciones = require('../utils/Validaciones');
const Utils = require('../utils/utils.js');

class PersonaService {
    async getAllPersonas() {
        return await PersonaRepository.getAllPersonas();
    }

    async getPersonaById(id) {
        const persona = await PersonaRepository.getPersonaById(id);
        if (!persona) {
            throw new Error('Persona no encontrada');
        }
        return persona;
    }

    async createPersona(persona) {
        //VALIDAR QUE TODOS LOS CAMPOS VENGAN EN EL OBJETO PERSONA
        if (!persona.nombre || !persona.apellido || !persona.fechaNacimiento || !persona.rfc) {
            throw new Error('Todos los campos son requeridos');
        }
        //VALIDAR QUE EL FORMATO DEL RFC SEA VALIDO 
        Validaciones.validarRFC(persona.rfc);

        Validaciones.validarCorreo(persona.correo);

        //VALIDAR QUE EL RFC NO EXISTA 
        const personaByRFC = await PersonaRepository.getPersonaByRFC(persona.rfc);

        const personaByCorreo = await PersonaRepository.getPersonaByCorreo(persona.correo);

        if (personaByRFC) {
            throw new Error('El RFC ya existe');
        }
        if (personaByCorreo) {
            throw new Error('El correo ya existe');
        }
        //VALIDAR QUE LA FECHA SEA VALIDA
        if (Utils.calcularEdad(persona.fechaNacimiento) < 18) {
            throw new Error('La persona debe ser mayor de edad');
        }
        //CREAR LA PERSONA
        return await PersonaRepository.createPersona(persona);
    }

    async updatePersona(id, persona) {  
        //VALIDAR QUE LA PERSONA EXISTA 
        const personaById = await PersonaRepository.getPersonaById(id);
        if (!personaById) {
            throw new Error('Persona no encontrada');
        }

        //TODOS LOS CAMPOS SON REQUERIDOS
        if (!persona.nombre || !persona.apellido || !persona.fechaNacimiento || !persona.rfc) {
            throw new Error('Todos los campos son requeridos');
        }
        //VALIDAR QUE EL RFC SEA VALIDO
        Validaciones.validarRFC(persona.rfc);

        //VALIDAR QUE EL CORREO SEA VALIDO
        Validaciones.validarCorreo(persona.correo);

        const personaByRFCAndNotId = await PersonaRepository.getPersonaByRFCAndNotId(id, persona.rfc);


        //VALIDAR QUE EL RFC NO EXISTA
        const personaByRFC = await PersonaRepository.getPersonaByRFC(persona.rfc);
        if (personaByRFC && personaByRFC._id != id) {
            throw new Error('El RFC ya existe');
        }

        //VALIDAR QUE EL CORREO NO EXISTA
        const personaByCorreo = await PersonaRepository.getPersonaByCorreo(persona.correo);
        if (personaByCorreo && personaByCorreo._id != id) {
            throw new Error('El correo ya existe');
        }
    


        //VALIDAR QUE LA FECHA SEA VALIDA
        if (Utils.calcularEdad(persona.fechaNacimiento) < 18) {
            throw new Error('La persona debe ser mayor de edad');
        }
        //ACTUALIZAR LA PERSONA
        return await PersonaRepository.updatePersona(id, persona);

        //VALIDAR QUE LA PERSONA SEA MAYOR DE EDAD
        if (Utils.calcularEdad(persona.fechaNacimiento) < 18) {
            throw new Error('La persona debe ser mayor de edad');
        }
        return await PersonaRepository.updatePersona(id, persona);

    }

    async deletePersona(id) {
        //VALIDAR QUE LA PERSONA EXISTA
        const persona = await PersonaRepository.getPersonaById(id);
        if (!persona) {
            throw new Error('Persona no encontrada');
        }
        return await PersonaRepository.deletePersona(id);
    }
}

module.exports = new PersonaService();