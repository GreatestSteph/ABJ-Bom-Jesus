import Sequelize, { Model } from 'sequelize';

class Guests extends Model {
  static init(sequelize) {
    super.init(
      {
        nome: Sequelize.STRING,
        data_nascimento: Sequelize.DATE,
        rg: Sequelize.STRING,
        cpf: Sequelize.STRING,
        data_contato_familia: Sequelize.DATE,
        escolaridade: Sequelize.STRING,
        empregado: Sequelize.BOOLEAN,
        biometria: Sequelize.STRING,
      },
      { sequelize },
    );

    return this;
  }

  static associate(models) {}
}

export default Guests;
