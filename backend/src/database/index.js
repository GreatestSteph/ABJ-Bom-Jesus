import Sequelize from 'sequelize';

import dbConfig from './config.js';
import Models from '../models/index.js';

const config = dbConfig[process.env.NODE_ENV];
const models = [Models.Guests, Models.Users];


class Database {
  constructor() {
    this.init();
  }

  init() {
    this.connection = new Sequelize(config);

    models
      .map((model) => model.init(this.connection))
      .map((model) => model?.associate?.(this.connection.models));
  }
}

export default new Database();
