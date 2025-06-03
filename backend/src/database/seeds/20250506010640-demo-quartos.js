'use strict';

// Exporta o objeto com os métodos up e down para a seed
module.exports = {
  // Método "up": executado quando aplicamos a seed para inserir dados
  async up(queryInterface, Sequelize) {
    // Insere vários registros na tabela 'quartos'
    await queryInterface.bulkInsert(
      'quartos', // Nome da tabela onde os registros serão inseridos
      [
        {
          numero: '101',                 // Define o número do quarto como '101'
          ocupacao_max: 1,               // Define a ocupação máxima como 1 pessoa
          tipo_cama: 'Solteiro',         // Define o tipo de cama como 'Solteiro'
          status: 'disponivel',          // Define o status como 'disponivel'
          created_at: new Date(),        // Define a data de criação como o momento atual
          updated_at: new Date(),        // Define a data de atualização como o momento atual
        },
        {
          numero: '102',                 // Define o número do quarto como '102'
          ocupacao_max: 2,               // Define a ocupação máxima como 2 pessoas
          tipo_cama: 'Casal',            // Define o tipo de cama como 'Casal'
          status: 'ocupado',             // Define o status como 'ocupado'
          created_at: new Date(),        // Define a data de criação como o momento atual
          updated_at: new Date(),        // Define a data de atualização como o momento atual
        },
        {
          numero: '201',                 // Define o número do quarto como '201'
          ocupacao_max: 4,               // Define a ocupação máxima como 4 pessoas
          tipo_cama: 'Beliche',          // Define o tipo de cama como 'Beliche'
          status: 'manutencao',          // Define o status como 'manutencao'
          created_at: new Date(),        // Define a data de criação como o momento atual
          updated_at: new Date(),        // Define a data de atualização como o momento atual
        },
        {
          numero: '202',                 // Define o número do quarto como '202'
          ocupacao_max: 2,               // Define a ocupação máxima como 2 pessoas
          tipo_cama: 'Casal',            // Define o tipo de cama como 'Casal'
          status: 'disponivel',          // Define o status como 'disponivel'
          created_at: new Date(),        // Define a data de criação como o momento atual
          updated_at: new Date(),        // Define a data de atualização como o momento atual
        },
      ],
      {} // Opções adicionais (vazio, pois não precisamos de configurações extras)
    );
  },

  // Método "down": executado quando revertermos esta seed (apagando os dados inseridos)
  async down(queryInterface, Sequelize) {
    // Remove todos os registros da tabela 'quartos'
    await queryInterface.bulkDelete('quartos', null, {});
  }
};
