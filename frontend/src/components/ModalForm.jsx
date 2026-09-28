import React, { useState, useEffect } from 'react';


const ModalForm = ({ isOpen, onClose, onSave, produtoEdicao }) => {
  const [form, setForm] = useState({
    descricao: '',
    marca: '',
    estoque: '',
    valor_compra: '',
    valor_venda: ''
  });


  useEffect(() => {
    if (produtoEdicao) {
      setForm(produtoEdicao);
    } else {
      setForm({
        descricao: '',
        marca: '',
        estoque: '',
        valor_compra: '',
        valor_venda: ''
      });
    }
  }, [produtoEdicao, isOpen]);


  if (!isOpen) return null;


  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm(prev => ({ ...prev, [name]: value }));
  };


  const handleSubmit = (e) => {
    e.preventDefault();
    onSave(form);
  };


  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <h2>{produtoEdicao ? 'Alterar Produto' : 'Novo Produto'}</h2>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label>Descrição</label>
            <input
              type="text"
              name="descricao"
              value={form.descricao}
              onChange={handleChange}
              placeholder="Ex: Teclado Mecânico"
              required
            />
          </div>


          <div className="form-group">
            <label>Marca</label>
            <input
              type="text"
              name="marca"
              value={form.marca}
              onChange={handleChange}
              placeholder="Ex: Razer"
              required
            />
          </div>


          <div className="form-row">
            <div className="form-group">
              <label>Estoque</label>
              <input
                type="number"
                name="estoque"
                value={form.estoque}
                onChange={handleChange}
                placeholder="0"
                min="0"
                required
              />
            </div>
            <div className="form-group">
              <label>Valor Compra (R$)</label>
              <input
                type="number"
                step="0.01"
                name="valor_compra"
                value={form.valor_compra}
                onChange={handleChange}
                placeholder="0.00"
                required
              />
            </div>
            <div className="form-group">
              <label>Valor Venda (R$)</label>
              <input
                type="number"
                step="0.01"
                name="valor_venda"
                value={form.valor_venda}
                onChange={handleChange}
                placeholder="0.00"
                required
              />
            </div>
          </div>


          <div className="modal-actions">
            <button type="button" className="btn btn-secondary" onClick={onClose}>
              Cancelar
            </button>
            <button type="submit" className="btn btn-primary">
              {produtoEdicao ? 'Salvar Alterações' : 'Gravar Produto'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};


export default ModalForm;
