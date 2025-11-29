import Guests from '../models/guests.js';
import Entradas from '../models/entradas.js';
import Bloqueio from '../models/bloqueio.js';
import Consumos from '../models/consumos.js';
import Occurrence from '../models/occurrence.js';

class GuestsController {
  async create(req, res) {
    const data = req.body;

    try {
      if (data.cpf) {
        const existingGuest = await Guests.findOne({ where: { cpf: data.cpf } });
        if (existingGuest) {
          return res.status(400).json({ 
            error: 'CPF já cadastrado',
            message: 'Este CPF já está cadastrado no sistema.'
          });
        }
      }

      const guest = await Guests.create(data);
      return res.status(201).json(guest);
    } catch (error) {
      console.error(error);
      return res.status(500).json({ error: 'Internal server error.' });
    }
  }

  async list(req, res) {
    try {
      const guests = await Guests.findAll({ order: [['nome', 'ASC']] });
      return res.status(200).json(guests);
    } catch (error) {
      console.error(error);
      return res.status(500).json({ error: 'Internal server error.' });
    }
  }

  async get(req, res) {
    const { id } = req.params;

    try {
      const guest = await Guests.findByPk(id);

      if (!guest) {
        return res.status(404).json({ error: 'Internal server error.' });
      }

      return res.status(200).json(guest);
    } catch (error) {
      console.error(error);
      return res.status(500).json({ error: 'Internal server error.' });
    }
  }

  async update(req, res) {
    const { id } = req.params;
    const data = req.body;

    try {
      const guest = await Guests.findByPk(id);

      if (!guest) {
        return res.status(404).json({ error: 'Not found.' });
      }

      if (data.cpf && data.cpf !== guest.cpf) {
        const existingGuest = await Guests.findOne({ where: { cpf: data.cpf } });
        if (existingGuest) {
          return res.status(400).json({ 
            error: 'CPF já cadastrado',
            message: 'Este CPF já está cadastrado no sistema.'
          });
        }
      }

      await guest.update(data);

      return res.status(200).json(guest);
    } catch (error) {
      console.error(error);
      return res.status(500).json({ error: 'Internal server error.' });
    }
  }

  async delete(req, res) {
    const { id } = req.params;

    try {
      const guest = await Guests.findByPk(id);

      if (!guest) {
        return res.status(404).json({ error: 'Not found.' });
      }

      // Verificar se o hóspede tem registros relacionados
      const [entradas, bloqueios, consumos, ocorrencias] = await Promise.all([
        Entradas.count({ where: { hospedeId: id } }),
        Bloqueio.count({ where: { hospede_id: id } }),
        Consumos.count({ where: { hospedeId: id } }),
        Occurrence.count({ where: { guest_id: id } })
      ]);

      const registrosRelacionados = [];
      if (entradas > 0) registrosRelacionados.push(`${entradas} hospedagem(ns)`);
      if (bloqueios > 0) registrosRelacionados.push(`${bloqueios} bloqueio(s)`);
      if (consumos > 0) registrosRelacionados.push(`${consumos} consumo(s)`);
      if (ocorrencias > 0) registrosRelacionados.push(`${ocorrencias} ocorrência(s)`);

      if (registrosRelacionados.length > 0) {
        return res.status(400).json({
          error: 'Não é possível excluir este hóspede',
          message: `Este hóspede possui registros no sistema: ${registrosRelacionados.join(', ')}. Não é permitido excluir hóspedes com histórico.`
        });
      }

      await guest.destroy();

      return res.status(200).json({ message: 'Deleted.' });
    } catch (error) {
      console.error(error);
      return res.status(500).json({ error: 'Internal server error.' });
    }
  }
}

export default new GuestsController();
