import React from 'react';
import './styles.css';
import pedidoMinimo from '../../assets/pedidoMinimo.svg'
import tempoEntrega from '../../assets/tempoEntrega.svg'
import semProduto from '../../assets/semProdutos.svg'
import { useState } from 'react';
import { useEffect } from 'react';
import { useRouteMatch } from "react-router-dom";

function Cardapio() {
    const [restaurante, setRestaurante] = useState({});
    const [produtos, setProdutos] = useState([]);
    const [temProdutos, setTemProdutos] = useState(true)
    const [abrirPerfil, setAbrirPerfil] = useState(false);
    const [perfil, setPerfil] = useState('');
    const [existe, setExiste] = useState(true);
    const {params} = useRouteMatch();

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
        const restaurante = await resposta.json();
        
        setRestaurante(restaurante[0]);
    }


    useEffect(() => {
        carregarProdutos()
        carregarRestaurante();
    }, []);

    function handleLogout() {
        localStorage.removeItem('@usuario/token');
    
        window.location.reload();
    }

    function openModalPerfil(){
        setAbrirPerfil(true);
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
                <button className='btn-orange'>Revisar pedido</button>
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
                                    <div className="div-card">
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
                            )) 
                            }
                            </div>
                    </div>
                    ) : 
                            <div className='semProduto flex-column items-center content-center'>
                                <div className='flex-column items-center content-center margem-interna'>
                                    <img src={semProduto} className='distancia' />
                                    <span>Desculpe, estamos sem procutos ativos </span>
                                </div>
                            </div>
                        }
                    
                </div>   
            </div>
        </div>
    );
}

export default Cardapio;