// Ativa o modo estrito do JavaScript, que ajuda a detectar erros mais facilmente
'use strict';

// Exporta um objeto com duas funções: `up` e `down`.
// Essas funções fazem parte de uma **migration** do Sequelize.
module.exports = {
  // Função que é executada quando aplicamos a migration (`sequelize db:migrate`)
  up: async (queryInterface, Sequelize) => {
    // Cria uma tabela chamada 'quartos'
    await queryInaterface.createTable('quartos', {
      // Coluna 'id', chave primária da tabela
      id: {
        type: Sequelize.INTEGER,     // Tipo inteiro
        allowNull: false,            // Não pode ser nulo
        autoIncrement: true,         // Incrementa automaticamente (1, 2, 3…)
        primaryKey: true,            // Define como chave primária
      },

      // Coluna 'numero' que representa o número do quarto
      numero: {
        type: Sequelize.STRING,      // Tipo texto
        allowNull: false,            // Obrigatório
        unique: true,                // Valor único (não pode haver dois quartos com mesmo número)
      },

      // Coluna 'ocupacao_max', representa quantas pessoas o quarto suporta
      ocupacao_max: {
        type: Sequelize.INTEGER,     // Tipo inteiro
        allowNull: false,            // Obrigatório
        defaultValue: 1,             // Valor padrão: 1
      },

      // Coluna 'status', indica o estado do quarto
      status: {
        type: Sequelize.ENUM('disponivel', 'ocupado', 'manutencao'), // Só aceita um desses três valores
        allowNull: false,            // Obrigatório
        defaultValue: 'disponivel',  // Padrão: disponível
      },

      // Coluna 'created_at', armazena quando o quarto foi criado
      created_at: {
        type: Sequelize.DATE,        // Tipo data
        allowNull: false,            // Obrigatório
        defaultValue: Sequelize.literal('CURRENT_TIMESTAMP'), // Valor padrão: data e hora atuais
      },

      // Coluna 'updated_at', armazena quando o quarto foi atualizado
      updated_at: {
        type: Sequelize.DATE,        // Tipo data
        allowNull: false,            // Obrigatório
        defaultValue: Sequelize.literal('CURRENT_TIMESTAMP'), // Valor padrão: data e hora atuais
      },
    });
  },

  // Função executada quando desfazemos a migration (`sequelize db:migrate:undo`)
  down: async (queryInterface, Sequelize) => {
    // Remove a tabela 'quartos'
    await queryInterface.dropTable('quartos');

    // Remove o tipo ENUM do status se ainda existir, para evitar conflitos em futuras migrations
    await queryInterface.sequelize.query('DROP TYPE IF EXISTS "enum_quartos_tipo";');
    await queryInterface.sequelize.query('DROP TYPE IF EXISTS "enum_quartos_status";');
  },
};
