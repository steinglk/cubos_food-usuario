const knex = require('../../conexao');
const segredo = require('../../segredo_token');
const jwt = require('jsonwebtoken');

const verificarLogin = async(req, res, next) => {
    const { authorization } = req.headers;
    if(!authorization){
        res.status(400).json("Token não informado.");
    }

    try {
        const token = authorization.replace('Bearer', '').trim();

        const { id } = jwt.verify(token, segredo);
        const validacao = await knex('cliente').where('id', id).first();

        if (validacao.length === 0) {
            res.status(404).json("Cliente não encontrado.");
        }

        const perfil = validacao;
        delete perfil.senha;
        req.cliente = perfil;

        next();
    } catch (error) {
        res.status(400).json(error.message);
    }
} 

module.exports = {
    verificarLogin
}