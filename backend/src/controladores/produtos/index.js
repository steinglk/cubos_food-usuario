const knex = require('../../conexao');

const produtosAtivos = async (req, res) => {
    const restaurante_id = req.params.id;

    try {
        listaProdutos = await knex('produto').where({restaurante_id, ativo: true});
        return res.status(200).json(listaProdutos);
    } catch (error) {
        return res.status(400).json(error.message)
    }
}


module.exports = {
    produtosAtivos
}