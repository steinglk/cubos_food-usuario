const knex= require('../../conexao');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const senhaHash = require('../../segredo_token');

const logarCliente = async (req, res) => {
    const { email, senha } = req.body;

    if (!email || !senha) {
        return res.status(404).json('E-mail e senha são obrigatórios');
    }

    try {
        const objCliente = await knex('cliente').where({email: email});
        const cliente = objCliente[0];

        if (!cliente) {
            return res.status(400).json("O cliente não foi encontrado");
        }

        const senhaCorreta = await bcrypt.compare(senha, cliente.senha);

        if (!senhaCorreta) {
            return res.status(400).json("Email e senha não conferem.");
        }

        const token = jwt.sign({ id: cliente.id }, senhaHash);
        delete cliente.senha;
        const dadosCliente = cliente;

        return res.status(200).json({
            cliente: dadosCliente,
            token
        });
    } catch (error) {
        return res.status(400).json(error.message);
    }
}

module.exports = {
    logarCliente
}