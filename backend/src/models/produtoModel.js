const db = require('../config/database');


const ProdutoModel = {
  // Retorna todos os produtos ordenados pelo ID decrescente
  findAll: async () => {
    const [rows] = await db.query('SELECT * FROM produtos ORDER BY id DESC');
    return rows;
  },


  // Busca um produto por ID
  findById: async (id) => {
    const [rows] = await db.query('SELECT * FROM produtos WHERE id = ?', [id]);
    return rows[0];
  },


  // Insere um novo produto
  create: async (produto) => {
    const { descricao, marca, estoque, valor_compra, valor_venda } = produto;
    const [result] = await db.query(
      'INSERT INTO produtos (descricao, marca, estoque, valor_compra, valor_venda) VALUES (?, ?, ?, ?, ?)',
      [descricao, marca, estoque, valor_compra, valor_venda]
    );
    return { id: result.insertId, ...produto };
  },


  // Atualiza um produto existente
  update: async (id, produto) => {
    const { descricao, marca, estoque, valor_compra, valor_venda } = produto;
    const [result] = await db.query(
      'UPDATE produtos SET descricao = ?, marca = ?, estoque = ?, valor_compra = ?, valor_venda = ? WHERE id = ?',
      [descricao, marca, estoque, valor_compra, valor_venda, id]
    );
    return result.affectedRows > 0;
  },


  // Remove um produto por ID
  delete: async (id) => {
    const [result] = await db.query('DELETE FROM produtos WHERE id = ?', [id]);
    return result.affectedRows > 0;
  }
};


module.exports = ProdutoModel;
