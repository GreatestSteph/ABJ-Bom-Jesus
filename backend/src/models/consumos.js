import Sequelize, { Model } from 'sequelize';

class Consumos extends Model {
  static init(sequelize) {
    super.init(
      {
        hospedeId: {
          type: Sequelize.INTEGER,
          allowNull: false,
          field: 'hospede_id',
        },
        produtoId: {
          type: Sequelize.INTEGER,
          allowNull: false,
          field: 'produto_id',
        },
        quantidade: {
          type: Sequelize.INTEGER,
          allowNull: false,
        },
        dataConsumo: {
          type: Sequelize.DATE,
          allowNull: false,
          field: 'data_consumo',
        },
        naoReutilizavel: {
          type: Sequelize.BOOLEAN,
          allowNull: false,
          defaultValue: false,
          field: 'nao_reutilizavel',
        },
      },
      {
        sequelize,
        tableName: 'consumos',
      }
    );

    return this;
  }

  static associate(models) {
    this.belongsTo(models.Guests, { foreignKey: 'hospedeId', as: 'hospede' });
    this.belongsTo(models.Produtos, { foreignKey: 'produtoId', as: 'produto' });
  }
}

export default Consumos;
