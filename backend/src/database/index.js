import Sequelize from 'sequelize';
import dbConfig from './config.js';
import Models from '../models/index.js';

const env = process.env.NODE_ENV || 'development';
const config = dbConfig[env];

const models = [Models.Guests, Models.Users, Models.Produtos, Models.TipoOcorrencia, Models.Occurrence];

class Database {
  constructor() {
    this.connection = null;
  }

  async init() {
    // Criar conexão Sequelize com config explícito
    this.connection = new Sequelize(
      config.database,
      config.username,
      config.password,
      {
        host: config.host,
        dialect: config.dialect,
        port: config.port,
        logging: config.logging,
        define: config.define,
      }
    );

    // Testar conexão
    try {
      await this.connection.authenticate();
      console.log('Conexão com o banco realizada com sucesso!');
    } catch (error) {
      console.error('Erro ao conectar com o banco:', error);
      throw error;
    }

    // Inicializar models
    models.forEach(model => model.init(this.connection));

    // Executar associações, se existirem
    models.forEach(model => model.associate && model.associate(this.connection.models));

    // Sincronizar as tabelas no banco (cria/atualiza)
    await this.connection.sync({ alter: true });  // use force: true para recriar as tabelas (perde dados)

    return this.connection;
  }
}

export default new Database();
