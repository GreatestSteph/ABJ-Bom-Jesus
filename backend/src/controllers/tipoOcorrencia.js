import TipoOcorrencia from '../models/tipoOcorrencia.js';
import Occurrence from '../models/occurrence.js';

class TipoOcorrenciaController {
  async create(req, res) {
    const data = req.body;

    try {
      const tipoOcorrencia = await TipoOcorrencia.create(data);
      return res.status(201).json(tipoOcorrencia);
    } catch (error) {
      console.error(error);
      return res.status(500).json({ error: 'Internal server error.' });
    }
  }

  async list(req, res) {
    try {
      const tiposOcorrencia = await TipoOcorrencia.findAll({ order: [['nome', 'ASC']] });
      return res.status(200).json(tiposOcorrencia);
    } catch (error) {
      console.error(error);
      return res.status(500).json({ error: 'Internal server error.' });
    }
  }

  async get(req, res) {
    const { id } = req.params;

    try {
      const tipoOcorrencia = await TipoOcorrencia.findByPk(id);

      if (!tipoOcorrencia) {
        return res.status(404).json({ error: 'Not found.' });
      }

      return res.status(200).json(tipoOcorrencia);
    } catch (error) {
      console.error(error);
      return res.status(500).json({ error: 'Internal server error.' });
    }
  }

  async update(req, res) {
    const { id } = req.params;
    const data = req.body;

    try {
      const tipoOcorrencia = await TipoOcorrencia.findByPk(id);

      if (!tipoOcorrencia) {
        return res.status(404).json({ error: 'Not found.' });
      }

      await tipoOcorrencia.update(data);

      return res.status(200).json(tipoOcorrencia);
    } catch (error) {
      console.error(error);
      return res.status(500).json({ error: 'Internal server error.' });
    }
  }

  async delete(req, res) {
    const { id } = req.params;

    try {
      const tipoOcorrencia = await TipoOcorrencia.findByPk(id);

      if (!tipoOcorrencia) {
        return res.status(404).json({ error: 'Not found.' });
      }

      // Verificar se o tipo de ocorrência está sendo usado
      const occurrencesCount = await Occurrence.count({
        where: { occurrence_type_id: id }
      });

      if (occurrencesCount > 0) {
        return res.status(400).json({
          error: 'Não é possível excluir este tipo de ocorrência',
          message: `Este tipo de ocorrência está sendo usado em ${occurrencesCount} ocorrência(s). Não é permitido excluir tipos de ocorrência que estão em uso.`
        });
      }

      await tipoOcorrencia.destroy();

      return res.status(200).json({ message: 'Deleted.' });
    } catch (error) {
      console.error(error);
      return res.status(500).json({ error: 'Internal server error.' });
    }
  }
}

export default new TipoOcorrenciaController();