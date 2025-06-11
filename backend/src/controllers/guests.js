import Guests from '../models/guests.js';

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

      await guest.destroy();

      return res.status(200).json({ message: 'Deleted.' });
    } catch (error) {
      console.error(error);
      return res.status(500).json({ error: 'Internal server error.' });
    }
  }
}

export default new GuestsController();
