import Sequelize, { Model } from 'sequelize';

class Occurrence extends Model {
  static init(sequelize) {
    super.init(
      {
        id: {
          type: Sequelize.INTEGER,
          primaryKey: true,
          autoIncrement: true,
          allowNull: false
        },
        guest_id: {
          type: Sequelize.INTEGER,
          allowNull: false,
          references: {
            model: 'guests',
            key: 'id'
          }
        },
        occurrence_type_id: {
          type: Sequelize.INTEGER,
          allowNull: false,
          references: {
            model: 'tipos_ocorrencia',
            key: 'id'
          }
        },
        registration_date: {
          type: Sequelize.DATE,
          allowNull: false,
          defaultValue: Sequelize.NOW
        },
        description: {
          type: Sequelize.TEXT,
          allowNull: false
        },
        registered_by_user_id: {
          type: Sequelize.INTEGER,
          allowNull: false,
          references: {
            model: 'users',
            key: 'id'
          }
        }
      },
      {
        sequelize,
        tableName: 'occurrences'
      }
    );

    return this;
  }

  static associate(models) {
    this.belongsTo(models.Guests, {
      foreignKey: 'guest_id',
      as: 'guest'
    });

    this.belongsTo(models.TipoOcorrencia, {
      foreignKey: 'occurrence_type_id',
      as: 'occurrenceType'
    });

    this.belongsTo(models.Users, {
      foreignKey: 'registered_by_user_id',
      as: 'registeredByUser'
    });
  }
}

export default Occurrence;