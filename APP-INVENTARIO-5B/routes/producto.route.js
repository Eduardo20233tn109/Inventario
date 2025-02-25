const express = require('express');
const ProductoController = require('../controllers/producto.controller');
const router = express.Router();

// Obtener todos los productos
router.get('/', ProductoController.getAllProductos);

// Obtener un producto por ID
router.get('/:id', ProductoController.getProductoById);

// Obtener un producto por número de serie
router.get('/numSerie/:numSerie', ProductoController.getProductoByNumSerie);

// Crear un producto
router.post('/', ProductoController.createProducto);

module.exports = router;