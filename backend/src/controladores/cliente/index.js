const knex = require('../../conexao');
const bcrypt = require('bcrypt');

const cadastrarCliente = async (req, res) => {
    const {
        nome,
        email,
        senha,
        telefone,
    } = req.body;

    if (!nome.trim() || !email.trim() || !senha.trim() || !telefone.trim()) {
        return res.status(400).json("Todos os campos são obrigatórios");
    }
    try {
        const clienteExiste = await knex('cliente').select('*').where({ email }).first();

        if (clienteExiste) {
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
        if (cadastrandoCliente.length === 0) {
            return res.status(400).json("Erro ao realizar cadastro");
        }
        return res.status(200).json('Cadastro realizado com sucesso');
    } catch (error) {
        return res.status(500).json(error.message);
    }
}

const adicionarEndereco = async (req, res) => {
    const {id} = req.usuario;
    const {
        cep,
        endereco,
        complemento,
    } = req.body;

    if (!id || !cep || !endereco) {
        return res.status(400).json("Todos os campos são obrigatórios");
    }

    try {
        const clienteExiste = await knex('cliente')
            .select('id')
            .where({ id: cliente_id })
            .first();

        if (!clienteExiste) {
            return res.status(400).json("O cliente informado ainda não possui um cadastro em nosso sistema");
        }

        const enderecoExiste = await knex('endereco_cliente')
            .select('id')
            .where({ id: id })
            .first();

        if (enderecoExiste) {
            const atualizandoEndereco = await knex('endereco_cliente')
                .where({ id: id })
                .update({
                    cep,
                    endereco,
                    complemento,
                });

            if (!atualizandoEndereco) {
                return res.status(400).json("Erro ao atualizar endereço!");
            }

            return res.status(200).json('Endereço atualizado com sucesso');
        }

        const cadastrandoEndereco = await knex('endereco_cliente')
            .insert({
                id,
                cep,
                endereco,
                complemento,
            });
        if (cadastrandoEndereco.length === 0) {
            return res.status(400).json("Erro ao adicionar endereço!");
        }
        return res.status(200).json('Endereço adicionado com sucesso');
    } catch (error) {
        return res.status(500).json(error.message);
    }
}

const verificarEndereco = async (req, res) => {
    
    const { id } = req.usuario;

    try {
        const enderecoEncontrado = await knex('endereco_cliente')
            .select('endereco', 'complemento', 'cep')
            .where({ cliente_id: id })
            .first();

        if (!enderecoEncontrado) {
            return res.status(400).json(null);
        }

        return res.status(200).json(enderecoEncontrado);
    } catch (error) {
        return res.status(500).json(error.message);
    }
}

module.exports = {
    cadastrarCliente,
    adicionarEndereco,
    verificarEndereco
}