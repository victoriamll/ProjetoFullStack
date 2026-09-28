import React from 'react';


const formatarMoeda = (valor) => {
  return Number(valor).toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });
};


const ModalDetalhes = ({ isOpen, onClose, produto }) => {
  if (!isOpen || !produto) return null;


  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <h2>Detalhes do Produto #{produto.id}</h2>
        <div className="detalhes-body">
          <p><strong>Descrição:</strong> {produto.descricao}</p>
          <p><strong>Marca:</strong> {produto.marca}</p>
          <p><strong>Estoque:</strong> {produto.estoque} unidades</p>
          <p><strong>Valor Compra:</strong> {formatarMoeda(produto.valor_compra)}</p>
          <p><strong>Valor Venda:</strong> {formatarMoeda(produto.valor_venda)}</p>
          <p><strong>Margem de Lucro:</strong> {formatarMoeda(produto.valor_venda - produto.valor_compra)}</p>
        </div>
        <div className="modal-actions">
          <button className="btn btn-secondary" onClick={onClose}>Fechar</button>
        </div>
      </div>
    </div>
  );
};


export default ModalDetalhes;
