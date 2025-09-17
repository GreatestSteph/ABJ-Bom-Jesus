import Occurrence from '../models/occurrence.js';
import Guests from '../models/guests.js';
import TipoOcorrencia from '../models/tipoOcorrencia.js';
import Users from '../models/users.js';

class OccurrencesController {
  async create(req, res) {
    const data = req.body;

    try {
      // Validate guest exists
      const guest = await Guests.findByPk(data.guest_id);
      if (!guest) {
        return res.status(404).json({
          error: 'Guest not found',
          message: 'O hóspede especificado não foi encontrado.'
        });
      }

      // Validate occurrence type exists
      const occurrenceType = await TipoOcorrencia.findByPk(data.occurrence_type_id);
      if (!occurrenceType) {
        return res.status(404).json({
          error: 'Occurrence type not found',
          message: 'O tipo de ocorrência especificado não foi encontrado.'
        });
      }

      const occurrence = await Occurrence.create(data);
      return res.status(201).json(occurrence);
    } catch (error) {
      console.error(error);
      return res.status(500).json({ error: 'Internal server error.' });
    }
  }

  async list(req, res) {
    try {
      const occurrences = await Occurrence.findAll({
        include: [
          {
            model: Guests,
            as: 'guest',
            attributes: ['id', 'nome']
          },
          {
            model: TipoOcorrencia,
            as: 'occurrenceType',
            attributes: ['id', 'nome', 'nivel']
          },
          {
            model: Users,
            as: 'registeredByUser',
            attributes: ['id', 'username']
          }
        ],
        order: [['registration_date', 'DESC']]
      });
      return res.status(200).json(occurrences);
    } catch (error) {
      console.error(error);
      return res.status(500).json({ error: 'Internal server error.' });
    }
  }

  async get(req, res) {
    const { id } = req.params;

    try {
      const occurrence = await Occurrence.findByPk(id, {
        include: [
          {
            model: Guests,
            as: 'guest'
          },
          {
            model: TipoOcorrencia,
            as: 'occurrenceType'
          },
          {
            model: Users,
            as: 'registeredByUser',
            attributes: ['id', 'username']
          }
        ]
      });

      if (!occurrence) {
        return res.status(404).json({ error: 'Occurrence not found.' });
      }

      return res.status(200).json(occurrence);
    } catch (error) {
      console.error(error);
      return res.status(500).json({ error: 'Internal server error.' });
    }
  }

  async update(req, res) {
    const { id } = req.params;
    const data = req.body;

    try {
      const occurrence = await Occurrence.findByPk(id);

      if (!occurrence) {
        return res.status(404).json({ error: 'Occurrence not found.' });
      }

      // If updating guest_id, validate guest exists
      if (data.guest_id) {
        const guest = await Guests.findByPk(data.guest_id);
        if (!guest) {
          return res.status(404).json({
            error: 'Guest not found',
            message: 'O hóspede especificado não foi encontrado.'
          });
        }
      }

      // If updating occurrence_type_id, validate occurrence type exists
      if (data.occurrence_type_id) {
        const occurrenceType = await TipoOcorrencia.findByPk(data.occurrence_type_id);
        if (!occurrenceType) {
          return res.status(404).json({
            error: 'Occurrence type not found',
            message: 'O tipo de ocorrência especificado não foi encontrado.'
          });
        }
      }

      await occurrence.update(data);

      return res.status(200).json(occurrence);
    } catch (error) {
      console.error(error);
      return res.status(500).json({ error: 'Internal server error.' });
    }
  }

  async delete(req, res) {
    const { id } = req.params;

    try {
      const occurrence = await Occurrence.findByPk(id);

      if (!occurrence) {
        return res.status(404).json({ error: 'Occurrence not found.' });
      }

      await occurrence.destroy();

      return res.status(200).json({ message: 'Occurrence deleted successfully.' });
    } catch (error) {
      console.error(error);
      return res.status(500).json({ error: 'Internal server error.' });
    }
  }

  async getByGuest(req, res) {
    const { guest_id } = req.params;

    try {
      const guest = await Guests.findByPk(guest_id);
      if (!guest) {
        return res.status(404).json({
          error: 'Guest not found',
          message: 'O hóspede especificado não foi encontrado.'
        });
      }

      const occurrences = await Occurrence.findAll({
        where: { guest_id },
        include: [
          {
            model: TipoOcorrencia,
            as: 'occurrenceType',
            attributes: ['id', 'nome', 'nivel']
          },
          {
            model: Users,
            as: 'registeredByUser',
            attributes: ['id', 'username']
          }
        ],
        order: [['registration_date', 'DESC']]
      });

      return res.status(200).json(occurrences);
    } catch (error) {
      console.error(error);
      return res.status(500).json({ error: 'Internal server error.' });
    }
  }
}

export default new OccurrencesController();