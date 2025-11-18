'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert('entradas', [
      {
        hospede_id: 1,
        data_entrada: new Date('2025-10-01T14:00:00Z'),
        data_saida: new Date('2025-10-05T10:00:00Z'),
        hospedou: true,
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        hospede_id: 2,
        data_entrada: new Date('2025-10-07T16:30:00Z'),
        data_saida: null,
        hospedou: true,
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        hospede_id: 3,
        data_entrada: new Date('2025-10-09T12:15:00Z'),
        data_saida: new Date('2025-10-11T09:00:00Z'),
        hospedou: true,
        created_at: new Date(),
        updated_at: new Date(),
      },

      // Exemplo extra:
      {
        hospede_id: 1,
        data_entrada: new Date('2025-10-12T18:45:00Z'),
        data_saida: null,
        hospedou: true,
        created_at: new Date(),
        updated_at: new Date(),
      },
    ], {});
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('entradas', null, {});
  }
};
