import Entradas from '../models/entradas.js';
import Guests from '../models/guests.js';

class EntradasController {

  // Criar entrada
  async create(req, res) {
    try {
      const entrada = await Entradas.create(req.body);
      return res.status(201).json(entrada);
    } catch (e) {
      console.error(e);
      return res.status(500).json({ error: 'Erro ao criar entrada.' });
    }
  }

  // Listar todas as entradas
  async list(req, res) {
    try {
      const entradas = await Entradas.findAll({
        include: [
          {
            model: Guests,
            as: 'hospede',
            attributes: ['id', 'nome', 'cpf', 'rg', 'data_nascimento']
          }
        ],
        order: [['dataEntrada', 'DESC']]
      });

      return res.json(entradas);
    } catch (e) {
      console.log(e);
      return res.status(500).json({ error: 'Erro ao listar entradas.' });
    }
  }

  // Buscar entrada por ID
  async get(req, res) {
    try {
      const entrada = await Entradas.findByPk(req.params.id, {
        include: [
          {
            model: Guests,
            as: 'hospede',
            attributes: ['id', 'nome', 'cpf', 'rg', 'data_nascimento']
          }
        ]
      });

      if (!entrada) {
        return res.status(404).json({ error: 'Entrada não encontrada.' });
      }

      return res.json(entrada);
    } catch (e) {
      console.log(e);
      return res.status(500).json({ error: 'Erro ao buscar entrada.' });
    }
  }

  // Atualizar uma entrada
  async update(req, res) {
    try {
      const entrada = await Entradas.findByPk(req.params.id);

      if (!entrada) {
        return res.status(404).json({ error: 'Entrada não encontrada.' });
      }

      await entrada.update(req.body);
      return res.json(entrada);

    } catch (e) {
      console.log(e);
      return res.status(500).json({ error: 'Erro ao atualizar entrada.' });
    }
  }

  // Deletar entrada
  async delete(req, res) {
    try {
      const entrada = await Entradas.findByPk(req.params.id);

      if (!entrada) {
        return res.status(404).json({ error: 'Entrada não encontrada.' });
      }

      await entrada.destroy();
      return res.json({ message: 'Entrada deletada.' });

    } catch (e) {
      console.log(e);
      return res.status(500).json({ error: 'Erro ao deletar entrada.' });
    }
  }
}

export default new EntradasController();
