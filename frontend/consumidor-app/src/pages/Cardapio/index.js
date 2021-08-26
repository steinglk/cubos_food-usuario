import React from 'react';
import './styles.css';
import pedidoMinimo from '../../assets/pedidoMinimo.svg'
import tempoEntrega from '../../assets/tempoEntrega.svg'
import semProduto from '../../assets/semProdutos.svg'
import { useState } from 'react';
import { useEffect } from 'react';
import { useRouteMatch } from "react-router-dom";
import ModalProduto from '../../components/ModalProduto';
import ModalCarrinho from '../../components/ModalCarrinho';
import {toast} from 'react-toastify';
import toastConfig from '../../tools/toastConfig';
import semImagem from '../../assets/semImagem.png';
import { useHistory } from 'react-router';

function Cardapio() {
    const [restaurante, setRestaurante] = useState({});
    const [openProduto, setOpenProduto] = useState(false);
    const [produtos, setProdutos] = useState([]);
    const [temProdutos, setTemProdutos] = useState(true)
    const [abrirCarrinho, setAbrirCarrinho] = useState(false);
    const {params} = useRouteMatch();
    const [novosProdutos, setNovosProdutos] = useState([])
    const [produtoSelecionado, setProdutoSelecionado] = useState({})
    const history = useHistory();
    const [noCarrinho, setNocarrinho] = useState(false);
   

    async function carregarProdutos() {
        const resposta = await fetch(`http://localhost:8001/${params.id}/produtos`, {
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${localStorage.getItem('@usuario/token')}`
            }
        });
        const produtos = await resposta.json();
        
        setProdutos(produtos);

        if (produtos.length !== 0) {
            setTemProdutos(true);
        } else {
            setTemProdutos(false);
        }
    }

    async function carregarRestaurante() {
        const resposta = await fetch(`http://localhost:8001/restaurante/${params.id}`, {
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${localStorage.getItem('@usuario/token')}`
            }
        });
        const restauranteRetorno = await resposta.json();
        setRestaurante(restauranteRetorno[0]);
        
    }

    useEffect(() => {
        carregarProdutos()
        carregarRestaurante();
    }, []);

/* Adicionar produtos a sacola */

    function handleBag(novoProduto) {
        let salvarCarrinho = localStorage.getItem('@usuario/carrinho') ? JSON.parse(localStorage.getItem('@usuario/carrinho')) : [] 

        novoProduto.restaurante_id = parseInt(params.id);
        novoProduto.restaurante_nome = restaurante.nome;
        novoProduto.restaurante_taxa = restaurante.taxa_entrega;
        novoProduto.tempoEntrega = restaurante.tempo_entrega_minutos;

        if(novoProduto.deletado){
            return;
        }
        
        if(salvarCarrinho.length){
            const verificarRestaurante = [... salvarCarrinho];
            const mesmoRestaurante = verificarRestaurante.find(id => id.restaurante_id === novoProduto.restaurante_id);

            if(!mesmoRestaurante){
                toast.error('Não é possível fazer um pedido em dois restaurantes distintos.', toastConfig);
                return
            }
        }

        if(!novoProduto.quantidade){
            toast.error('Adicione alguma quantidade do produto.', toastConfig);
            return
        }

        const newProdutos = [... salvarCarrinho];
        const isInBag = newProdutos.find(p => p.id === novoProduto.id);

        if(isInBag){
            isInBag.quantidade = isInBag.quantidade + novoProduto.quantidade;
            setNovosProdutos(newProdutos);
            salvarCarrinho = newProdutos;
            
            localStorage.setItem('@usuario/carrinho', JSON.stringify(salvarCarrinho));
            return;
        }
        
        salvarCarrinho.push(novoProduto)
        localStorage.setItem('@usuario/carrinho', JSON.stringify(salvarCarrinho));
    }


    function handleLogout() {
        localStorage.removeItem('@usuario/token');
        window.location.reload();
    }

    function voltarRestaurantes() {
        history.push('/restaurantes');
    }
    return (
        <div>
            <div className='flex-row background-produtos container-background' style={{backgroundImage: `url(${restaurante.categoria})`}}>
                <h2>{restaurante.nome}</h2>
                <p onClick={() => handleLogout()} >Logout</p>
            </div>
            <div className='conteiner-perfil'>
                <img className='imagem-perfil img-absolute' 
                src={restaurante.imagem_restaurante} />
            </div>
            <div className='flex-row revisar'>
                <button className='btn-orange' onClick={() => setAbrirCarrinho(true)}>Revisar pedido</button>
            </div>
            <div><button onClick={() => voltarRestaurantes()} className="btn-orange voltar">Voltar</button></div>

            <div className='flex-row space-around infor-margem'>
                <div className='flex-row items-center'>
                    <img src={pedidoMinimo}/>
                    <span className='infor-p'>Pedido Mínimo: </span>
                    <span>R$:{restaurante.valor_minimo_pedido/100}</span>
                </div>
                <div className='flex-row items-center'>
                    <img src={tempoEntrega}/>
                    <span className='infor-p'>Tempo de Entrega: </span>
                    <span>{restaurante.tempo_entrega_minutos} min</span>
                </div>
                <div className='sobre'>
                    <span>{restaurante.descricao}</span>
                </div>
            </div>

            <div>
                <div className='total-tela'>
                        {temProdutos ? 
                            (<div className="flex-row content-center items-center">
                            <div className='container-itens'>
                                {produtos.map(produto =>(
                                    <div> 
                                    
                                    <div onClick={()=> {setProdutoSelecionado(produto)
                                    setOpenProduto(true)}
                                    }  className="div-card">
                                    
                                    <div className="card-content flex-row">
                                        <div className='flex-column texto-card'>
                                            <div>
                                                <h4>{produto.nome}</h4>
                                            </div>
                                            <div className='estilo-p'>
                                                <p>{produto.descricao}</p>
                                            </div>
                                            <div>
                                                <span className='estilo-span'>R$: {produto.preco/100}</span>
                                            </div>
                                        </div>
                                        <div className='div-imagem-card'>
                                            <div > 
                                                <img src={produto.imagem_produto ? produto.imagem_produto : semImagem} alt="imagem do produto" className='imagem-card' />
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                </div>
                            )) 
                            }
                            {produtoSelecionado && <ModalProduto 
                                        setOpen={setProdutoSelecionado}
                                        sacola ={handleBag}
                                        dadosProduto={produtoSelecionado} 
                                        dadosRestaurante={restaurante}
                                        open={openProduto} 
                                        noCarrinho={false}
                                        setNocarrinho={setNocarrinho}
                                        />}
                            </div>
                    </div>
                    ) : 
                            <div className='semProduto flex-column items-center content-center'>
                                <div className='flex-column items-center content-center margem-interna'>
                                    <img src={semProduto} className='distancia' />
                                    <span>Desculpe, estamos sem produtos ativos </span>
                                </div>
                            </div>
                        }
                </div>   
            </div>
            <ModalCarrinho 
            setOpenCarrinho={setAbrirCarrinho} 
            openCarrinho={abrirCarrinho} 
            novosProdutos={localStorage.getItem('@usuario/carrinho') ? JSON.parse(localStorage.getItem('@usuario/carrinho')) : novosProdutos} 
            setNovosProdutos={setNovosProdutos}
            nomeRestaurante = {localStorage.getItem('@usuario/carrinho') ? JSON.parse(localStorage.getItem('@usuario/carrinho'))[0].restaurante_nome : restaurante.nome }
            restaurante = {restaurante}
            sacola ={handleBag}
            setComprado={false}
            />
        </div>
    );
}

export default Cardapio;