const ProdutoModel = require('../models/produtoModel');


const ProdutoController = {
  listarTodos: async (req, res) => {
    try {
      const produtos = await ProdutoModel.findAll();
      return res.status(200).json(produtos);
    } catch (error) {
      console.error('Erro ao listar produtos:', error);
      return res.status(500).json({ mensagem: 'Erro interno ao listar produtos.' });
    }
  },


  buscarPorId: async (req, res) => {
    try {
      const { id } = req.params;
      const produto = await ProdutoModel.findById(id);


      if (!produto) {
        return res.status(404).json({ mensagem: 'Produto não encontrado.' });
      }


      return res.status(200).json(produto);
    } catch (error) {
      console.error('Erro ao buscar produto:', error);
      return res.status(500).json({ mensagem: 'Erro interno ao buscar produto.' });
    }
  },


  criar: async (req, res) => {
    try {
      const { descricao, marca, estoque, valor_compra, valor_venda } = req.body;


      if (!descricao || !marca || estoque === undefined || !valor_compra || !valor_venda) {
        return res.status(400).json({ mensagem: 'Todos os campos são obrigatórios.' });
      }


      const novoProduto = await ProdutoModel.create({
        descricao,
        marca,
        estoque: parseInt(estoque, 10),
        valor_compra: parseFloat(valor_compra),
        valor_venda: parseFloat(valor_venda)
      });


      return res.status(201).json(novoProduto);
    } catch (error) {
      console.error('Erro ao criar produto:', error);
      return res.status(500).json({ mensagem: 'Erro interno ao cadastrar produto.' });
    }
  },


  atualizar: async (req, res) => {
    try {
      const { id } = req.params;
      const { descricao, marca, estoque, valor_compra, valor_venda } = req.body;


      if (!descricao || !marca || estoque === undefined || !valor_compra || !valor_venda) {
        return res.status(400).json({ mensagem: 'Todos os campos são obrigatórios.' });
      }


      const atualizado = await ProdutoModel.update(id, {
        descricao,
        marca,
        estoque: parseInt(estoque, 10),
        valor_compra: parseFloat(valor_compra),
        valor_venda: parseFloat(valor_venda)
      });


      if (!atualizado) {
        return res.status(404).json({ mensagem: 'Produto não encontrado para atualização.' });
      }


      return res.status(200).json({ mensagem: 'Produto atualizado com sucesso!' });
    } catch (error) {
      console.error('Erro ao atualizar produto:', error);
      return res.status(500).json({ mensagem: 'Erro interno ao atualizar produto.' });
    }
  },


  excluir: async (req, res) => {
    try {
      const { id } = req.params;
      const deletado = await ProdutoModel.delete(id);


      if (!deletado) {
        return res.status(404).json({ mensagem: 'Produto não encontrado para exclusão.' });
      }


      return res.status(200).json({ mensagem: 'Produto excluído com sucesso!' });
    } catch (error) {
      console.error('Erro ao excluir produto:', error);
      return res.status(500).json({ mensagem: 'Erro interno ao excluir produto.' });
    }
  }
};


module.exports = ProdutoController;
