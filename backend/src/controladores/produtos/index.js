const knex = require('../../conexao');

const produtosAtivos = async (req, res) => {
    const restaurante_id = req.params.id;
    console.log(restaurante_id)

    try {
        listaProdutos = await knex('produto').where({restaurante_id, ativo: true});
        return res.status(200).json(listaProdutos);
    } catch (error) {
        
    }
}


module.exports = {
    produtosAtivos
}