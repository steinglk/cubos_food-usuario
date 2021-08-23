import React, { createContext } from 'react';
import './styles.css';
import { useState } from 'react';
import { useEffect, useContext } from 'react';
import pizza from '../../assets/pizarria.png';
import bg from '../../assets/bg-restaurante.svg';
import { useHistory } from 'react-router-dom';

function Restaurantes() { 
    const [restaurantes, setRestaurantes] = useState([]);
    const [header, setHeader] = useState('');
    const [nome, setNome] = useState('');
    const [perfil, setPerfil] = useState('');
    const [filtro, setFiltro] = useState('');
    const [existe, setExiste] = useState(true);
    const history = useHistory();

    function cardapio(id) {
        history.push(`/restaurante/${id}`);
    }

    async function carregarRestaurante() {
        const resposta = await fetch('http://localhost:8001/restaurantes', {
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${localStorage.getItem('@usuario/token')}`
            }
        });

        const restaurantesRetornados = await resposta.json();
        setRestaurantes(restaurantesRetornados);
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

    
    function filtrarRestaurante(e) {
        setFiltro(e);
    }

    function handleFilter(restaurante) {
        if (restaurante.nome.toLowerCase().includes(filtro.toLowerCase())) {
            return restaurante
        }
        return false
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
                    <div className = 'flex-row flex-end'>
                        <input 
                        placeholder='Busca'
                        className = 'busca'
                        type='text'
                        value = {filtro}
                        onChange = {(e) => filtrarRestaurante(e.target.value)}
                        />
                    </div>

                    <div className="flex-row content-center items-center" >
                    <div className='container-itens'>
                        
                        {restaurantes.filter(handleFilter).map(restaurante =>(
                                <div className="div-card" onClick={() => cardapio(restaurante.id)}>
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
                                            <img src={restaurante.imagem_restaurante} alt="imagem do produto" className='imagem-card' />
                                        </div>
                                    </div>
                                </div>
                            </div>
                        )) 
                        } 
                        {restaurantes.filter(handleFilter).length ? ''  : (
                            <div className="h1-vazio"><h1>Nenhum restaurante encontrado</h1></div>
                            )}
                    </div>
                    </div>
                </div>   
            </div>
        </div>
    );
}

export default Restaurantes;