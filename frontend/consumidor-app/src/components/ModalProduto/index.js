import './styles.css'
import moneyicon from '../../assets/money-icon.svg';
import tempoicon from '../../assets/tempo-icon.svg';
import {useState} from 'react';
import mais from '../../assets/mais.svg';
import menos from '../../assets/menos.svg';
import semImagem from '../../assets/semImagem.png';
import carrinho from '../../assets/carrinho.svg';

function ModalProduto({dadosProduto, dadosRestaurante, setOpen, sacola, open, addCarrinho, abrirCarrinho, noCarrinho}) {
    const [contador, setContador] = useState(0);
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
        descricao: dadosProduto.descricao
    }

    return (
        <div>
            {open && 
            <div className="modal">
                <div className="modal-produto">
                    <img className="close-button"  onClick={() => setOpen(false)} src={mais}/>
                    <img className="img-modal" src={dadosProduto.imagem_produto ? dadosProduto.imagem_produto : semImagem} />
                    <img className='imagem-produtos img-absolute' 
                    src={dadosRestaurante.imagem_restaurante} />
                    <div className="flex-column area-dados space-around">
                        
                        <div>
                            {!addCarrinho ? (
                                <div>
                                    <h1>{dadosProduto.nome ? dadosProduto.nome : dadosProduto.nome_produto}</h1>
                                    <div className="flex-row space-around mx-lg">
                                        <img src={moneyicon} />
                                        <p className="bold">Pedido Mínimo: R$ <span className="normal-weight">{dadosRestaurante.valor_minimo_pedido/100}</span></p>
                                        <img src={tempoicon} />
                                        <p className="bold" >Tempo de entrega: <span className="normal-weight">{dadosRestaurante.taxa_entrega} minutos</span></p>
                                    </div>
                                    <div className="flex-row space-around mx-lg my-lg">
                                        <p>{dadosProduto.descricao}</p>
                                        <span className='span-valor'> R$ {dadosProduto.preco ? dadosProduto.preco/100 : dadosProduto.valor_produto/100}</span> 
                                    </div>
                                    <div>
                                        {!noCarrinho ? 
                                            (
                                                <div className="flex-row space-around items-center">
                                                <div className="flex-row contador">
                                                    <button className="btn-orange-left" onClick={() => handleContador(-1)}><img src={menos} /></button>
                                                    <p >{contador}</p>
                                                    <button className="btn-orange-right" onClick={() => handleContador(1)}><img src={mais} /></button>
                                                </div>
                                                <button className="btn-orange mb-lg" 
                                                onClick={() => sacola(dadosPedido)}>Adicionar produto ao carrinho</button>
                                            </div> 
                                            ) :
                                            (<div></div>)
                                        }
                                    </div>
                                </div>
                            ) :
                            (    
                                <div className='flex-column items-center space-between addCarrinho'>
                                    <div className='flex-column content-center items-center msgSucesso'>
                                        <img src={carrinho} alt='Carrinho' />
                                        <p>Pedido adicionado!</p>
                                    </div>
                                    <div className='msgGoToCarrinho'>
                                        <p className="irCarrinho"
                                        onClick={() => {
                                            abrirCarrinho(true) 
                                            setOpen(false)
                                        }}>Ir para a revisão do pedido</p>
                                    </div>
                                </div>
                            )           
                        }
                        </div>
                    </div>
                </div>
            </div>
            }
        </div>
    )
}

export default ModalProduto;