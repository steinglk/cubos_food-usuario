const knex = require('../../conexao');

const adicionarPedido = async (req, res) => {

    const { produtos } = req.body;
    const { id } = req.cliente;

    if (produtos.length === 0) {
        return res.status(404).json('Adicione pelo menos 1 produto ao pedido.');
    }

    try {

        const inserindoPedido = await knex('pedido').insert({
            cliente_id: id,
            restaurante_id: produtos[0].restaurante_id,
            endereco_id: produtos[0].endereco_id,
            subtotal: produtos[0].subtotal,
            total: produtos[0].total,
            entrega: produtos[0].restaurante_taxa
        }).returning('*');

        if (!inserindoPedido) {
            return res.status(404).json('O pedido não foi adicionado.');
        }

        for (produto of produtos) {
            const inserindoProdutos = await knex('itens').insert({
                produto_id: produto.id,
                pedido_id: inserindoPedido[0].id,
                quantidade: produto.quantidade,
                preco_produto: produto.valor_produto
            });

            if (!inserindoProdutos) {
                return res.status(404).json('Os itens não foram adicionados ao pedido.');
            }

        }

        return res.status(200).json(`Pedido cadastrado com sucesso!`);

    } catch (error) {
        return res.status(400).json(error.message);
    }
}


module.exports = {
    adicionarPedido
}