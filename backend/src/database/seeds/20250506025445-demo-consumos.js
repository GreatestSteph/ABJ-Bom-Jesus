'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    const consumos = [];

    // Produtos por categoria:
    // 1-3: Calçados (nao_reutilizavel: false - retornam ao estoque)
    // 4-9: Roupas (nao_reutilizavel: false - retornam ao estoque)
    // 10-16: Higiene (nao_reutilizavel: true - consumíveis)
    // 17-20: Roupa de cama (nao_reutilizavel: false - retornam ao estoque)
    // 21-24: Limpeza (nao_reutilizavel: true - consumíveis)
    // 25-29: Diversos (25-27 false/retornam, 28-29 true/consumíveis)

    // Setembro 2025 - ~30 consumos
    const consumosSetembro = [
      // Hospede 1 (entrada dia 2)
      { hospede_id: 1, produto_id: 10, quantidade: 1, dia: 2, hora: 15, nao_reutilizavel: true },  // Shampoo
      { hospede_id: 1, produto_id: 12, quantidade: 2, dia: 3, hora: 10, nao_reutilizavel: true },  // Sabonete
      { hospede_id: 1, produto_id: 4, quantidade: 1, dia: 2, hora: 16, nao_reutilizavel: false },  // Camiseta

      // Hospede 2 (entrada dia 3)
      { hospede_id: 2, produto_id: 11, quantidade: 1, dia: 3, hora: 11, nao_reutilizavel: true },  // Condicionador
      { hospede_id: 2, produto_id: 1, quantidade: 1, dia: 3, hora: 12, nao_reutilizavel: false },  // Chinelo
      { hospede_id: 2, produto_id: 17, quantidade: 1, dia: 3, hora: 14, nao_reutilizavel: false }, // Lençol

      // Hospede 3 (entrada dia 5)
      { hospede_id: 3, produto_id: 13, quantidade: 1, dia: 5, hora: 17, nao_reutilizavel: true },  // Pasta de dente
      { hospede_id: 3, produto_id: 14, quantidade: 1, dia: 5, hora: 18, nao_reutilizavel: true },  // Escova de dente
      { hospede_id: 3, produto_id: 5, quantidade: 1, dia: 6, hora: 9, nao_reutilizavel: false },   // Camiseta Azul

      // Hospede 4 (entrada dia 6)
      { hospede_id: 4, produto_id: 10, quantidade: 1, dia: 6, hora: 10, nao_reutilizavel: true },  // Shampoo
      { hospede_id: 4, produto_id: 6, quantidade: 1, dia: 7, hora: 14, nao_reutilizavel: false },  // Calça jeans M
      { hospede_id: 4, produto_id: 18, quantidade: 1, dia: 6, hora: 11, nao_reutilizavel: false }, // Travesseiro

      // Hospede 5 (entrada dia 8)
      { hospede_id: 5, produto_id: 12, quantidade: 3, dia: 8, hora: 14, nao_reutilizavel: true },  // Sabonete
      { hospede_id: 5, produto_id: 25, quantidade: 1, dia: 9, hora: 10, nao_reutilizavel: false }, // Toalha banho

      // Hospede 6 (entrada dia 10)
      { hospede_id: 6, produto_id: 15, quantidade: 1, dia: 10, hora: 16, nao_reutilizavel: true }, // Desodorante
      { hospede_id: 6, produto_id: 2, quantidade: 1, dia: 11, hora: 9, nao_reutilizavel: false },  // Tênis
      { hospede_id: 6, produto_id: 8, quantidade: 1, dia: 12, hora: 11, nao_reutilizavel: false }, // Shorts

      // Hospede 7 (entrada dia 12)
      { hospede_id: 7, produto_id: 10, quantidade: 1, dia: 12, hora: 12, nao_reutilizavel: true }, // Shampoo
      { hospede_id: 7, produto_id: 11, quantidade: 1, dia: 12, hora: 13, nao_reutilizavel: true }, // Condicionador

      // Hospede 8 (entrada dia 14)
      { hospede_id: 8, produto_id: 16, quantidade: 2, dia: 15, hora: 10, nao_reutilizavel: true }, // Papel higiênico
      { hospede_id: 8, produto_id: 4, quantidade: 1, dia: 15, hora: 11, nao_reutilizavel: false }, // Camiseta M
      { hospede_id: 8, produto_id: 26, quantidade: 1, dia: 16, hora: 14, nao_reutilizavel: false }, // Toalha rosto

      // Hospede 9 (entrada dia 15)
      { hospede_id: 9, produto_id: 12, quantidade: 2, dia: 15, hora: 15, nao_reutilizavel: true }, // Sabonete
      { hospede_id: 9, produto_id: 27, quantidade: 1, dia: 16, hora: 9, nao_reutilizavel: false }, // Pente

      // Hospede 11 (entrada dia 19)
      { hospede_id: 11, produto_id: 10, quantidade: 1, dia: 19, hora: 11, nao_reutilizavel: true }, // Shampoo
      { hospede_id: 11, produto_id: 13, quantidade: 1, dia: 20, hora: 10, nao_reutilizavel: true }, // Pasta de dente
      { hospede_id: 11, produto_id: 7, quantidade: 1, dia: 21, hora: 15, nao_reutilizavel: false }, // Calça Jeans 40

      // Hospede 13 (entrada dia 22)
      { hospede_id: 13, produto_id: 11, quantidade: 1, dia: 22, hora: 14, nao_reutilizavel: true }, // Condicionador
      { hospede_id: 13, produto_id: 3, quantidade: 1, dia: 23, hora: 11, nao_reutilizavel: false }, // Sandália

      // Hospede 14 (entrada dia 24)
      { hospede_id: 14, produto_id: 12, quantidade: 2, dia: 24, hora: 16, nao_reutilizavel: true }, // Sabonete
    ];

    // Outubro 2025 - ~35 consumos
    const consumosOutubro = [
      // Hospede 1 (entrada dia 1)
      { hospede_id: 1, produto_id: 10, quantidade: 1, dia: 1, hora: 15, nao_reutilizavel: true },  // Shampoo
      { hospede_id: 1, produto_id: 19, quantidade: 1, dia: 2, hora: 10, nao_reutilizavel: false }, // Cobertor
      { hospede_id: 1, produto_id: 12, quantidade: 3, dia: 5, hora: 9, nao_reutilizavel: true },   // Sabonete

      // Hospede 16 (entrada dia 2)
      { hospede_id: 16, produto_id: 11, quantidade: 1, dia: 2, hora: 10, nao_reutilizavel: true }, // Condicionador
      { hospede_id: 16, produto_id: 4, quantidade: 1, dia: 3, hora: 14, nao_reutilizavel: false }, // Camiseta
      { hospede_id: 16, produto_id: 25, quantidade: 1, dia: 4, hora: 11, nao_reutilizavel: false }, // Toalha banho

      // Hospede 3 (entrada dia 4)
      { hospede_id: 3, produto_id: 13, quantidade: 1, dia: 4, hora: 17, nao_reutilizavel: true },  // Pasta
      { hospede_id: 3, produto_id: 14, quantidade: 1, dia: 4, hora: 18, nao_reutilizavel: true },  // Escova
      { hospede_id: 3, produto_id: 6, quantidade: 1, dia: 5, hora: 10, nao_reutilizavel: false },  // Calça M

      // Hospede 17 (entrada dia 5)
      { hospede_id: 17, produto_id: 10, quantidade: 1, dia: 5, hora: 13, nao_reutilizavel: true }, // Shampoo
      { hospede_id: 17, produto_id: 1, quantidade: 1, dia: 6, hora: 9, nao_reutilizavel: false },  // Chinelo

      // Hospede 5 (entrada dia 7)
      { hospede_id: 5, produto_id: 12, quantidade: 2, dia: 7, hora: 11, nao_reutilizavel: true },  // Sabonete
      { hospede_id: 5, produto_id: 15, quantidade: 1, dia: 9, hora: 14, nao_reutilizavel: true },  // Desodorante
      { hospede_id: 5, produto_id: 17, quantidade: 1, dia: 8, hora: 10, nao_reutilizavel: false }, // Lençol

      // Hospede 18 (entrada dia 8)
      { hospede_id: 18, produto_id: 11, quantidade: 1, dia: 8, hora: 16, nao_reutilizavel: true }, // Condicionador
      { hospede_id: 18, produto_id: 5, quantidade: 1, dia: 9, hora: 10, nao_reutilizavel: false }, // Camiseta Azul
      { hospede_id: 18, produto_id: 28, quantidade: 2, dia: 10, hora: 15, nao_reutilizavel: true }, // Aparelho Barbear

      // Hospede 19 (entrada dia 11)
      { hospede_id: 19, produto_id: 10, quantidade: 1, dia: 11, hora: 12, nao_reutilizavel: true }, // Shampoo
      { hospede_id: 19, produto_id: 16, quantidade: 3, dia: 12, hora: 9, nao_reutilizavel: true },  // Papel higiênico
      { hospede_id: 19, produto_id: 8, quantidade: 1, dia: 13, hora: 14, nao_reutilizavel: false }, // Shorts

      // Hospede 8 (entrada dia 13)
      { hospede_id: 8, produto_id: 12, quantidade: 2, dia: 13, hora: 18, nao_reutilizavel: true },  // Sabonete
      { hospede_id: 8, produto_id: 2, quantidade: 1, dia: 14, hora: 10, nao_reutilizavel: false },  // Tênis

      // Hospede 20 (entrada dia 14)
      { hospede_id: 20, produto_id: 13, quantidade: 1, dia: 14, hora: 15, nao_reutilizavel: true }, // Pasta
      { hospede_id: 20, produto_id: 14, quantidade: 1, dia: 14, hora: 16, nao_reutilizavel: true }, // Escova
      { hospede_id: 20, produto_id: 18, quantidade: 1, dia: 15, hora: 9, nao_reutilizavel: false }, // Travesseiro

      // Hospede 9 (entrada dia 16)
      { hospede_id: 9, produto_id: 10, quantidade: 1, dia: 16, hora: 11, nao_reutilizavel: true },  // Shampoo
      { hospede_id: 9, produto_id: 11, quantidade: 1, dia: 16, hora: 12, nao_reutilizavel: true },  // Condicionador

      // Hospede 11 (entrada dia 18)
      { hospede_id: 11, produto_id: 12, quantidade: 3, dia: 18, hora: 17, nao_reutilizavel: true }, // Sabonete
      { hospede_id: 11, produto_id: 6, quantidade: 1, dia: 19, hora: 14, nao_reutilizavel: false }, // Calça M

      // Hospede 13 (entrada dia 20)
      { hospede_id: 13, produto_id: 15, quantidade: 1, dia: 20, hora: 13, nao_reutilizavel: true }, // Desodorante
      { hospede_id: 13, produto_id: 9, quantidade: 1, dia: 21, hora: 10, nao_reutilizavel: false }, // Bermuda Jeans

      // Hospede 15 (entrada dia 24)
      { hospede_id: 15, produto_id: 10, quantidade: 1, dia: 24, hora: 10, nao_reutilizavel: true }, // Shampoo
      { hospede_id: 15, produto_id: 27, quantidade: 1, dia: 25, hora: 11, nao_reutilizavel: false }, // Pente
    ];

    // Novembro 2025 - ~40 consumos
    const consumosNovembro = [
      // Hospede 2 (entrada dia 1)
      { hospede_id: 2, produto_id: 10, quantidade: 1, dia: 1, hora: 11, nao_reutilizavel: true },  // Shampoo
      { hospede_id: 2, produto_id: 11, quantidade: 1, dia: 1, hora: 12, nao_reutilizavel: true },  // Condicionador
      { hospede_id: 2, produto_id: 4, quantidade: 1, dia: 2, hora: 9, nao_reutilizavel: false },   // Camiseta

      // Hospede 17 (entrada dia 2)
      { hospede_id: 17, produto_id: 12, quantidade: 2, dia: 2, hora: 16, nao_reutilizavel: true }, // Sabonete
      { hospede_id: 17, produto_id: 20, quantidade: 2, dia: 3, hora: 10, nao_reutilizavel: false }, // Fronha

      // Hospede 3 (entrada dia 4)
      { hospede_id: 3, produto_id: 13, quantidade: 1, dia: 4, hora: 13, nao_reutilizavel: true },  // Pasta
      { hospede_id: 3, produto_id: 14, quantidade: 1, dia: 4, hora: 14, nao_reutilizavel: true },  // Escova
      { hospede_id: 3, produto_id: 25, quantidade: 1, dia: 5, hora: 9, nao_reutilizavel: false },  // Toalha banho

      // Hospede 18 (entrada dia 5)
      { hospede_id: 18, produto_id: 10, quantidade: 1, dia: 5, hora: 17, nao_reutilizavel: true }, // Shampoo
      { hospede_id: 18, produto_id: 15, quantidade: 1, dia: 6, hora: 10, nao_reutilizavel: true }, // Desodorante
      { hospede_id: 18, produto_id: 7, quantidade: 1, dia: 7, hora: 14, nao_reutilizavel: false }, // Calça Jeans 40

      // Hospede 5 (entrada dia 7)
      { hospede_id: 5, produto_id: 12, quantidade: 3, dia: 7, hora: 10, nao_reutilizavel: true },  // Sabonete
      { hospede_id: 5, produto_id: 16, quantidade: 2, dia: 8, hora: 11, nao_reutilizavel: true },  // Papel

      // Hospede 19 (entrada dia 8)
      { hospede_id: 19, produto_id: 11, quantidade: 1, dia: 8, hora: 15, nao_reutilizavel: true }, // Condicionador
      { hospede_id: 19, produto_id: 1, quantidade: 1, dia: 9, hora: 9, nao_reutilizavel: false },  // Chinelo
      { hospede_id: 19, produto_id: 28, quantidade: 2, dia: 10, hora: 14, nao_reutilizavel: true }, // Aparelho Barbear

      // Hospede 7 (entrada dia 10)
      { hospede_id: 7, produto_id: 10, quantidade: 1, dia: 10, hora: 12, nao_reutilizavel: true }, // Shampoo
      { hospede_id: 7, produto_id: 17, quantidade: 1, dia: 11, hora: 10, nao_reutilizavel: false }, // Lençol

      // Hospede 9 (entrada dia 13)
      { hospede_id: 9, produto_id: 12, quantidade: 2, dia: 13, hora: 14, nao_reutilizavel: true },  // Sabonete
      { hospede_id: 9, produto_id: 13, quantidade: 1, dia: 14, hora: 9, nao_reutilizavel: true },   // Pasta
      { hospede_id: 9, produto_id: 6, quantidade: 1, dia: 15, hora: 11, nao_reutilizavel: false },  // Calça M

      // Hospede 10 (entrada dia 14)
      { hospede_id: 10, produto_id: 10, quantidade: 1, dia: 14, hora: 11, nao_reutilizavel: true }, // Shampoo
      { hospede_id: 10, produto_id: 11, quantidade: 1, dia: 14, hora: 12, nao_reutilizavel: true }, // Condicionador
      { hospede_id: 10, produto_id: 27, quantidade: 1, dia: 15, hora: 10, nao_reutilizavel: false }, // Pente

      // Hospede 11 (entrada dia 16)
      { hospede_id: 11, produto_id: 15, quantidade: 1, dia: 16, hora: 16, nao_reutilizavel: true }, // Desodorante
      { hospede_id: 11, produto_id: 8, quantidade: 1, dia: 17, hora: 14, nao_reutilizavel: false }, // Shorts

      // Hospede 12 (entrada dia 17)
      { hospede_id: 12, produto_id: 12, quantidade: 2, dia: 17, hora: 13, nao_reutilizavel: true }, // Sabonete
      { hospede_id: 12, produto_id: 2, quantidade: 1, dia: 18, hora: 10, nao_reutilizavel: false }, // Tênis

      // Hospede 13 (entrada dia 19)
      { hospede_id: 13, produto_id: 10, quantidade: 1, dia: 19, hora: 17, nao_reutilizavel: true }, // Shampoo
      { hospede_id: 13, produto_id: 18, quantidade: 1, dia: 20, hora: 9, nao_reutilizavel: false }, // Travesseiro

      // Hospede 14 (entrada dia 20)
      { hospede_id: 14, produto_id: 13, quantidade: 1, dia: 20, hora: 10, nao_reutilizavel: true }, // Pasta
      { hospede_id: 14, produto_id: 14, quantidade: 1, dia: 20, hora: 11, nao_reutilizavel: true }, // Escova
      { hospede_id: 14, produto_id: 5, quantidade: 1, dia: 21, hora: 15, nao_reutilizavel: false }, // Camiseta Azul

      // Hospede 15 (entrada dia 22)
      { hospede_id: 15, produto_id: 11, quantidade: 1, dia: 22, hora: 15, nao_reutilizavel: true }, // Condicionador
      { hospede_id: 15, produto_id: 16, quantidade: 2, dia: 23, hora: 9, nao_reutilizavel: true },  // Papel

      // Hospede 1 (entrada dia 23)
      { hospede_id: 1, produto_id: 10, quantidade: 1, dia: 23, hora: 12, nao_reutilizavel: true },  // Shampoo
      { hospede_id: 1, produto_id: 12, quantidade: 3, dia: 24, hora: 10, nao_reutilizavel: true },  // Sabonete
      { hospede_id: 1, produto_id: 19, quantidade: 1, dia: 24, hora: 14, nao_reutilizavel: false }, // Cobertor

      // Hospede 4 (entrada dia 25)
      { hospede_id: 4, produto_id: 15, quantidade: 1, dia: 25, hora: 16, nao_reutilizavel: true }, // Desodorante
    ];

    // Processar consumos de setembro
    consumosSetembro.forEach(c => {
      const dataConsumo = new Date(`2025-09-${String(c.dia).padStart(2, '0')}T${String(c.hora).padStart(2, '0')}:00:00Z`);
      consumos.push({
        hospede_id: c.hospede_id,
        produto_id: c.produto_id,
        quantidade: c.quantidade,
        data_consumo: dataConsumo,
        nao_reutilizavel: c.nao_reutilizavel,
        created_at: dataConsumo,
        updated_at: dataConsumo,
      });
    });

    // Processar consumos de outubro
    consumosOutubro.forEach(c => {
      const dataConsumo = new Date(`2025-10-${String(c.dia).padStart(2, '0')}T${String(c.hora).padStart(2, '0')}:00:00Z`);
      consumos.push({
        hospede_id: c.hospede_id,
        produto_id: c.produto_id,
        quantidade: c.quantidade,
        data_consumo: dataConsumo,
        nao_reutilizavel: c.nao_reutilizavel,
        created_at: dataConsumo,
        updated_at: dataConsumo,
      });
    });

    // Processar consumos de novembro
    consumosNovembro.forEach(c => {
      const dataConsumo = new Date(`2025-11-${String(c.dia).padStart(2, '0')}T${String(c.hora).padStart(2, '0')}:00:00Z`);
      consumos.push({
        hospede_id: c.hospede_id,
        produto_id: c.produto_id,
        quantidade: c.quantidade,
        data_consumo: dataConsumo,
        nao_reutilizavel: c.nao_reutilizavel,
        created_at: dataConsumo,
        updated_at: dataConsumo,
      });
    });

    await queryInterface.bulkInsert('consumos', consumos, {});
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('consumos', null, {});
  }
};
