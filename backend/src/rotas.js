const express = require('express');
const cliente = require('./controladores/cliente');
const login = require('./controladores/login');
const restaurantes = require('./controladores/restaurantes');
const verificarLogin = require('./filtros/verificaLogin/index');

const rotas = express();

rotas.post('/cadastro', cliente.cadastrarCliente);

rotas.post('/', login.logarCliente);

rotas.use(verificarLogin.verificarLogin);

rotas.get('/restaurantes', restaurantes.listarRestaurantes);

module.exports = rotas;