import './style.css';
import Carrinho from '../../assets/carrinho.svg';
import semProdutos from '../../assets/semProdutos.svg'
import { useState, useEffect } from 'react';
import semImagem from '../../assets/semImagem.png';
import ModalEndereco from '../ModalEndereco';
import ModalProduto from '../ModalProduto';
import mais from '../../assets/mais.svg';
import menos from '../../assets/menos.svg';
import deletar from '../../assets/delete.png';
import confirmado from '../../assets/confirmado.svg';

function ModalCarrinho({openCarrinho, setOpenCarrinho, novosProdutos,  nomeRestaurante, restaurante, setNovosProdutos, sacola}){
    const [preco, setPreco] = useState(0);
    const [endereco, setEndereco] = useState('');
    const [open, setOpen] = useState(false);
    const [produtoSelecionado, setProdutoSelecionado] = useState({});
    const [openProduto, setOpenProduto] = useState(false);
    const [vazio, setVazio] = useState(false);
    const [comprado, setComprado] = useState(false)

    function handleAdd(produto) {
        let salvarCarrinho = localStorage.getItem('@usuario/carrinho') ? JSON.parse(localStorage.getItem('@usuario/carrinho')) : [] 
        
        const newProdutos = [... salvarCarrinho];
        let isInBag = newProdutos.find(p => p.id === produto.id);
        
        isInBag = isInBag.quantidade++;  
        setNovosProdutos(newProdutos);
        salvarCarrinho = newProdutos;
        localStorage.setItem('@usuario/carrinho', JSON.stringify(salvarCarrinho));
    }

    function handleSub(produto) {
        let salvarCarrinho = localStorage.getItem('@usuario/carrinho') ? JSON.parse(localStorage.getItem('@usuario/carrinho')) : [];

        const newProdutos = [... salvarCarrinho];
        let isInBag = newProdutos.find(p => p.id === produto.id);
        if (isInBag.quantidade === 1) return
        isInBag = isInBag.quantidade--;  
        setNovosProdutos(newProdutos);
        salvarCarrinho = newProdutos;
        localStorage.setItem('@usuario/carrinho', JSON.stringify(salvarCarrinho));
    }

    function handleDelete(produto) {
        let salvarCarrinho = localStorage.getItem('@usuario/carrinho') ? JSON.parse(localStorage.getItem('@usuario/carrinho')) : [];

        const newProdutos = [... salvarCarrinho];
        let isInBag = newProdutos.findIndex(p => p.id === produto.id);

        if(!newProdutos){
            return
        }

        if(newProdutos.length === 1){
            localStorage.removeItem('@usuario/carrinho');
            setVazio(true);
            sacola({
                deletado: true
            });
            setNovosProdutos([]);
            return
        }

        newProdutos.splice(isInBag, 1);  
        setNovosProdutos(newProdutos);
        salvarCarrinho = newProdutos;
        localStorage.setItem('@usuario/carrinho', JSON.stringify(salvarCarrinho));
    }

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

    function resetarCarrinho(params) {
        setComprado(false);
        setOpenCarrinho(false);
    }

    useEffect(() => {
        let atualizarPreco = 0
        setVazio(false);
        novosProdutos.map(produto => (
            atualizarPreco = atualizarPreco + (produto.valor_produto * produto.quantidade),
            setPreco(atualizarPreco)
        ))
        handleEndereco()
    }, [novosProdutos]);

    async function realizarCompra() {
        const pedido = {
            produtos: novosProdutos,
            subtotal: preco,
            endereco: endereco,
            entrega: novosProdutos[0].restaurante_taxa
        }
        const resposta = await fetch(`http://localhost:8001/pedidos`, {
            method: 'POST',
            body: JSON.stringify(pedido),
            headers: {
                'Content-type': 'application/json',
                'Authorization': `Bearer ${localStorage.getItem('@usuario/token')}`
            }
        });

        const produtos = await resposta.json();
        console.log(produtos);

        if(produtos === 'Pedido cadastrado com sucesso!'){
            localStorage.removeItem('@usuario/carrinho');
            setComprado(true);
            sacola({
                deletado: true
            });
            setNovosProdutos([]);
        }
    }
    
    return(
        <div>
            {openCarrinho && 
                <div className='modal'>
                    <div className='modal-content-carrinho'>
                        <div className='fecharModal flex-row flex-end'>
                            <button className='btn-fechar' onClick={() => resetarCarrinho()}>X</button>
                        </div>
                        <div className='nomeRestauranteModal flex-row '>
                            <img src={Carrinho} className='margem-carrinho' />
                            <h1>{nomeRestaurante}</h1>
                        </div>
                        {endereco ? 
                                (<div>
                                    <span className='span-endereco'>Endereço de Entrega: </span>
                                    <span className='span-endereco2'> {endereco.endereco}, {endereco.complemento}, {endereco.cep}.
                                    </span>
                                </div>) :
                                (<div className='adicionar-endereco'> 
                                    <button className='botao-endereco' onClick = {() => setOpen(true)}>Adicionar endereço</button>
                                    <ModalEndereco open={open} setOpen={setOpen}/>
                                </div>)
                            }
                        <div> 
                        
                            {!comprado ? 
                            (
                                <div>
                                        <div className='enderecoModal'>
                                        
                            </div>

                            <div>
                                {novosProdutos.length && !vazio ?  
                                    (<div>
                                        <div className='tempoEntregaModal'>
                                    <span>Tempo de Entrega: </span>
                                    <span className='span-tempo'>{novosProdutos[0].tempoEntrega} minutos.</span>
                                    </div>
                                {novosProdutos.map(produto => (
                                    <div>
                                        <div className='produto-modal flex-row'>
                                            <div className='imagem-produto ' onClick={()=> {setProdutoSelecionado(produto)
                                            setOpenProduto(true)}}>
                                                <img src={produto.imagem_produto ? produto.imagem_produto : semImagem} className='imagem-carrinho'/>
                                            </div>
                                            <div className='infor-produtos flex-column space-around'>
                                                <span className='infor-nome'>{produto.nome_produto}</span>
                                                <span>{produto.quantidade} unidade(s)</span>
                                                <span className='infor-valor'>R$ {produto.valor_produto/100}</span>
                                            </div>
                                        
                                            <div className="flex-row content-center items-center  margem-esquerda">
                                                <button className="btn-orange-left btn-orange-carrinho flex-row content-center items-center " onClick={() => handleSub(produto)}><img src={menos} /></button>
                                                <button className="btn-orange-right btn-orange-carrinho flex-row content-center items-center " onClick={() => handleAdd(produto)}><img src={mais} /></button>
                                                <div className='btn-deletar-margem'>
                                                    <button className="btn-orange-right btn-orange-carrinho flex-row content-center items-center btn-deletar" onClick={() => handleDelete(produto)}><img className='imagem-deletar' src={deletar} /></button>
                                                </div>
                                            </div>
                                        
                                            {produtoSelecionado && <ModalProduto 
                                            setOpen={setProdutoSelecionado}
                                            dadosProduto={produtoSelecionado} 
                                            dadosRestaurante={restaurante}
                                            open={openProduto} 
                                            noCarrinho={true}/>}
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
                            )
                            :
                            (<div className='flex-column content-center content-between centralizar'>
                                <div className='confirmado flex-column items-center content-between'>
                                    <img src={confirmado} />
                                    <p>Pedido Confirmado!</p>
                                    <p>Agora é só aguardar o seu pedido</p>
                                </div>
                                <div className='flex-row space-around '>
                                    <button className='btn-orange' onClick={() => resetarCarrinho()}>Voltar para cardapio</button>
                                </div>
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