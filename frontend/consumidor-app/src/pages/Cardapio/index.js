import React from 'react';
import './styles.css';
import { useState } from 'react';
import { useEffect, useContext } from 'react';
import pizza from '../../assets/pizarria.png';
import bg from '../../assets/bg-restaurante.svg';
import { useRouteMatch } from "react-router-dom";

function Cardapio() {
    const [restaurantes, setRestaurantes] = useState([]);
    const [header, setHeader] = useState('');
    const [nome, setNome] = useState('');
    const [abrirPerfil, setAbrirPerfil] = useState(false);
    const [perfil, setPerfil] = useState('');
    const [filtro, setFiltro] = useState('');
    const [existe, setExiste] = useState(true);
    const {params} = useRouteMatch();

    async function carregarRestaurante() {
        console.log(params)
        const resposta = await fetch(`http://localhost:8001/${params.id}/produtos`, {
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${localStorage.getItem('@usuario/token')}`
            }
        });
        const produtos = await resposta.json();
        
        setRestaurantes(produtos);
    }
    useEffect(() => {
        
        carregarRestaurante();

        async function carregarHeader() {
            const resposta = await fetch('http://localhost:8001/header', {
                method: 'GET',
                headers:{
                    'Authorization': `Bearer ${localStorage.getItem('@usuario/token')}`
                }
            });

            const dadosHeader = await resposta.json();
            
            setNome(dadosHeader.nomeRestaurante);
            setHeader(dadosHeader.categoriaWallpaper);
            setPerfil(dadosHeader.imagemPerfil)
        }
        carregarHeader();
    }, []);

    function handleLogout() {
        localStorage.removeItem('@usuario/token');
    
        window.location.reload();
    }

    function openModalPerfil(){
        setAbrirPerfil(true);
    }
    
    function filtrarRestaurante(e) {
        setFiltro(e);
    }

    
    return (
        <div>
            <div className='flex-row background-produtos container-background' style={{backgroundImage: {bg}}}>
                <h2>{nome}</h2>
                <p onClick={() => handleLogout()} >Sair</p>
            </div>
            <div className='conteiner-perfil'>
                <img className='imagem-perfil img-absolute' 
                src={pizza} />
            </div>
                <div>
                <div className='total-tela'>
                    <div className="flex-row content-center items-center">
                    <div className='container-itens'>
                        
                        {restaurantes.map(restaurante =>(
                                <div className="div-card">
                                <div className="card-content flex-row">
                                    <div className='flex-column texto-card'>
                                        <div>
                                            <h4>{restaurante.nome}</h4>
                                        </div>
                                        <div className='estilo-p'>
                                            <p>{restaurante.descricao}</p>
                                        </div>
                                        <div>
                                            <span className='estilo-span'>$$$</span>
                                        </div>
                                    </div>
                                    <div className='div-imagem-card'>
                                        <div > 
                                            <img src={restaurante.imagem_produto} alt="imagem do produto" className='imagem-card' />
                                        </div>
                                    </div>
                                </div>
                            </div>
                        )) 
                        } 
                    </div>
                    </div>
                </div>   
            </div>
        </div>
    );
}

export default Cardapio;