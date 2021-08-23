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
import toastConfig from '../../tools/toastConfig';


function Cadastro() {
    const [showPassword, setShowPassword] = useState(false);
    const {register, handleSubmit} = useForm();
    const history = useHistory();

    async function onSubmit(data) {
        if (!data.nome) {
            toast.error('O nome é obrigatório!', toastConfig);
            return;
        }

        if (!data.email) {
            toast.error('O email é obrigatório!', toastConfig);
            return;
        }

        if ( !data.senha ) {
            toast.error('A senha é obrigatória!', toastConfig);
            return;
        }

        if (!data.telefone) {
            toast.error('O telefone é obrigatório!', toastConfig);
            return;
        }


        if (data.senha !== data.confirmarSenha) {
            toast.error('As senhas não correspodem.', toastConfig);
            return;
        }

        const resposta = await fetch('http://localhost:8001/cadastro', {
            method: 'POST',
            body: JSON.stringify(data),
            headers: {
                'Content-type': 'application/json'
            }
        });
        
        const retorno = await resposta.json();
        
        if (retorno === "Email já cadastrado"){
            toast.error('E-mail já cadastrado.', toastConfig);
            return;
        }

        if (retorno === "Cadastro realizado com sucesso"){
            toast.success('Cadastro realizado com sucesso!.', toastConfig);
        }

        history.push('/');
    }

    return (
        <div className='container-cadastro'>
                <div className="logo-area flex-column">
                    <img className="logo-posicao" src={logo} />
                    <img className="barril-pos" src={barril}/>
                </div>
                <div className="imagem-centro">
                    <img src={centroImg} />
                </div>
                <img className="fundo-cadastro" src={detalhe} /> 
           

            <div className='cadastro-form-container'>
                <form className='form-cadastro' onSubmit={handleSubmit(onSubmit)}>
                <div className='flex-row space-between'>
                    <h1 className="cadastro-h1" >Cadastro</h1>
                </div>
                <div className='flex-column mt'>
                    <label htmlFor='nome' className='label-cad'>Nome de usuario</label>
                    <input className='input-cadastro' id='nome' type='text' {... register('nome')}/>
                </div>
                <div className='flex-column mt'>
                    <label htmlFor='email' className='label-cad'>Email</label>
                    <input className='input-cadastro' id='email' type='email' {... register('email')}/>
                </div>
                <div className='flex-column mt'>
                    <label htmlFor='telefone' className='label-cad'>Telefone</label>
                    <input className='input-cadastro' id='telefone' type='Telefone' {... register('telefone')}/>
                </div>

                    <div className="flex-column input-password mt">
                        <label htmlFor='senha' className='label-cad'>Senha</label>
                        <input id='senha' 
                            className="input-cadastro input-relative"
                            name="senha"
                            {...register('senha')}
                            type={showPassword ? 'text' : 'password'} 
                        />
                        <FontAwesomeIcon 
                            icon={showPassword ? faEye : faEyeSlash} className="eye-password"
                            size="lg"
                            onClick={() => setShowPassword(!showPassword)}
                        />
                    </div>

                    <div className="flex-column input-password mt">
                        <label htmlFor='confirmarSenha' className='label-cad'>Repita a sua Senha</label>
                        <input id='confirmarSenha' 
                            className="input-cadastro input-relative"
                            name="confirmarSenha"
                            {...register('confirmarSenha')}
                            type={showPassword ? 'text' : 'password'} 
                        />
                        <FontAwesomeIcon 
                            icon={showPassword ? faEye : faEyeSlash} className="eye-password"
                            size="lg"
                            onClick={() => setShowPassword(!showPassword)}
                        />
                    </div>

                    <div className='flex-row content-center'>
                        <button className='btn-orange button-margin mt'type='submit' >Criar conta</button>
                    </div>
                    <div className='text-center mb-lg'>
                        <span className="span-cadastro">Já tem uma conta?</span>
                        <Link to='/' className='link-login'>Login</Link>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default Cadastro;