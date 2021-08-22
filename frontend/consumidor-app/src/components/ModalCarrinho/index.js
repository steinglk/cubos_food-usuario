import './style.css';
import Carrinho from '../../assets/carrinho.svg';
import semProdutos from '../../assets/semProdutos.svg'

function ModalCarrinho({openCarrinho, setOpenCarrinho, novosProdutos, price,  nomeRestaurante}){
    
    async function realizarCompra() {
        novosProdutos.preco = (price+parseInt(novosProdutos[0].restaurante_taxa))
        console.log(novosProdutos)
        const resposta = await fetch(`http://localhost:8001/produtos`, {
            method: 'PUT',
            body: JSON.stringify(novosProdutos),
            headers: {
                'Authorization': `Bearer ${localStorage.getItem('@usuario/token')}`
            }
        });
        const produtos = await resposta.json();
    }
    
    return(
        <div>
            {openCarrinho && 
                <div className='modal'>
                    <div className='modal-content-carrinho'>
                        <div className='fecharModal flex-row flex-end'>
                            <button className='btn-fechar' onClick={() => setOpenCarrinho(false)}>X</button>
                        </div>
                        <div className='nomeRestauranteModal flex-row '>
                            <img src={Carrinho} className='margem-carrinho' />
                            <h1>{nomeRestaurante}</h1>
                        </div>
                        <div className='enderecoModal'>
                            <span className='span-endereco'>Endereço de Entrega: </span>
                            <span className='span-endereco2'>Av. Tancredo Neves, 2227, ed. Salvador Prime, sala 901:906; 917:920 - Caminho das Árvores, Salvador - BA, 41820-021.</span>
                        </div>

                        <div>
                            {novosProdutos.length ?  
                                (<div>
                                    <div className='tempoEntregaModal'>
                                <span>Tempo de Entrega: </span>
                                <span className='span-tempo'>{novosProdutos[0].tempoEntrega} minutos.</span>
                            </div>
                            {novosProdutos.map(produto => (
                                <div>
                                    <div className='produtod-modal flex-row'>
                                        <div className='imagem-produto '>
                                            <img src={produto.imagem_produto} className='imagem-carrinho'/>
                                        </div>
                                        <div className='infor-produtos flex-column space-around'>
                                            <span className='infor-nome'>{produto.nome_produto}</span>
                                            <span>{produto.quantidade} unidade(s)</span>
                                            <span className='infor-valor'>R$ {produto.valor_produto/100}</span>
                                        </div>
                                    </div>
                                    
                                </div>
                                ))}

                                <div className='maisProdutos'>
                                        <span onClick={() => setOpenCarrinho(false)}>Adicionar mais itens ao pedido</span>
                                    </div>
                                    <div className='rodapeModal'>
                                        <div className='subTotal marginRodape flex-row space-between'>
                                            <span>Subtotal</span>
                                            <span className='rodapeWeight fontRodape'>R$ {price/100}</span>
                                        </div>
                                        <div className='taxa marginRodape flex-row space-between'>
                                            <span>Taxa de entrega</span>
                                            <span className='rodapeWeight fontRodape'>R$ {novosProdutos[0].restaurante_taxa/100}</span>
                                        </div>
                                        <div className='total marginRodape flex-row space-between'>
                                            <span>Total</span>
                                            <span className='rodapeWeight fontValor'>R$ {(price+parseInt(novosProdutos[0].restaurante_taxa))/100}</span>
                                        </div>
                                    </div>
                                    <div className='flex-row space-around'>
                                        <button className='btn-orange' onClick={realizarCompra}>Confirmar Pedido</button>
                                    </div>
                                        </div>) 
                                        : 
                                    (<div className='semProduto flex-column items-center content-center'>
                                        <img src={semProdutos} className='distancia'/>
                                        <span>Sem itens no carrinho</span>
                                    </div>)
                                }
                        </div>
                    </div>
                </div>
            }
        </div>
    );
}

export default ModalCarrinho;