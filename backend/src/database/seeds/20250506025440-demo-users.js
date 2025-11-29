'use strict';
const bcrypt = require('bcryptjs');

module.exports = {
  async up(queryInterface, Sequelize) {
    const hashedPassword = '123456';

    await queryInterface.bulkInsert('users', [
      {
        nome: 'Administrador Geral',
        funcao: 'Administrador',
        usuario: 'admin',
        senha: hashedPassword,
        created_at: new Date('2025-09-01'),
        updated_at: new Date('2025-09-01'),
      },
      {
        nome: 'Maria Silva',
        funcao: 'Secretária',
        usuario: 'maria.silva',
        senha: hashedPassword,
        created_at: new Date('2025-09-01'),
        updated_at: new Date('2025-09-01'),
      },
      {
        nome: 'Felipe Santos',
        funcao: 'Coordenador',
        usuario: 'felipe.santos',
        senha: hashedPassword,
        created_at: new Date('2025-09-01'),
        updated_at: new Date('2025-09-01'),
      },
      {
        nome: 'Ana Costa',
        funcao: 'Assistente Social',
        usuario: 'ana.costa',
        senha: hashedPassword,
        created_at: new Date('2025-09-15'),
        updated_at: new Date('2025-09-15'),
      },
      {
        nome: 'Carlos Oliveira',
        funcao: 'Psicólogo',
        usuario: 'carlos.oliveira',
        senha: hashedPassword,
        created_at: new Date('2025-10-01'),
        updated_at: new Date('2025-10-01'),
      }
    ], {});
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('users', null, {});
  }
};
