import Quarto from '../models/quarto.js';

// Definimos um array com os tipos de cama permitidos para validação
const TIPOS_CAMA_VALIDOS = ['Solteiro', 'Casal', 'Beliche'];

class QuartosController {
  // Cria um novo quarto
  async create(req, res) {
    // Extrai do corpo da requisição os campos necessários
    const { numero, ocupacao_max, status, tipo_cama } = req.body;

    // Validação: verifica se o tipo_cama informado está entre os valores permitidos
    if (!TIPOS_CAMA_VALIDOS.includes(tipo_cama)) {
      return res.status(400).json({
        error: `Tipo de cama inválido. Valores permitidos: ${TIPOS_CAMA_VALIDOS.join(', ')}.`,
      });
    }

    try {
      // Cria um registro no banco de dados usando o model Quarto
      const quarto = await Quarto.create({
        numero,
        ocupacao_max,
        status,
        tipo_cama,
      });
      // Retorna o objeto criado com status 201 
      return res.status(201).json(quarto);
    } catch (error) {
      // Em caso de erro interno, exibe no console e retorna status 500
      console.error(error);
      return res.status(500).json({ error: 'Erro interno ao criar quarto.' });
    }
  }

  // Lista todos os quartos cadastrados
  async list(req, res) {
    try {
      // Busca todos os registros de Quarto na tabela
      const quartos = await Quarto.findAll();
      // Retorna a lista com status 200 (OK)
      return res.status(200).json(quartos);
    } catch (error) {
      // Em caso de erro interno, exibe no console e retorna status 500
      console.error(error);
      return res.status(500).json({ error: 'Erro interno ao listar quartos.' });
    }
  }

  // Busca um quarto específico pelo seu ID
  async get(req, res) {
    // Pega o parâmetro “id” da URL
    const { id } = req.params;
    try {
      // Tenta encontrar o quarto pelo ID primário
      const quarto = await Quarto.findByPk(id);
      // Se não encontrar, retorna 404 (Not Found)
      if (!quarto) {
        return res.status(404).json({ error: 'Quarto não encontrado.' });
      }
      // Caso encontre, retorna o objeto do quarto com status 200
      return res.status(200).json(quarto);
    } catch (error) {
      // Em caso de erro interno, exibe no console e retorna status 500
      console.error(error);
      return res.status(500).json({ error: 'Erro interno ao buscar quarto.' });
    }
  }

  // Atualiza os dados de um quarto existente
  async update(req, res) {
    // Pega o parâmetro “id” da URL
    const { id } = req.params;
    // Extrai do corpo da requisição os campos que poderão ser atualizados
    const { numero, ocupacao_max, status, tipo_cama } = req.body;

    // Validação: se o campo tipo_cama foi enviado, verifica se é válido
    if (tipo_cama && !TIPOS_CAMA_VALIDOS.includes(tipo_cama)) {
      return res.status(400).json({
        error: `Tipo de cama inválido. Valores permitidos: ${TIPOS_CAMA_VALIDOS.join(', ')}.`,
      });
    }

    try {
      // Busca o quarto pelo ID
      const quarto = await Quarto.findByPk(id);
      // Se não existir, retorna 404
      if (!quarto) {
        return res.status(404).json({ error: 'Quarto não encontrado.' });
      }

      // Atualiza somente os campos enviados no corpo da requisição
      await quarto.update({ numero, ocupacao_max, status, tipo_cama });
      // Retorna o quarto atualizado com status 200 (OK)
      return res.status(200).json(quarto);
    } catch (error) {
      // Em caso de erro interno, exibe no console e retorna status 500
      console.error(error);
      return res.status(500).json({ error: 'Erro interno ao atualizar quarto.' });
    }
  }

  // Exclui um quarto do banco de dados
  async delete(req, res) {
    // Pega o parâmetro “id” da URL
    const { id } = req.params;
    try {
      // Busca o quarto pelo ID
      const quarto = await Quarto.findByPk(id);
      // Se não encontrar, retorna 404
      if (!quarto) {
        return res.status(404).json({ error: 'Quarto não encontrado.' });
      }
      // Remove o registro da tabela
      await quarto.destroy();
      // Retorna mensagem de sucesso com status 200
      return res.status(200).json({ message: 'Quarto excluído com sucesso.' });
    } catch (error) {
      // Em caso de erro interno, exibe no console e retorna status 500
      console.error(error);
      return res.status(500).json({ error: 'Erro interno ao excluir quarto.' });
    }
  }
}

// Exporta uma instância do controlador para uso nas rotas
export default QuartosController;
