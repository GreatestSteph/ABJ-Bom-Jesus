import Sequelize, { Model } from 'sequelize';

class Bloqueio extends Model {
  static init(sequelize) {
    super.init(
      {
        hospede_id: Sequelize.INTEGER,
        motivo: Sequelize.TEXT,
        data_inicio: Sequelize.DATE,
        data_termino: Sequelize.DATE,
        data_termino_original: Sequelize.DATE,
        ocorrencia_id: Sequelize.INTEGER,
        status: Sequelize.ENUM('ativo', 'cancelado', 'concluido'),
        cancelado_em: Sequelize.DATE,
        cancelado_por_usuario_id: Sequelize.INTEGER,
        motivo_cancelamento: Sequelize.TEXT,
      },
      {
        sequelize,
        tableName: 'bloqueios',
        underscored: true,
      }
    );

    return this;
  }

  static associate(models) {
    this.belongsTo(models.Guests, {
      foreignKey: 'hospede_id',
      as: 'guest'
    });

    this.belongsTo(models.Occurrence, {
      foreignKey: 'ocorrencia_id',
      as: 'occurrence'
    });

    this.belongsTo(models.Users, {
      foreignKey: 'cancelado_por_usuario_id',
      as: 'canceledByUser'
    });
  }
}

export default Bloqueio;
