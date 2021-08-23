import './styles.css';
import '../../styles/form.css';
import '../../styles/buttons.css';
import logo from '../../assets/logo.svg';
import detalhe from '../../assets/detalhe-login.svg'
import {useContext, useEffect} from 'react';
import {useState} from 'react';
import {useForm} from 'react-hook-form';
import {Link, useHistory} from 'react-router-dom';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faEye, faEyeSlash} from '@fortawesome/free-solid-svg-icons';
import {toast} from 'react-toastify';
import {AuthContext} from '../../routes';
import toastConfig from '../../tools/toastConfig';

function Login() {
    const [olhoSenha, setOlhoSenha] = useState(false);
    const {register, handleSubmit} = useForm();
    const {logar} = useContext(AuthContext);
    const history = useHistory();

    async function onSubmit(data) {
        if (!data.email || !data.senha) {
            toast.error('E-mail e senha são obrigatórios!', toastConfig);
            return;
        }

        const resposta = await fetch('http://localhost:8001/', {
            method: 'POST',
            body: JSON.stringify(data),
            headers: {
                'Content-type': 'application/json'
            }
        });

        const {token} = await resposta.json();

        if (!token) {
            toast.error('E-mail e/ou senha incorretos!', toastConfig);
            return;
        }

        
        localStorage.setItem('@usuario/token', token);
        localStorage.getItem('@usuario/token');

        logar(localStorage.getItem('@usuario/token', 'usuario/cliente_id'));

        history.push('/restaurantes');
    }

    useEffect(() => {
        localStorage.removeItem('@usuario/token');
    }, []);

    return (
        <div className='container-login bg-perfil'>
            <div className='container-form'>
                <img src={detalhe} className='size'/>
                <form className='form-login form-class' onSubmit={handleSubmit(onSubmit)}>
                    <div className='h1-login flex-row space-between'>
                        <h1>Login</h1>
                        <img src={logo}/>
                    </div>
                    <div>
                        <div className='flex-column '>
                            <label htmlFor='email' className='label-login'>E-mail</label>
                            <input className='input-login' id='email' type='email' {... register('email')}/>
                        </div>
                        <div className='flex-column input-password-login'>
                            <label htmlFor='senha' className='label-login'>Senha</label>
                            <input
                                className='input-login inputs-login'
                                id='senha'
                                type={olhoSenha
                                    ? 'text'
                                    : 'password'}
                                {... register('senha')}/>
                            <FontAwesomeIcon
                                icon={olhoSenha
                                    ? faEye
                                    : faEyeSlash}
                                className='eye-password-login'
                                onClick = { () => setOlhoSenha(!olhoSenha) }/>
                        </div>
                        <div className='flex-row content-center'>
                            <button className='btn-orange button-margin'>Entrar</button>
                        </div>
                        <div className='text-center'>
                            <span className="span-login">Ainda não tem uma conta?</span>
                            <Link to='/cadastro' className='link-login'>Cadastre-se</Link>
                        </div>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default Login;