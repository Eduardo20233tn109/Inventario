const productoRepository = require('../repositories/producto.repository');
const Validaciones = require('../utils/Validaciones');

class ProductoService {
    async getAllProductos() {
        return await productoRepository.getAllProductos();
    }

    async getProductoById(id) {
        const producto = await productoRepository.getProductoById(id);
        if (!producto) {
            throw new Error('Producto no encontrado');
        }
        return producto;
    }

    async getProductoByNumSerie(numSerie) {
        const producto = await productoRepository.getProductoByNumSerie(numSerie);
        if (!producto) {
            throw new Error('Producto no encontrado');
        }
        return producto;
    }

    async createProducto(producto) {
        // VALIDAR QUE TODOS LOS CAMPOS VENGAN
        if (!producto.nombre || !producto.precio || !producto.fechaAquisicion || !producto.numSerie) {
            throw new Error('Todos los campos son requeridos');
        }

        // VALIDAR QUE EL NUMERO DE SERIE NO EXISTA
        const productoByNumSerie = await productoRepository.getProductoByNumSerie(producto.numSerie);
        if (productoByNumSerie) {
            throw new Error('El numero de serie ya existe');
        }

        // VALIDAR QUE EL PRECIO NO SEA NEGATIVO
        if (producto.precio < 1) {
            throw new Error('El precio no puede ser negativo');
        }

        // VALIDAR QUE LA FECHA DE ADQUISICION SEA VALIDA
        if (!Validaciones.esFechaValida(producto.fechaAquisicion)) {
            throw new Error('La fecha de adquisicion no es valida');
        }

        const yearAquisicion = producto.fechaAquisicion.split('-')[0];
        let countYear = await productoRepository.contarProductosByYear(yearAquisicion);
        countYear++;
        producto.numInventario = `${yearAquisicion}-${countYear.toString().padStart(3, '0')}`;

        return await productoRepository.createProducto(producto);
    }
}

module.exports = new ProductoService();