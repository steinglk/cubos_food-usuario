const knex = require('../../conexao');

const listarRestaurantes = async (req, res) => {

    try {
        const obterRestaurantes = await knex('restaurante').select("*");
        return res.status(200).json(obterRestaurantes);

    } catch (error) {
        return res.status(500).json(error.message);
    }
}

module.exports = {
    listarRestaurantes
};