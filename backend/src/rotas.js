const express = require('express');
const cliente = require('./controladores/cliente');
const login = require('./controladores/login');
const restaurantes = require('./controladores/restaurantes');
const pedidos = require('./controladores/pedidos');
const verificarLogin = require('./filtros/verificaLogin/index');
const produtos = require('./controladores/produtos')

const rotas = express();

rotas.post('/cadastro', cliente.cadastrarCliente);

rotas.post('/', login.logarCliente);

rotas.use(verificarLogin.verificarLogin);

rotas.post('/adicionarEndereco', cliente.adicionarEndereco);

rotas.get('/verificarEndereco', cliente.verificarEndereco);

rotas.get('/restaurantes', restaurantes.listarRestaurantes);

rotas.get('/:id/produtos', produtos.produtosAtivos);

rotas.post('/produtos', pedidos.adicionarPedido);

rotas.get('/restaurante/:id', restaurantes.listarUmRestaurante);

module.exports = rotas;