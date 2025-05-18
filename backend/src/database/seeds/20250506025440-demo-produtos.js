'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert('produtos', [
      {
        nomeDoProduto: 'Chinelo Havaianas',
        tamanho: '30',
        cor: 'colorido',
        quantidade: '10',
        marca: 'Havaianas',
        descricao: 'Chinelo haivana colorido, número 36',
        custoTotal: '100.00',
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        nomeDoProduto: 'Blusa Masculina',
        tamanho: 'M',
        cor: 'verde',
        quantidade: '3',
        marca: 'Torra Torra',
        descricao: 'Blusa masculina com manga de cor verde, tamanho M',
        custoTotal: '0.00',
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        nomeDoProduto: 'Shampoo Pantene',
        tamanho: '350ml',
        cor: 'branco',
        quantidade: '2',
        marca: 'Pantene',
        descricao: 'Shampoo Pantene de 350ml, cheiro de morango e coloração branca, para cabelos sem brilho',
        custoTotal: '20.00',
        created_at: new Date(),
        updated_at: new Date(),
      },
    ], {});
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('produtos', null, {});
  }
};