'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('bloqueios', {
      id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false
      },
      hospede_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: 'guests',
          key: 'id'
        },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE'
      },
      motivo: {
        type: Sequelize.TEXT,
        allowNull: false
      },
      data_inicio: {
        type: Sequelize.DATE,
        allowNull: false
      },
      data_termino: {
        type: Sequelize.DATE,
        allowNull: false
      },
      data_termino_original: {
        type: Sequelize.DATE,
        allowNull: true
      },
      ocorrencia_id: {
        type: Sequelize.INTEGER,
        allowNull: true,
        references: {
          model: 'occurrences',
          key: 'id'
        },
        onUpdate: 'CASCADE',
        onDelete: 'SET NULL'
      },
      status: {
        type: Sequelize.ENUM('ativo', 'cancelado', 'concluido'),
        allowNull: false,
        defaultValue: 'ativo'
      },
      cancelado_em: {
        type: Sequelize.DATE,
        allowNull: true
      },
      cancelado_por_usuario_id: {
        type: Sequelize.INTEGER,
        allowNull: true,
        references: {
          model: 'users',
          key: 'id'
        },
        onUpdate: 'CASCADE',
        onDelete: 'SET NULL'
      },
      motivo_cancelamento: {
        type: Sequelize.TEXT,
        allowNull: true
      },
      created_at: {
        type: Sequelize.DATE,
        allowNull: false
      },
      updated_at: {
        type: Sequelize.DATE,
        allowNull: false
      }
    });

    await queryInterface.addIndex('bloqueios', ['hospede_id']);
    await queryInterface.addIndex('bloqueios', ['ocorrencia_id']);
    await queryInterface.addIndex('bloqueios', ['data_termino']);
    await queryInterface.addIndex('bloqueios', ['status']);
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('bloqueios');
  }
};
