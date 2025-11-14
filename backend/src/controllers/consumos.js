import Consumos from '../models/consumos.js';
import Guests from '../models/guests.js';
import Produtos from '../models/produtos.js';

class ConsumosController {

  async create(req, res) {
    try {
      const consumo = await Consumos.create(req.body);
      return res.status(201).json(consumo);
    } catch (e) {
      console.error(e);
      return res.status(500).json({ error: 'Erro ao criar consumo.' });
    }
  }

  async list(req, res) {
    try {
      const consumos = await Consumos.findAll({
        include: [
          { model: Guests, as: 'hospede', attributes: ['id', 'nome', 'data_nascimento'] },
          { model: Produtos, as: 'produto', attributes: ['id', 'nomeDoProduto', 'tamanho', 'cor', 'marca'] }
        ],
        order: [['dataConsumo', 'DESC']]
      });

      return res.json(consumos);
    } catch (e) {
      console.log(e);
      return res.status(500).json({ error: 'Erro ao listar consumos.' });
    }
  }

  async get(req, res) {
    try {
      const consumo = await Consumos.findByPk(req.params.id, {
        include: [
          { model: Guests, as: 'hospede', attributes: ['id', 'nome', 'data_nascimento'] },
          { model: Produtos, as: 'produto', attributes: ['id', 'nomeDoProduto', 'tamanho', 'cor', 'marca'] }
        ]
      });

      if (!consumo) {
        return res.status(404).json({ error: 'Consumo não encontrado.' });
      }

      return res.json(consumo);
    } catch (e) {
      console.log(e);
      return res.status(500).json({ error: 'Erro ao buscar consumo.' });
    }
  }

  async update(req, res) {
    try {
      const consumo = await Consumos.findByPk(req.params.id);

      if (!consumo) {
        return res.status(404).json({ error: 'Consumo não encontrado.' });
      }

      await consumo.update(req.body);
      return res.json(consumo);

    } catch (e) {
      console.log(e);
      return res.status(500).json({ error: 'Erro ao atualizar consumo.' });
    }
  }

  async delete(req, res) {
    try {
      const consumo = await Consumos.findByPk(req.params.id);

      if (!consumo) {
        return res.status(404).json({ error: 'Consumo não encontrado.' });
      }

      await consumo.destroy();
      return res.json({ message: 'Consumo deletado.' });

    } catch (e) {
      console.log(e);
      return res.status(500).json({ error: 'Erro ao deletar consumo.' });
    }
  }
}

export default new ConsumosController();
