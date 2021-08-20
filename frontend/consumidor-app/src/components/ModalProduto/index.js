import './styles.css'
import pizza from '../../assets/pizarria.png';
import moneyicon from '../../assets/money-icon.svg';
import tempoicon from '../../assets/tempo-icon.svg';
import {useState} from 'react';
import mais from '../../assets/mais.svg';
import menos from '../../assets/menos.svg'

function ModalProduto({dadosProduto}) {
    const [contador, setContador] = useState(0);
    console.log(dadosProduto);
    function handleContador(soma) {
        const validarSoma = contador + soma;
        if(validarSoma < 0 ) return;

        setContador(contador + soma);
    }

    return (
        <div className="modal">
            <div className="modal-produto">
                <div className="img-modal">a </div>
                <img className='imagem-produtos img-absolute' 
                src={pizza} />
                <div className="flex-column area-dados space-around">
                    <h1>{dadosProduto.nome}</h1>
                    <div className="flex-row space-around mx-lg">
                        <img src={moneyicon} />
                        <p>Pedido Mínimo: <span>{dadosProduto.pedidoMinimo}</span></p>
                        <img src={tempoicon} />
                        <p>Pedido Mínimo: <span>{dadosProduto.pedidoMinimo}</span></p>
                    </div>
                    <div className="flex-row space-around mx-lg my-lg">
                        <p>{dadosProduto.descricao}</p>
                        <span className='span-valor'>{dadosProduto.preco}</span> 
                    </div>
                    <div className="flex-row space-around items-center">
                        <div className="flex-row contador">
                            <button className="btn-orange-left" onClick={() => handleContador(-1)}><img src={menos} /></button>
                            <p >{contador}</p>
                            <button className="btn-orange-right" onClick={() => handleContador(1)}><img src={mais} /></button>
                        </div>
                        <button className="btn-orange mb-lg">Adicionar produto ao carrinho</button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ModalProduto;