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

function Cardapio() {
    const [restaurante, setRestaurante] = useState({});
    const [openProduto, setOpenProduto] = useState(false);
    const [produtos, setProdutos] = useState([]);
    const [temProdutos, setTemProdutos] = useState(true)
    const [abrirPerfil, setAbrirPerfil] = useState(false);
    const [perfil, setPerfil] = useState('');
    const [existe, setExiste] = useState(true);
    const [abrirCarrinho, setAbrirCarrinho] = useState(false);
    const {params} = useRouteMatch();
    const [novosProdutos, setNovosProdutos] = useState([])
    const [price, setPrice] = useState(0);

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

    function openModalPerfil(){
        setAbrirCarrinho(true);
    }


    useEffect(() => {
        carregarProdutos()
        carregarRestaurante();
    }, []);

/* Adicionar produtos a sacola */

    function handleBag(novoProduto) {
        const newProdutos = [... novosProdutos];
        const isInBag = newProdutos.find(p => p.id === novoProduto.id);

        if(!novoProduto.quantidade){
            toast.error('Adicione alguma quantidade do produto.', toastConfig);
            return
        }

        setPrice(price + (novoProduto.valor_produto * novoProduto.quantidade));

        if(isInBag){
            isInBag.quantidade = isInBag.quantidade + novoProduto.quantidade;
            setNovosProdutos(newProdutos);
            return;
        }
        setNovosProdutos([... novosProdutos, novoProduto]);
    }


    function handleLogout() {
        localStorage.removeItem('@usuario/token');
    
        window.location.reload();
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
                                    {openProduto ? 
                                        (<ModalProduto 
                                        sacola ={handleBag}
                                        setOpen={setOpenProduto}
                                        open={openProduto}
                                        dadosProduto={produto} 
                                        dadosRestaurante={restaurante}/>) : "" }
                                    
                                    <div onClick={()=> setOpenProduto(true)}  className="div-card">
                                    
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
                                                <img src={produto.imagem_produto} alt="imagem do produto" className='imagem-card' />
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                </div>
                            )) 
                            }
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
            novosProdutos={novosProdutos} 
            setNovosProdutos={setNovosProdutos}
            price={price}
            taxa={restaurante.taxa_entrega} />
        </div>
    );
}

export default Cardapio;