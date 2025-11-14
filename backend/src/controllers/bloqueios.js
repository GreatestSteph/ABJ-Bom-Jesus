import Bloqueio from '../models/bloqueio.js';
import Guests from '../models/guests.js';
import Occurrence from '../models/occurrence.js';
import Users from '../models/users.js';
import { Op } from 'sequelize';
import { addCalculatedStatus } from '../helpers/bloqueioStatus.js';

class BloqueiosController {
  async create(req, res) {
    const data = req.body;

    try {
      if (!data.hospede_id || !data.motivo || !data.data_inicio || !data.data_termino) {
        return res.status(400).json({
          error: 'Missing required fields',
          message: 'Campos obrigatórios: hospede_id, motivo, data_inicio e data_termino.'
        });
      }

      const hospedeId = parseInt(data.hospede_id);
      if (isNaN(hospedeId)) {
        return res.status(400).json({
          error: 'Invalid ID format',
          message: 'hospede_id deve ser um número válido.'
        });
      }

      const guest = await Guests.findByPk(hospedeId);
      if (!guest) {
        return res.status(404).json({
          error: 'Guest not found',
          message: 'O hóspede especificado não foi encontrado.'
        });
      }

      const dataInicio = new Date(data.data_inicio + 'T00:00:00');
      const dataTermino = new Date(data.data_termino + 'T23:59:59');

      if (dataTermino < dataInicio) {
        return res.status(400).json({
          error: 'Invalid date range',
          message: 'A data de término deve ser maior ou igual à data de início.'
        });
      }

      if (data.ocorrencia_id) {
        const occurrence = await Occurrence.findByPk(data.ocorrencia_id);
        if (!occurrence) {
          return res.status(404).json({
            error: 'Occurrence not found',
            message: 'A ocorrência especificada não foi encontrada.'
          });
        }
      }

      const bloqueio = await Bloqueio.create({
        hospede_id: hospedeId,
        motivo: data.motivo.trim(),
        data_inicio: dataInicio,
        data_termino: dataTermino,
        data_termino_original: dataTermino,
        ocorrencia_id: data.ocorrencia_id || null,
        status: 'ativo'
      });

      return res.status(201).json(addCalculatedStatus(bloqueio));
    } catch (error) {
      console.error(error);
      return res.status(500).json({ error: 'Internal server error.' });
    }
  }

  async list(req, res) {
    try {
      const { hospede_id, ativo, guest_name, status, start_date, end_date } = req.query;

      const whereConditions = {};
      const includeConditions = [];

      if (hospede_id) {
        whereConditions.hospede_id = parseInt(hospede_id);
      }

      if (start_date || end_date) {
        whereConditions.data_inicio = {};

        if (start_date) {
          const startDate = new Date(start_date + 'T00:00:00');
          whereConditions.data_inicio[Op.gte] = startDate;
        }

        if (end_date) {
          const endDate = new Date(end_date + 'T23:59:59.999');
          whereConditions.data_inicio[Op.lte] = endDate;
        }
      }

      if (status) {
        if (status === 'concluido') {
          const today = new Date();
          today.setHours(0, 0, 0, 0);
          whereConditions.status = 'ativo';
          whereConditions.data_termino = {
            [Op.lt]: today
          };
        } else {
          whereConditions.status = status;
          if (status === 'ativo') {
            const today = new Date();
            today.setHours(0, 0, 0, 0);
            whereConditions.data_termino = {
              [Op.gte]: today
            };
          }
        }
      } else if (ativo === 'true') {
        const today = new Date();
        today.setHours(0, 0, 0, 0);
        whereConditions.status = 'ativo';
        whereConditions.data_termino = {
          [Op.gte]: today
        };
      }

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

      includeConditions.push(
        {
          model: Occurrence,
          as: 'occurrence',
          attributes: ['id', 'description', 'registration_date']
        },
        {
          model: Users,
          as: 'canceledByUser',
          attributes: ['id', 'usuario']
        }
      );

      let bloqueios = await Bloqueio.findAll({
        where: whereConditions,
        include: includeConditions,
        order: [['data_inicio', 'DESC']]
      });

      bloqueios = addCalculatedStatus(bloqueios);

      const sortedBloqueios = bloqueios.sort((a, b) => {
        const statusOrder = { 'ativo': 1, 'cancelado': 2, 'concluido': 3 };
        const statusA = a.status_calculado || a.status;
        const statusB = b.status_calculado || b.status;

        if (statusOrder[statusA] !== statusOrder[statusB]) {
          return statusOrder[statusA] - statusOrder[statusB];
        }

        return new Date(b.data_inicio) - new Date(a.data_inicio);
      });

      return res.status(200).json(sortedBloqueios);
    } catch (error) {
      console.error(error);
      return res.status(500).json({ error: 'Internal server error.' });
    }
  }

  async get(req, res) {
    const { id } = req.params;

    try {
      const bloqueio = await Bloqueio.findByPk(id, {
        include: [
          {
            model: Guests,
            as: 'guest'
          },
          {
            model: Occurrence,
            as: 'occurrence'
          },
          {
            model: Users,
            as: 'canceledByUser',
            attributes: ['id', 'usuario']
          }
        ]
      });

      if (!bloqueio) {
        return res.status(404).json({
          error: 'Bloqueio not found',
          message: 'Bloqueio não encontrado.'
        });
      }

      return res.status(200).json(addCalculatedStatus(bloqueio));
    } catch (error) {
      console.error(error);
      return res.status(500).json({ error: 'Internal server error.' });
    }
  }

