import React, { useEffect, useState } from 'react';
import api from './services/api';
import TabelaProdutos from './components/TabelaProdutos';
import ModalForm from './components/ModalForm';
import ModalDetalhes from './components/ModalDetalhes';
import './App.css';


function App() {
  const [produtos, setProdutos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [modalFormAberto, setModalFormAberto] = useState(false);
  const [modalDetalhesAberto, setModalDetalhesAberto] = useState(false);
  const [produtoSelecionado, setProdutoSelecionado] = useState(null);
  const [mensagem, setMensagem] = useState({ tipo: '', texto: '' });


  const carregarProdutos = async () => {
    try {
      setLoading(true);
      const res = await api.get('/produtos');
      setProdutos(res.data);
    } catch (err) {
      exibirMensagem('erro', 'Erro ao carregar lista de produtos.');
    } finally {
      setLoading(false);
    }
  };


  useEffect(() => {
    carregarProdutos();
  }, []);


  const exibirMensagem = (tipo, texto) => {
    setMensagem({ tipo, texto });
    setTimeout(() => setMensagem({ tipo: '', texto: '' }), 4000);
  };


  const handleSalvar = async (dados) => {
    try {
      if (produtoSelecionado?.id) {
        await api.put(`/produtos/${produtoSelecionado.id}`, dados);
        exibirMensagem('sucesso', 'Produto atualizado com sucesso!');
      } else {
        await api.post('/produtos', dados);
        exibirMensagem('sucesso', 'Produto gravado com sucesso!');
      }
      setModalFormAberto(false);
      setProdutoSelecionado(null);
      carregarProdutos();
    } catch (err) {
      exibirMensagem('erro', 'Erro ao salvar os dados do produto.');
    }
  };


  const handleExcluir = async (id) => {
    if (window.confirm(`Deseja realmente excluir o produto #${id}?`)) {
      try {
        await api.delete(`/produtos/${id}`);
        exibirMensagem('sucesso', 'Produto removido com sucesso!');
        carregarProdutos();
      } catch (err) {
        exibirMensagem('erro', 'Erro ao excluir o produto.');
      }
    }
  };


  return (
    <div className="container">
      <header className="header">
        <div>
          <h2>Projeto CRUD - PW2</h2>
          <p className="subtitle">Painel de Gerenciamento de Produtos</p>
        </div>
        <button
          className="btn btn-primary"
          onClick={() => {
            setProdutoSelecionado(null);
            setModalFormAberto(true);
          }}
        >
          + Gravar Novo Produto
        </button>
      </header>


      {mensagem.texto && (
        <div className={`alert alert-${mensagem.tipo}`}>
          {mensagem.texto}
        </div>
      )}


      {loading ? (
        <div className="loading">Carregando catálogo...</div>
      ) : (
        <TabelaProdutos
          produtos={produtos}
          onVerDetalhes={(p) => {
            setProdutoSelecionado(p);
            setModalDetalhesAberto(true);
          }}
          onEditar={(p) => {
            setProdutoSelecionado(p);
            setModalFormAberto(true);
          }}
          onExcluir={handleExcluir}
        />
      )}


      <ModalForm
        isOpen={modalFormAberto}
        onClose={() => setModalFormAberto(false)}
        onSave={handleSalvar}
        produtoEdicao={produtoSelecionado}
      />


      <ModalDetalhes
        isOpen={modalDetalhesAberto}
        onClose={() => setModalDetalhesAberto(false)}
        produto={produtoSelecionado}
      />
    </div>
  );
}


export default App;
