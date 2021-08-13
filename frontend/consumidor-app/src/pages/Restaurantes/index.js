import React from 'react';
import './styles.css';
import { useState } from 'react';
import { useEffect } from 'react';
import pizza from '../../assets/pizarria.png';
import bg from '../../assets/bg-restaurante.svg';
import { toast } from 'react-toastify';

function Restaurantes() {
    const [produtos, setProdutos] = useState([]);
    const [header, setHeader] = useState('');
    const [nome, setNome] = useState('');
    const [abrirPerfil, setAbrirPerfil] = useState(false);
    const [perfil, setPerfil] = useState('');

    async function carregarRestaurante() {
        const resposta = await fetch('http://localhost:8000//restaurantes', {
            headers: {
                'Authorization': `Bearer ${localStorage.getItem('@restaurante/token')}`
            }
        });

        const produtosRetornados = await resposta.json();
        
        setProdutos(produtosRetornados);
    }
    useEffect(() => {
        
        carregarRestaurante();

        async function carregarHeader() {
            const resposta = await fetch('http://localhost:8000/header', {
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
    
    return (
        <div>
            <div className='flex-row background-produtos container-background' style={{backgroundImage: {bg}}}>
                <h2>{nome}</h2>
                <p onClick={() => handleLogout()} >Logout</p>
            </div>
            <div className='conteiner-perfil'>
                <img className='imagem-perfil img-absolute' 
                src={pizza} />
            </div>
                <div>
                <div className='total-tela'>
                    <div className="flex-row content-center items-center">
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
                                    <span className='estilo-span'>{`${produto.preco}`}</span>
                                </div>
                            </div>
                            <div>
                                <div>
                                    <img src={produto.imagem_produto} alt="imagem do produto" className='imagem-card' />
                                </div>
                            </div>
                            </div>
                        </div>
                        ))}
                    </div>
                    </div>
                </div>   
            </div>
        </div>
    );
}

export default Restaurantes;