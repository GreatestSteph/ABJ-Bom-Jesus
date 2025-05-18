import Produtos from '../models/produtos.js';

class ProdutosController {
  async create(req, res) {
    const data = req.body;

    try {
      const produto = await Produtos.create(data);
      return res.status(201).json(produto);
    } catch (error) {
      console.error(error);
      return res.status(500).json({ error: 'Internal server error.' });
    }
  }

  async list(req, res) {
    try {
      const produtos = await Produtos.findAll();
      return res.status(200).json(produtos);
    } catch (error) {
      console.error(error);
      return res.status(500).json({ error: 'Internal server error.' });
    }
  }

  async get(req, res) {
    const { id } = req.params;

    try {
      const produto = await Produtos.findByPk(id);

      if (!produto) {
        return res.status(404).json({ error: 'Internal server error.' });
      }

      return res.status(200).json(produto);
    } catch (error) {
      console.error(error);
      return res.status(500).json({ error: 'Internal server error.' });
    }
  }

  async update(req, res) {
    const { id } = req.params;
    const data = req.body;

    try {
      const produto = await Produtos.findByPk(id);

      if (!produto) {
        return res.status(404).json({ error: 'Not found.' });
      }

      await produto.update(data);

      return res.status(200).json(produto);
    } catch (error) {
      console.error(error);
      return res.status(500).json({ error: 'Internal server error.' });
    }
  }

  async delete(req, res) {
    const { id } = req.params;

    try {
      const produto = await Produtos.findByPk(id);

      if (!produto) {
        return res.status(404).json({ error: 'Not found.' });
      }

      await produto.destroy();

      return res.status(200).json({ message: 'Deleted.' });
    } catch (error) {
      console.error(error);
      return res.status(500).json({ error: 'Internal server error.' });
    }
  }
}

export default new ProdutosController();
