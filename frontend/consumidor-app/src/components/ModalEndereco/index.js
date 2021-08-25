import './styles.css';
import Carrinho from '../../assets/carrinho.svg';
import Checked from '../../assets/checked.svg'
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import {toast} from 'react-toastify';
import toastConfig from '../../tools/toastConfig';

function ModalEndereco ({open, setOpen}) {
    const {register, handleSubmit} = useForm();
    const [estadoEndereco, setEstadoEndereco] = useState('cadastro');

    async function onSubmit(data) {
        console.log(data);
        if(!data.cep) {
            toast.error('O campo CEP é obrigatório', toastConfig);
            return;
        }
        if(!data.endereco) {
            toast.error('O campo endereço é obrigatório!', toastConfig);
            return;
        }
        const resposta = await fetch('http://localhost:8001/adicionarEndereco', {
            method: 'POST',
            body: JSON.stringify(data),
            headers: {
                'Content-type': 'application/json',
                'Authorization': `Bearer ${localStorage.getItem('@usuario/token')}`
            }
        })
        const retorno = await resposta.json();

        if(retorno === 'Endereço adicionado com sucesso') {
            toast.success('Endereço adicionado com sucesso', toastConfig);
            setEstadoEndereco('sucesso');
            return
        }
        toast.error(retorno, toastConfig);
        return
    }

    return (
        <div>
            {open &&
                <div className='modal'>
                    <div className='modal-content-carrinho'>
                        <div className='fecharModal flex-row flex-end'>
                            <button className='btn-fechar' 
                            onClick={() => setOpen(false)}>X</button>
                        </div>
                        <div className='h1-endereco flex-row '>
                            <img alt="icone de carrinho" 
                            src={Carrinho} 
                            className='margem-carrinho' />
                            <h1 className="h1-endereco">Adicionar endereço</h1>
                        </div>
                        {estadoEndereco === 'cadastro' &&
                        <form className="flex-column" 
                            onSubmit={handleSubmit(onSubmit)}>
                            <div className="flex-column mt">
                                <label className="label-endereco" 
                                    htmlFor="cep">CEP</label>
                                <input className='input-endereco' 
                                    id="cep"
                                    {...register('cep')} />
                            </div>
                            <div className="flex-column mt">
                                <label className="label-endereco"
                                    htmlFor="endereco">Endereço</label>
                                <input className='input-endereco'   
                                    id="endereco"
                                    {...register('endereco')} />
                            </div>
                            <div className="flex-column mt">
                                <label className="label-endereco" htmlFor="complemento">Complemento</label>
                                <input className='input-endereco' id="complemento"
                                    {...register('complemento')} />
                            </div>
                            {}
                            <button type="submit" className="btn-orange width-endereco">Adicionar Endereço</button>
                        </form>}
                        {estadoEndereco === 'sucesso' && 
                            <div>
                                <img alt="Icone de sucesso" src={Checked}></img>
                                <p>Endereço cadastrado com sucesso</p>
                                <button onClick={() => setOpen(false)} 
                                className="btn-orange width-endereco">Voltar ao carrinho</button>
                            </div>
                        }
                        
                    </div>
                </div>
            }
        </div>
    )
}

export default ModalEndereco;