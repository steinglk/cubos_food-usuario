import './styles.css'
import pizza from '../../assets/pizarria.png';
import moneyicon from '../../assets/money-icon.svg';
import tempoicon from '../../assets/tempo-icon.svg';
import {useState} from 'react';
import mais from '../../assets/mais.svg';
import menos from '../../assets/menos.svg'

function ModalProduto({dadosProduto, dadosRestaurante, setOpen, sacola}) {
    const [contador, setContador] = useState(0);
    const cliente_id = localStorage.getItem('usuario/cliente_id');
    function handleContador(soma) {
        const validarSoma = contador + soma;
        if(validarSoma < 0 ) return;

        setContador(contador + soma);
    }

    const dadosPedido = {
        id: dadosProduto.id,
        nome_produto: dadosProduto.nome,
        imagem_produto: dadosProduto.imagem_produto,
        quantidade: contador,
        valor_produto: dadosProduto.preco,
    }

    console.log(dadosPedido);

    return (
        <div className="modal">
            <div className="modal-produto">
                <img className="close-button"  onClick={() => setOpen(false)} src={mais}/>
                <img className="img-modal" src={dadosProduto.imagem_produto} />
                <img className='imagem-produtos img-absolute' 
                src={dadosRestaurante.imagem_restaurante} />
                <div className="flex-column area-dados space-around">
                    <h1>{dadosProduto.nome}</h1>
                    <div className="flex-row space-around mx-lg">
                        <img src={moneyicon} />
                        <p className="bold">Pedido Mínimo: <span className="normal-weight">{dadosRestaurante.valor_minimo_pedido}</span></p>
                        <img src={tempoicon} />
                        <p className="bold" >Tempo de entrega: <span className="normal-weight">{dadosRestaurante.taxa_entrega}</span></p>
                    </div>
                    <div className="flex-row space-around mx-lg my-lg">
                        <p>{dadosProduto.descricao}</p>
                        <span className='span-valor'>{dadosProduto.preco/10}</span> 
                    </div>
                    <div className="flex-row space-around items-center">
                        <div className="flex-row contador">
                            <button className="btn-orange-left" onClick={() => handleContador(-1)}><img src={menos} /></button>
                            <p >{contador}</p>
                            <button className="btn-orange-right" onClick={() => handleContador(1)}><img src={mais} /></button>
                        </div>
                        <button className="btn-orange mb-lg" onClick={() => sacola(dadosPedido)}>Adicionar produto ao carrinho</button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ModalProduto;