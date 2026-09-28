const express = require('express');
const cors = require('cors');
const produtoRoutes = require('./routes/produtoRoutes');


const app = express();


app.use(cors());
app.use(express.json());


// Rotas da API
app.use('/api/produtos', produtoRoutes);


module.exports = app;
