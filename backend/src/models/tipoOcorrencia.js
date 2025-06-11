import Sequelize, { Model } from 'sequelize';

class TipoOcorrencia extends Model {
  static init(sequelize) {
    super.init(
      {
        id: {
          type: Sequelize.INTEGER,
          primaryKey: true,
          autoIncrement: true,
          allowNull: false
        },
        nome: {
          type: Sequelize.STRING,
          allowNull: false
        },
        descricao: {
          type: Sequelize.TEXT,
          allowNull: true
        },
        nivel: {
          type: Sequelize.ENUM('Leve', 'Moderado', 'Grave'),
          allowNull: false
        },
      },
      { 
        sequelize,
        tableName: 'tipos_ocorrencia'
      },
    );

    return this;
  }

  static associate(models) {}
}

export default TipoOcorrencia;