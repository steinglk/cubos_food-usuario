const knex = require('../../conexao');

const produtosAtivos = async (req, res) => {
    const restaurante_id = req.params.id;

    try {
        listaProdutos = await knex('produto').where({ restaurante_id, ativo: true });
        return res.status(200).json(listaProdutos);
    } catch (error) {
        return res.status(400).json(error.message);
    }
}

const adicionarProduto = async (req, res) => {

    const { produto_id, quantidade, pedido_id } = req.body;

    if (!produto_id || !quantidade || !pedido_id) {
        return res.status(404).json('Todos os campos são obrigatórios');
    }

    try {

        let qtdItens = 0;
        let subtotal = 0;

        const produtoEncontrado = await knex('produto')
            .where({ id: produto_id })
            .first();

            
        if (!produtoEncontrado) {
            return res.status(400).json("O Produto não foi encontrado");
        }
 


        const pedidoEncontrado = await knex('itens')
            .where({ pedido_id });

        if (pedidoEncontrado) {

            const itemEncontrado = await knex('itens')
                .where({ produto_id })
                .first();

            if (itemEncontrado) {

                qtdItens = itemEncontrado.quantidade + quantidade;

                const atualizandoItens = await knex('itens')
                    .where({ id: itemEncontrado.id })
                    .update({
                        quantidade: qtdItens
                    }).returning('*');

                if (!atualizandoItens) {
                    return res.status(400).json("Não foi possível adicionar itens já existentes no carrinho");
                }
            }
        }

        const inserindoItens = await knex('itens').insert({
            produto_id,
            quantidade,
            preco_produto: produtoEncontrado.preco,
            pedido_id
        }).returning('*');

        if (!inserindoItens) {
            return res.status(400).json("Os itens não foram inseridos ao pedido");
        }

        const restauranteEncontrado = await knex('restaurante')
        .where({ id: produtoEncontrado.restaurante_id })
        .first();

        const entrega = restauranteEncontrado.taxa_entrega; 

        const atualizarPedido = await knex('itens')
            .where({ pedido_id });

        for (pedido of atualizarPedido) {
            subtotal = subtotal + pedido.quantidade * pedido.preco_produto;
        }

        const total = entrega + subtotal; 

        const atualizandoPedido = await knex('pedido')
            .where({ id: pedido_id })
            .update({
                subtotal,
                entrega,
                total
            }).returning('*');


        return res.status(200).json(`Item adicionados com sucesso!`);

    } catch (error) {
        return res.status(400).json(error.message);
    }
}

module.exports = {
    produtosAtivos,
    adicionarProduto
}