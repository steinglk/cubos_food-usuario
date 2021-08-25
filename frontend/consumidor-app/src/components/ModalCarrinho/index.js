import './style.css';
import Carrinho from '../../assets/carrinho.svg';
import semProdutos from '../../assets/semProdutos.svg'
import { useState, useEffect } from 'react';
import semImagem from '../../assets/semImagem.png';
import ModalEndereco from '../ModalEndereco';

function ModalCarrinho({openCarrinho, setOpenCarrinho, novosProdutos,  nomeRestaurante}){
    const [preco, setPreco] = useState(0);
    const [endereco, setEndereco] = useState('');
    const [open, setOpen] = useState(false)

    async function handleEndereco() {
        const resposta = await fetch('http://localhost:8001/verificarEndereco',{
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${localStorage.getItem('@usuario/token')}`
            }
        });

        const retorno = await resposta.json();

        setEndereco(retorno);
    }

    useEffect(() => {
        let atualizarPreco = 0
        novosProdutos.map(produto => (
            atualizarPreco = atualizarPreco + (produto.valor_produto * produto.quantidade),
            setPreco(atualizarPreco)
        ))
        handleEndereco()
    }, [novosProdutos]);

    async function realizarCompra() {
        novosProdutos.preco = preco
        const pedido = {
            produtos: novosProdutos,
            
        }
        console.log(novosProdutos)
        const resposta = await fetch(`http://localhost:8001/pedidos`, {
            method: 'POST',
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
                            {endereco === "" ? 
                            (<div className='adicionar-endereco'> 
                            <button className='botao-endereco' onClick = {() => setOpen(true)}>Adicionar endereço</button>
                            <ModalEndereco open={open} setOpen={setOpen}/>
                        </div>) :
                            (<div>
                                <span className='span-endereco'>Endereço de Entrega: </span>
                                <span className='span-endereco2'> {endereco.endereco}, {endereco.complemento}, {endereco.cep}.
                                </span>
                            </div>) 
                        }
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
                                            <img src={produto.imagem_produto ? produto.imagem_produto : semImagem} className='imagem-carrinho'/>
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
                                            <span className='rodapeWeight fontRodape'>R$ {preco/100}</span>
                                        </div>
                                        <div className='taxa marginRodape flex-row space-between'>
                                            <span>Taxa de entrega</span>
                                            <span className='rodapeWeight fontRodape'>R$ {novosProdutos[0].restaurante_taxa/100}</span>
                                        </div>
                                        <div className='total marginRodape flex-row space-between'>
                                            <span>Total</span>
                                            <span className='rodapeWeight fontValor'>R$ {(preco+parseInt(novosProdutos[0].restaurante_taxa))/100}</span>
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