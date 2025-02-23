const PersonaService = require('../services/persona.service');
const Validaciones = require('../utils/Validaciones');
const Utils = require('../utils/utils.js');

class PersonaController {
    async getAllPersonas(req, res) {
        try {
            const personas = await PersonaService.getAllPersonas();
            res.status(200).json(personas);

        } catch (e) {
            res.status(400).json({ message: e.message });
        }
    }
    async getPersonaById(req, res) {
        try {//Validar que el id venga en la peticion
            const personaId = req.params.id;
            if (!personaId||personaId===''||personaId===undefined || personaId===null) {
                throw new Error('El id es requerido');
            }
            const persona = await PersonaService.getPersonaById(personaId);
            res.json(persona);
        } catch (e) {
            res.status(400).json({ message: e.message });
        }
    }

    async createPersona(req, res) {
        try {
            const persona = await PersonaService.createPersona(req.body);
            res.json(persona);  
        }catch(e){
            res.status(400).json({message: e.message});
    
        }
    }
    async updatePersona(req,res){
        try{
                //VALIDAR QUE EL ID VENGA EN LA PETICION
                const personaId = req.params.id;
                if (!personaId||personaId===''||personaId===undefined || personaId===null) {
                    throw new Error('El id es requerido');
                }
                const persona = await PersonaService.updatePersona(personaId,req.body);
                
        }catch(e){
            res.status(400).json({message: e.message});
        }

    }

    async deletePersona(req,res){
        try{
            //VALIDAR QUE EL ID VENGA EN LA PETICION
            const personaId = req.params.id;
            if (!personaId||personaId===''||personaId===undefined || personaId===null) {
                throw new Error('El id es requerido');
            }
            const persona = await PersonaService.deletePersona(personaId);
            res.json(persona);
        }catch(e){
            res.status(400).json({message: e.message});
        }
    }


}


module.exports = new PersonaController();