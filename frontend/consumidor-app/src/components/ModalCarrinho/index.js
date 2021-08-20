import './style.css';
import Carrinho from '../../assets/carrinho.svg';
import CadastroImg from '../../assets/pizarria.png'

function ModalCarrinho({open = false, setOpen}){
    return(
        <div>
            {open && 
                <div className='modal'>
                    <div className='modal-content-carrinho'>
                        <div className='fecharModal flex-row flex-end'>
                            <button className='btn-fechar'>X</button>
                        </div>
                        <div className='nomeRestauranteModal flex-row '>
                            <img src={Carrinho} className='margem-carrinho' />
                            <h1>Pizza</h1>
                        </div>
                        <div className='enderecoModal'>
                            <span className='span-endereco'>Endereço de Entrega: </span>
                            <span className='span-endereco2'>Av. Tancredo Neves, 2227, ed. Salvador Prime, sala 901:906; 917:920 - Caminho das Árvores, Salvador - BA, 41820-021.</span>
                        </div>
                        <div className='tempoEntregaModal'>
                            <span>Tempo de Entrega: </span>
                            <span className='span-tempo'>45min</span>
                        </div>
                        <div className='produtod-modal flex-row'>
                            <div className='imagem-produto '>
                                <img src={CadastroImg} className='imagem-carrinho'/>
                            </div>
                            <div className='infor-produtos flex-column space-around'>
                                <span className='infor-nome'>Pizza Portuguesa</span>
                                <span>1 unidade</span>
                                <span className='infor-valor'>R$ 99.99</span>
                            </div>
                        </div>
                        <div className='maisProdutos'>
                            <span>Adicionar mais itens ao pedido</span>
                        </div>
                        <div className='rodapeModal'>
                            <div className='subTotal marginRodape flex-row space-between'>
                                <span>Subtotal</span>
                                <span className='rodapeWeight fontRodape'>R$ 299,97</span>
                            </div>
                            <div className='taxa marginRodape flex-row space-between'>
                                <span>Taxa de entrega</span>
                                <span className='rodapeWeight fontRodape'>R$ 8,90</span>
                            </div>
                            <div className='total marginRodape flex-row space-between'>
                                <span>Total</span>
                                <span className='rodapeWeight fontValor'>R$ 308,87</span>
                            </div>
                        </div>
                        <div className='flex-row space-around'>
                            <button className='btn-orange'>Confirmar Pedido</button>
                        </div>
                    </div>
                </div>
            }
        </div>
    );
}

export default ModalCarrinho;