const knex = require('../../conexao');

const listarRestaurantes = async (req, res) => {
    try {
        const obterRestaurantes = await knex('restaurante').select("*");
        return res.status(200).json(obterRestaurantes);
    } catch (error) {
        return res.status(500).json(error.message);
    }
}

const listarUmRestaurante = async (req, res) => {
    const { id } = req.params;
    try {
        const obterRestaurante = await knex('restaurante').where("id", id);
        const { categoria_id } = obterRestaurante[0];
        const obterCategoria = await knex('categoria').where('id', categoria_id);

        obterRestaurante[0].categoria = obterCategoria[0].imagem_categoria;

        return res.status(200).json(obterRestaurante);
    } catch (error) {
        return res.status(500).json(error.message);
    }
}

module.exports = {
    listarRestaurantes,
    listarUmRestaurante
};