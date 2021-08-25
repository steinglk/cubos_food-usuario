const knex = require('../../conexao');

const adicionarPedido = async (req, res) => {

    const { produtos, endereco, subtotal, entrega } = req.body;
    const { id } = req.cliente;
    console.log(req.body)
    if (!produtos) {
        return res.status(404).json('Adicione pelo menos 1 produto ao pedido.');
    }

    try {

        const inserindoPedido = await knex('pedido').insert({
            cliente_id: id,
            restaurante_id: produtos[0].restaurante_id,
            cep: endereco.cep,
            endereco: endereco.endereco,
            complemento: endereco.complemento,
            subtotal: subtotal,
            total: (subtotal + entrega),
            entrega: entrega
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