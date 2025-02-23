const express = require('express');
const PersonaController = require('../controllers/persona.controller');
const router = express.Router();

//Obtener todas las personas
router.get('/personas', PersonaController.getAllPersonas);
router.get('/id/:id', PersonaController.getPersonaById);
router.post('/personas', PersonaController.createPersona);
router.put('/personas/:id', PersonaController.updatePersona);
router.delete('/personas/:id', PersonaController.deletePersona);

module.exports = router;
