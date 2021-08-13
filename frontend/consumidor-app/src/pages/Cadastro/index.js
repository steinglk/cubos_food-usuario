import './styles.css';
import '../../styles/form.css';
import '../../styles/buttons.css';
import logo from '../../assets/logo.svg';
import barril from '../../assets/Vector.png'
import centroImg from '../../assets/cadastro-img.png'
import detalhe from '../../assets/Group1627.svg'
import {useContext, useEffect} from 'react';
import {useState} from 'react';
import {useForm} from 'react-hook-form';
import {Link, useHistory} from 'react-router-dom';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faEye, faEyeSlash} from '@fortawesome/free-solid-svg-icons';
import {toast} from 'react-toastify';
import {AuthContext} from '../../routes';


function Cadastro() {
    const [olhoSenha, setOlhoSenha] = useState(false);
    const {register, handleSubmit} = useForm();
    const {logar} = useContext(AuthContext);
    const history = useHistory();

    async function onSubmit(data) {
        if (!data.email || !data.senha || !data.telefone || !data.senha || data.confirmarSenha) {
            toast.error('Todos os são obrigatórios!', {
                position: "top-right",
                autoClose: 3000,
                hideProgressBar: true,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined
            });
            return;
        }


        const resposta = await fetch('http://localhost:8000/cadastro', {
            method: 'POST',
            body: JSON.stringify(data),
            headers: {
                'Content-type': 'application/json'
            }
        });
        

        history.push('/');
    }

    return (
        <div className='container-cadastro'>
            <div >
                
                <div className="logo-area flex-column">
                    <img className="logo-posicao" src={logo} />
                    <img className="barril-pos" src={barril}/>
                </div>
                <div className="imagem-centro">
                    <img src={centroImg} />
                </div>
                <img className="fundo-cadastro" src={detalhe} /> 
            </div>

            <div className='cadastro-form-container'>
                <form className='form-cadastro' onSubmit={handleSubmit(onSubmit)}>
                <div className='h1-login flex-row space-between'>
                    <h1 className="cadastro-h1" >Cadastro</h1>
                </div>
                <div className='flex-column '>
                    <label htmlFor='nome' className='label-nome'>Nome de usuario</label>
                    <input className='input-cadastro' id='nome' type='text' {... register('nome')}/>
                </div>
                <div className='flex-column '>
                    <label htmlFor='email' className='label-email-cad'>email de usuario</label>
                    <input className='input-cadastro' id='email' type='email' {... register('email')}/>
                </div>
                </form>
            </div>
        </div>
    )
}

export default Cadastro;