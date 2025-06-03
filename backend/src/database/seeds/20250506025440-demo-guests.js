'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert('guests', [
      {
        nome: 'João da Silva',
        data_nascimento: new Date('1990-05-15'),
        rg: '123456789',
        cpf: '123.456.789-00',
        data_contato_familia: new Date('2025-05-05'),
        escolaridade: 'Superior Completo',
        empregado: true,
        biometria: 'biometria_joao_123',
        genero: 'Masculino',
        estado_civil: 'Solteiro(a)',
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        nome: 'Maria Oliveira',
        data_nascimento: new Date('1985-03-22'),
        rg: '987654321',
        cpf: '987.654.321-00',
        data_contato_familia: new Date('2025-05-05'),
        escolaridade: 'Ensino Médio Completo',
        empregado: false,
        biometria: 'biometria_maria_456',
        genero: 'Feminino',
        estado_civil: 'Solteiro(a)',
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        nome: 'Carlos Pereira',
        data_nascimento: new Date('1995-07-30'),
        rg: '456123789',
        cpf: '456.123.789-00',
        data_contato_familia: new Date('2025-05-05'),
        escolaridade: 'Ensino Fundamental Completo',
        empregado: true,
        biometria: 'biometria_carlos_789',
        genero: 'Masculino',
        estado_civil: 'Divorciado(a)',
        created_at: new Date(),
        updated_at: new Date(),
      }
    ], {});
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('guests', null, {});
  }
};
