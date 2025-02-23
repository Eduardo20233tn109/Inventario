const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');

const app = express();
const personasRoutes = require('./routes/persona.routes');

const PORT = 3000;
app.use(bodyParser.json());
app.use("/api", personasRoutes);

//Conexión a la base de datos
mongoose.connect('mongodb+srv://20233tn109:HKTY4uQVQ3SopOGV@bdexample.dyx8a.mongodb.net/inventario-db?retryWrites=true&w=majority&appName=BDexample')
.then(() => {
    console.log('Conexión a la base de datos exitosa');
    app.listen(PORT, () => {
        console.log(`Servidor corriendo en http://localhost:${PORT}`);
    });
})
.catch((error) => {
    console.log('Error de conexión a la base de datos', error);
});