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
    const [showPassword, setShowPassword] = useState(false);
    const {register, handleSubmit} = useForm();
    const history = useHistory();

    async function onSubmit(data) {
        if (!data.email || !data.senha || !data.telefone || !data.senha || !data.confirmarSenha) {
            toast.error('Todos os campos são obrigatórios!', {
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

        if (data.senha !== data.confirmarSenha) {
            toast.error('As senhas não correspodem.', {
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

        const resposta = await fetch('http://localhost:5000/cadastro', {
            method: 'POST',
            body: JSON.stringify(data),
            headers: {
                'Content-type': 'application/json'
            }
        });
        
        const retorno = await resposta.json();
        
        if (retorno === "Email já cadastrado"){
            toast.error('E-mail já cadastrado.', {
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

        if (retorno === "Cadastro realizado com sucesso"){
            toast.success('Cadastro realizado com sucesso!.', {
                position: "top-right",
                autoClose: 3000,
                hideProgressBar: true,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined
            });
        }

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
                    <div className='text-center'>
                        <span className="span-login">Já tem uma conta?</span>
                        <Link to='/cadastro' className='link-login'>Login</Link>
                    </div>

                        {/* <label htmlFor="senha">Senha</label>
                        <input className="input-cadastro"
                            type={showPassword ? 'text' : 'password'}
                            name="senha"
                            {...register('senha')}
                        />
                        <FontAwesomeIcon icon={showPassword ? faEye : faEyeSlash} className="eye-password"
                            size="lg"
                            onClick={() => setShowPassword(!showPassword)} /> */}
                    
                </form>
            </div>
        </div>
    )
}

export default Cadastro;