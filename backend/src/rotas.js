const express = require('express');
const cliente = require('./controladores/cliente');
const login = require('./controladores/login');
const restaurantes = require('./controladores/restaurantes');
const verificarLogin = require('./filtros/verificaLogin/index');
const produtos = require('./controladores/produtos')

const rotas = express();

rotas.post('/cadastro', cliente.cadastrarCliente);

rotas.post('/', login.logarCliente);

rotas.use(verificarLogin.verificarLogin);

rotas.get('/restaurantes', restaurantes.listarRestaurantes);

rotas.get('/:id/produtos', produtos.produtosAtivos );

rotas.get('/restaurante/:id', restaurantes.listarUmRestaurante );

rotas.post('/produtos', produtos.adicionarProduto);


module.exports = rotas;