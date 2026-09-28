import React from 'react';


const formatarMoeda = (valor) => {
  return Number(valor).toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });
};


const TabelaProdutos = ({ produtos, onVerDetalhes, onEditar, onExcluir }) => {
  return (
    <div className="tabela-container">
      <table className="custom-table">
        <thead>
          <tr>
            <th>ID</th>
            <th>Descrição</th>
            <th>Marca</th>
            <th>Estoque</th>
            <th>Valor Compra</th>
            <th>Valor Venda</th>
            <th className="th-acoes">Ações</th>
          </tr>
        </thead>
        <tbody>
          {produtos.length === 0 ? (
            <tr>
              <td colSpan="7" className="text-center">Nenhum produto cadastrado.</td>
            </tr>
          ) : (
            produtos.map((p) => (
              <tr key={p.id}>
                <td>{p.id}</td>
                <td className="font-semibold">{p.descricao}</td>
                <td><span className="badge">{p.marca}</span></td>
                <td>{p.estoque}</td>
                <td>{formatarMoeda(p.valor_compra)}</td>
                <td>{formatarMoeda(p.valor_venda)}</td>
                <td className="td-acoes">
                  <button
                    className="btn-action btn-view"
                    title="Listar Detalhes"
                    onClick={() => onVerDetalhes(p)}
                  >
                    🔍 Detalhes
                  </button>
                  <button
                    className="btn-action btn-edit"
                    title="Alterar"
                    onClick={() => onEditar(p)}
                  >
                    ✏️ Alterar
                  </button>
                  <button
                    className="btn-action btn-delete"
                    title="Excluir"
                    onClick={() => onExcluir(p.id)}
                  >
                    🗑️ Excluir
                  </button>
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
};


export default TabelaProdutos;
