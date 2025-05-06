import Sequelize, { Model } from 'sequelize';

class Users extends Model {
  static init(sequelize) {
    super.init(
      {
        nome: Sequelize.STRING,
        funcao: Sequelize.STRING,
        usuario: Sequelize.STRING,
        senha: Sequelize.STRING,
      },
      { sequelize },
    );

    return this;
  }

  static associate(models) {}
}

export default Users;
