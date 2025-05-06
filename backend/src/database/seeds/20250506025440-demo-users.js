'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert('users', [
      {
        nome: 'Suporte',
        funcao: 'Administrador',
        usuario: 'suporte_abj',
        senha: '123456',
      },
      {
        nome: 'Kelly',
        funcao: 'Secretária',
        usuario: 'kelly_bomjesus',
        senha: '123456',
      }
    ], {});
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('users', null, {});
  }
};
