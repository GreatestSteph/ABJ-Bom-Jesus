'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert('consumos', [
      {
        hospede_id: 1,
        produto_id: 1,
        quantidade: 2,
        data_consumo: new Date('2025-10-08T15:54:12Z'),
        nao_reutilizavel: true,
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        hospede_id: 2,
        produto_id: 2,
        quantidade: 1,
        data_consumo: new Date('2025-10-09T12:30:00Z'),
        nao_reutilizavel: false,
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        hospede_id: 3,
        produto_id: 3,
        quantidade: 5,
        data_consumo: new Date('2025-10-10T09:15:00Z'),
        nao_reutilizavel: true,
        created_at: new Date(),
        updated_at: new Date(),
      },
      // mais exemplos (opcional):
      {
        hospede_id: 1,
        produto_id: 2,
        quantidade: 1,
        data_consumo: new Date('2025-10-11T18:45:00Z'),
        nao_reutilizavel: false,
        created_at: new Date(),
        updated_at: new Date(),
      },
    ], {});
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('consumos', null, {});
  }
};
