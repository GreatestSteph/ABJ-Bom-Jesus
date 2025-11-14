import Occurrence from '../models/occurrence.js';
import Guests from '../models/guests.js';
import TipoOcorrencia from '../models/tipoOcorrencia.js';
import Users from '../models/users.js';
import Bloqueio from '../models/bloqueio.js';
import { Op } from 'sequelize';

class OccurrencesController {
  async create(req, res) {
    const data = req.body;

    try {
      // Validate required fields
      if (!data.guest_id || !data.occurrence_type_id || !data.description || !data.registration_date || !data.registered_by_user_id) {
        return res.status(400).json({
          error: 'Missing required fields',
          message: 'Todos os campos obrigatórios devem ser preenchidos.'
        });
      }

      // Validate IDs are numbers
      const guestId = parseInt(data.guest_id);
      const occurrenceTypeId = parseInt(data.occurrence_type_id);
      const registeredByUserId = parseInt(data.registered_by_user_id);

      if (isNaN(guestId) || isNaN(occurrenceTypeId) || isNaN(registeredByUserId)) {
        return res.status(400).json({
          error: 'Invalid ID format',
          message: 'IDs devem ser números válidos.'
        });
      }

      // Validate guest exists
      const guest = await Guests.findByPk(guestId);
      if (!guest) {
        return res.status(404).json({
          error: 'Guest not found',
          message: 'O hóspede especificado não foi encontrado.'
        });
      }

      // Validate occurrence type exists
      const occurrenceType = await TipoOcorrencia.findByPk(occurrenceTypeId);
      if (!occurrenceType) {
        return res.status(404).json({
          error: 'Occurrence type not found',
          message: 'O tipo de ocorrência especificado não foi encontrado.'
        });
      }

      // Validate user exists
      const user = await Users.findByPk(registeredByUserId);
      if (!user) {
        return res.status(404).json({
          error: 'User not found',
          message: 'O usuário especificado não foi encontrado.'
        });
      }

      const occurrence = await Occurrence.create({
        guest_id: guestId,
        occurrence_type_id: occurrenceTypeId,
        description: data.description.trim(),
        registration_date: data.registration_date,
        registered_by_user_id: registeredByUserId
      });

      if (occurrenceType.nivel === 'Grave') {
        const startDate = new Date(data.registration_date);
        const endDate = new Date(data.registration_date);
        endDate.setMonth(endDate.getMonth() + 3);

        await Bloqueio.create({
          hospede_id: guestId,
          motivo: `Bloqueio automático por ocorrência grave: ${occurrenceType.nome}`,
          data_inicio: startDate,
          data_termino: endDate,
          data_termino_original: endDate,
          ocorrencia_id: occurrence.id,
          status: 'ativo'
        });
      }

      return res.status(201).json(occurrence);
    } catch (error) {
      console.error(error);
      return res.status(500).json({ error: 'Internal server error.' });
    }
  }

  async list(req, res) {
    try {
      const { guest_name, nivel, start_date, end_date } = req.query;

      // Build where conditions
      const whereConditions = {};
      const includeConditions = [];

      // Add date range filter
      if (start_date || end_date) {
        whereConditions.registration_date = {};

        if (start_date) {
          // Parse date as local timezone (start of day)
          const startDate = new Date(start_date + 'T00:00:00');
          whereConditions.registration_date[Op.gte] = startDate;
        }

        if (end_date) {
          // Parse date as local timezone (end of day)
          const endDate = new Date(end_date + 'T23:59:59.999');
          whereConditions.registration_date[Op.lte] = endDate;
        }
      }

      // Add guest name filter
      if (guest_name) {
        includeConditions.push({
          model: Guests,
          as: 'guest',
          attributes: ['id', 'nome'],
          where: {
            nome: {
              [Op.like]: `%${guest_name}%`
            }
          }
        });
      } else {
        includeConditions.push({
          model: Guests,
          as: 'guest',
          attributes: ['id', 'nome']
        });
      }

      // Add occurrence type with level filter
      if (nivel) {
        includeConditions.push({
          model: TipoOcorrencia,
          as: 'occurrenceType',
          attributes: ['id', 'nome', 'nivel'],
          where: {
            nivel: nivel
          }
        });
      } else {
        includeConditions.push({
          model: TipoOcorrencia,
          as: 'occurrenceType',
          attributes: ['id', 'nome', 'nivel']
        });
      }

      includeConditions.push({
        model: Users,
        as: 'registeredByUser',
        attributes: ['id', 'usuario']
      });

      const occurrences = await Occurrence.findAll({
        where: whereConditions,
        include: includeConditions,
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
            attributes: ['id', 'usuario']
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
      const occurrence = await Occurrence.findByPk(id, {
        include: [
          {
            model: TipoOcorrencia,
            as: 'occurrenceType'
          }
        ]
      });

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

      let newOccurrenceType = null;
      // If updating occurrence_type_id, validate occurrence type exists
      if (data.occurrence_type_id) {
        newOccurrenceType = await TipoOcorrencia.findByPk(data.occurrence_type_id);
        if (!newOccurrenceType) {
          return res.status(404).json({
            error: 'Occurrence type not found',
            message: 'O tipo de ocorrência especificado não foi encontrado.'
          });
        }
      }

      const oldOccurrenceType = occurrence.occurrenceType;
      const wasGrave = oldOccurrenceType && oldOccurrenceType.nivel === 'Grave';
      const willBeGrave = newOccurrenceType && newOccurrenceType.nivel === 'Grave';

      await occurrence.update(data);

      // Se a ocorrência NÃO era grave antes e agora será grave, criar bloqueio automático
      if (!wasGrave && willBeGrave) {
        const startDate = new Date(occurrence.registration_date);
        const endDate = new Date(occurrence.registration_date);
        endDate.setMonth(endDate.getMonth() + 3);

        await Bloqueio.create({
          hospede_id: occurrence.guest_id,
          motivo: `Bloqueio automático por ocorrência grave: ${newOccurrenceType.nome}`,
          data_inicio: startDate,
          data_termino: endDate,
          data_termino_original: endDate,
          ocorrencia_id: occurrence.id,
          status: 'ativo'
        });
      }

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

      // Verificar se existe algum bloqueio vinculado a esta ocorrência
      const bloqueioVinculado = await Bloqueio.findOne({
        where: { ocorrencia_id: id }
      });

      if (bloqueioVinculado) {
        return res.status(400).json({
          error: 'Cannot delete occurrence',
          message: 'Não é possível excluir esta ocorrência pois existe um bloqueio vinculado a ela.'
        });
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
            attributes: ['id', 'usuario']
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