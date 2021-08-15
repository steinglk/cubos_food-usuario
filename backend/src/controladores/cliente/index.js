const knex = require('../../conexao');
const bcrypt = require('bcrypt');

const cadastrarCliente = async (req, res) => {
    const {
        nome,
        email,
        senha,
        telefone,
    } = req.body;

    if(!nome.trim() || !email.trim() || !senha.trim() || !telefone.trim()) {
        return res.status(400).json("Todos os campos são obrigatórios");
    }
    try {
        const clienteExiste = await knex('cliente').select('*').where({ email }).first();

        if(clienteExiste) {
            return res.status(400).json("Email já cadastrado");
        }
        const senhaCriptografada = await bcrypt.hash(senha, 10);

        const cadastrandoCliente = await knex('cliente')
            .insert({
                nome,
                email,
                telefone,
                senha: senhaCriptografada,
            });
        if(cadastrandoCliente.length === 0) {
            return res.status(400).json("Erro ao realizar cadastro");
        }
        return res.status(200).json('Cadastro realizado com sucesso');
    } catch (error) {
        return res.status(500).json(error.message);
    }
}


module.exports = {
    cadastrarCliente
}