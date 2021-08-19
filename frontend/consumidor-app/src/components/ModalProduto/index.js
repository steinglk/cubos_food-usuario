import './styles.css'
import pizza from '../../assets/pizarria.png';
import moneyicon from '../../assets/money-icon.svg';
import tempoicon from '../../assets/tempo-icon.svg';
import {useState} from 'react';


function ModalProduto() {
    const [contador, setContador] = useState(0);
    const quantidade= 0;
    const dadosProduto = {
        nome: "Pizza portuguesa",
        preco: 2000,
        img: '../../assets/pizzaria.png',
        pedidoMinimo: "R$ 20,00",
        tempoEntrega: "40 - 60min",
        descricao: "é bom mesmo póde confiar"
    }

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
                    <div className="flex-row space-around">
                        <div className="flex-row">
                        <button onClick={() => handleContador(-1)}>-</button>
                        <p>{contador}</p>
                        <button onClick={() => handleContador(1)}>+</button>
                        </div>
                        <button>Adicionar produto ao carrinho</button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ModalProduto;