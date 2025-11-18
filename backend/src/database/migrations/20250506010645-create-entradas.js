'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('entradas', {
      id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false
      },

      hospede_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: { model: 'guests', key: 'id' },
        onUpdate: 'CASCADE',
        onDelete: 'NO ACTION'
      },

      data_entrada: {
        type: Sequelize.DATE,
        allowNull: false
      },

      data_saida: {
        type: Sequelize.DATE,
        allowNull: true
      },

      hospedou: {
        type: Sequelize.BOOLEAN,
        allowNull: false,
        defaultValue: true
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
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('entradas');
  }
};
