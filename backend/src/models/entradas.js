import Sequelize, { Model } from 'sequelize';

class Entradas extends Model {
  static init(sequelize) {
    super.init(
      {
        hospedeId: {
          type: Sequelize.INTEGER,
          allowNull: false,
          field: 'hospede_id',
        },
        dataEntrada: {
          type: Sequelize.DATE,
          allowNull: false,
          field: 'data_entrada',
        },
        dataSaida: {
          type: Sequelize.DATE,
          allowNull: true,
          field: 'data_saida',
        },
        hospedou: {
          type: Sequelize.BOOLEAN,
          allowNull: false,
          defaultValue: true,
        },
      },
      {
        sequelize,
        tableName: 'entradas',
      }
    );

    return this;
  }

  static associate(models) {
    this.belongsTo(models.Guests, {
      foreignKey: 'hospedeId',
      as: 'hospede',
    });
  }
}

export default Entradas;
