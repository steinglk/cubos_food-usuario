const express = require('express');
const cliente = require('./controladores/cliente');
const login = require('./controladores/login');
const verificarLogin = require('./filtros/verificaLogin/index');

const rotas = express();

rotas.post('/cadastro', cliente.cadastrarCliente);

rotas.post('/', login.logarCliente);

rotas.use(verificarLogin.verificarLogin);



module.exports = rotas;