  async update(req, res) {
    const { id } = req.params;
    const data = req.body;

    try {
      const bloqueio = await Bloqueio.findByPk(id);

      if (!bloqueio) {
        return res.status(404).json({
          error: 'Bloqueio not found',
          message: 'Bloqueio não encontrado.'
        });
      }

      if (data.data_inicio && data.data_termino) {
        const dataInicio = new Date(data.data_inicio + 'T00:00:00');
        const dataTermino = new Date(data.data_termino + 'T23:59:59');

        if (dataTermino < dataInicio) {
          return res.status(400).json({
            error: 'Invalid date range',
            message: 'A data de término deve ser maior ou igual à data de início.'
          });
        }

        data.data_inicio = dataInicio;
        data.data_termino = dataTermino;
      }

      await bloqueio.update(data);

      return res.status(200).json(addCalculatedStatus(bloqueio));
    } catch (error) {
      console.error(error);
      return res.status(500).json({ error: 'Internal server error.' });
    }
  }

  async delete(req, res) {
    const { id } = req.params;

    try {
      const bloqueio = await Bloqueio.findByPk(id);

      if (!bloqueio) {
        return res.status(404).json({
          error: 'Bloqueio not found',
          message: 'Bloqueio não encontrado.'
        });
      }

      await bloqueio.destroy();

      return res.status(200).json({
        message: 'Bloqueio excluído com sucesso.'
      });
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

      const bloqueios = await Bloqueio.findAll({
        where: { hospede_id: guest_id },
        include: [
          {
            model: Occurrence,
            as: 'occurrence',
            attributes: ['id', 'description', 'registration_date']
          },
          {
            model: Users,
            as: 'canceledByUser',
            attributes: ['id', 'usuario']
          }
        ],
        order: [['data_inicio', 'DESC']]
      });

      return res.status(200).json(addCalculatedStatus(bloqueios));
    } catch (error) {
      console.error(error);
      return res.status(500).json({ error: 'Internal server error.' });
    }
  }

  async cancel(req, res) {
    const { id } = req.params;
    const { motivo_cancelamento, usuario_id } = req.body;

    try {
      const bloqueio = await Bloqueio.findByPk(id, {
        include: [
          {
            model: Occurrence,
            as: 'occurrence'
          }
        ]
      });

      if (!bloqueio) {
        return res.status(404).json({
          error: 'Bloqueio not found',
          message: 'Bloqueio não encontrado.'
        });
      }

      if (bloqueio.status === 'cancelado') {
        return res.status(400).json({
          error: 'Already canceled',
          message: 'Este bloqueio já foi cancelado.'
        });
      }

      if (!motivo_cancelamento || !motivo_cancelamento.trim()) {
        return res.status(400).json({
          error: 'Motivo required',
          message: 'O motivo de cancelamento é obrigatório.'
        });
      }

      if (usuario_id) {
        const user = await Users.findByPk(usuario_id);
        if (!user) {
          return res.status(404).json({
            error: 'User not found',
            message: 'O usuário especificado não foi encontrado.'
          });
        }
      }

      await bloqueio.update({
        status: 'cancelado',
        cancelado_em: new Date(),
        cancelado_por_usuario_id: usuario_id || null,
        motivo_cancelamento: motivo_cancelamento.trim()
      });

      return res.status(200).json(addCalculatedStatus(bloqueio));
    } catch (error) {
      console.error(error);
      return res.status(500).json({ error: 'Internal server error.' });
    }
  }

  async listActive(req, res) {
    try {
      const today = new Date();
      today.setHours(0, 0, 0, 0);

      const bloqueios = await Bloqueio.findAll({
        where: {
          status: 'ativo',
          data_termino: {
            [Op.gte]: today
          }
        },
        include: [
          {
            model: Guests,
            as: 'guest',
            attributes: ['id', 'nome']
          },
          {
            model: Occurrence,
            as: 'occurrence',
            attributes: ['id', 'description', 'registration_date']
          }
        ],
        order: [['data_inicio', 'DESC']]
      });

      return res.status(200).json(addCalculatedStatus(bloqueios));
    } catch (error) {
      console.error(error);
      return res.status(500).json({ error: 'Internal server error.' });
    }
  }

  async getHistory(req, res) {
    const { guest_id } = req.params;

    try {
      const guest = await Guests.findByPk(guest_id);
      if (!guest) {
        return res.status(404).json({
          error: 'Guest not found',
          message: 'O hóspede especificado não foi encontrado.'
        });
      }

      const bloqueios = await Bloqueio.findAll({
        where: { hospede_id: guest_id },
        include: [
          {
            model: Occurrence,
            as: 'occurrence',
            attributes: ['id', 'description', 'registration_date']
          },
          {
            model: Users,
            as: 'canceledByUser',
            attributes: ['id', 'usuario']
          }
        ],
        order: [['created_at', 'DESC']]
      });

      return res.status(200).json(addCalculatedStatus(bloqueios));
    } catch (error) {
      console.error(error);
      return res.status(500).json({ error: 'Internal server error.' });
    }
  }
}

export default new BloqueiosController();
