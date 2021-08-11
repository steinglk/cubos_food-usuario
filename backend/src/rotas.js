const express = require('express');
const cliente = require('./controladores/cliente');

const rotas = express();

rotas.post('/cadastro', cliente.cadastrarCliente);

module.exports = rotas;