'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert('tipos_ocorrencia', [
      {
        nome: 'Uso de substâncias',
        descricao: 'Uso ou porte de substâncias ilícitas dentro das dependências',
        nivel: 'Grave',
        created_at: new Date(),
        updated_at: new Date()
      },
      {
        nome: 'Comportamento agressivo',
        descricao: 'Atitudes agressivas verbais ou físicas contra outros hóspedes ou funcionários',
        nivel: 'Moderado',
        created_at: new Date(),
        updated_at: new Date()
      },
      {
        nome: 'Desrespeito às regras',
        descricao: 'Não cumprimento das regras básicas de convivência da instituição',
        nivel: 'Leve',
        created_at: new Date(),
        updated_at: new Date()
      },
      {
        nome: 'Vandalismo',
        descricao: 'Destruição ou dano ao patrimônio da instituição',
        nivel: 'Grave',
        created_at: new Date(),
        updated_at: new Date()
      },
      {
        nome: 'Atraso frequente',
        descricao: 'Chegadas tardias constantes após horário permitido',
        nivel: 'Leve',
        created_at: new Date(),
        updated_at: new Date()
      },
      {
        nome: 'Conflito entre hóspedes',
        descricao: 'Brigas ou discussões acaloradas entre residentes',
        nivel: 'Moderado',
        created_at: new Date(),
        updated_at: new Date()
      }
    ], {});
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('tipos_ocorrencia', null, {});
  }
};