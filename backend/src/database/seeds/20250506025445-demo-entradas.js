'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    const entradas = [];

    // Setembro 2025 - 15 entradas (todas encerradas)
    const entradasSetembro = [
      { hospede_id: 1, dia: 2, hora: 14, minuto: 30, duracaoDias: 7, hospedou: true },
      { hospede_id: 2, dia: 3, hora: 10, minuto: 15, duracaoDias: 12, hospedou: true },
      { hospede_id: 3, dia: 5, hora: 16, minuto: 45, duracaoDias: 5, hospedou: true },
      { hospede_id: 4, dia: 6, hora: 9, minuto: 0, duracaoDias: 10, hospedou: true },
      { hospede_id: 5, dia: 8, hora: 13, minuto: 20, duracaoDias: 4, hospedou: true },
      { hospede_id: 6, dia: 10, hora: 15, minuto: 0, duracaoDias: 6, hospedou: true },
      { hospede_id: 7, dia: 12, hora: 11, minuto: 30, duracaoDias: 9, hospedou: true },
      { hospede_id: 8, dia: 14, hora: 17, minuto: 45, duracaoDias: 8, hospedou: true },
      { hospede_id: 9, dia: 15, hora: 14, minuto: 0, duracaoDias: 3, hospedou: true },
      { hospede_id: 10, dia: 17, hora: 12, minuto: 15, duracaoDias: 5, hospedou: false }, // Não hospedou
      { hospede_id: 11, dia: 19, hora: 10, minuto: 30, duracaoDias: 7, hospedou: true },
      { hospede_id: 12, dia: 20, hora: 16, minuto: 0, duracaoDias: 8, hospedou: true },
      { hospede_id: 13, dia: 22, hora: 13, minuto: 45, duracaoDias: 4, hospedou: true },
      { hospede_id: 14, dia: 24, hora: 15, minuto: 30, duracaoDias: 6, hospedou: true },
      { hospede_id: 15, dia: 26, hora: 11, minuto: 0, duracaoDias: 5, hospedou: true },
    ];

    // Outubro 2025 - 18 entradas (todas encerradas)
    const entradasOutubro = [
      { hospede_id: 1, dia: 1, hora: 14, minuto: 0, duracaoDias: 10, hospedou: true },
      { hospede_id: 16, dia: 2, hora: 9, minuto: 30, duracaoDias: 11, hospedou: true },
      { hospede_id: 3, dia: 4, hora: 16, minuto: 15, duracaoDias: 7, hospedou: true },
      { hospede_id: 17, dia: 5, hora: 12, minuto: 0, duracaoDias: 5, hospedou: true },
      { hospede_id: 5, dia: 7, hora: 10, minuto: 45, duracaoDias: 8, hospedou: true },
      { hospede_id: 18, dia: 8, hora: 15, minuto: 30, duracaoDias: 10, hospedou: true },
      { hospede_id: 6, dia: 10, hora: 13, minuto: 0, duracaoDias: 4, hospedou: false }, // Não hospedou
      { hospede_id: 19, dia: 11, hora: 11, minuto: 15, duracaoDias: 6, hospedou: true },
      { hospede_id: 8, dia: 13, hora: 17, minuto: 0, duracaoDias: 9, hospedou: true },
      { hospede_id: 20, dia: 14, hora: 14, minuto: 30, duracaoDias: 12, hospedou: true },
      { hospede_id: 9, dia: 16, hora: 10, minuto: 0, duracaoDias: 5, hospedou: true },
      { hospede_id: 11, dia: 18, hora: 16, minuto: 45, duracaoDias: 7, hospedou: true },
      { hospede_id: 13, dia: 20, hora: 12, minuto: 30, duracaoDias: 4, hospedou: true },
      { hospede_id: 14, dia: 22, hora: 15, minuto: 15, duracaoDias: 9, hospedou: true },
      { hospede_id: 15, dia: 24, hora: 9, minuto: 0, duracaoDias: 6, hospedou: true },
      { hospede_id: 4, dia: 25, hora: 13, minuto: 45, duracaoDias: 8, hospedou: true },
      { hospede_id: 1, dia: 27, hora: 11, minuto: 30, duracaoDias: 5, hospedou: true },
      { hospede_id: 16, dia: 29, hora: 14, minuto: 0, duracaoDias: 7, hospedou: true },
    ];

    // Novembro 2025 - 20 entradas
    const entradasNovembro = [
      { hospede_id: 2, dia: 1, hora: 10, minuto: 0, duracaoDias: null, hospedou: true }, // Ainda hospedado
      { hospede_id: 17, dia: 2, hora: 15, minuto: 30, duracaoDias: 6, hospedou: true },
      { hospede_id: 3, dia: 4, hora: 12, minuto: 15, duracaoDias: 8, hospedou: true },
      { hospede_id: 18, dia: 5, hora: 16, minuto: 0, duracaoDias: null, hospedou: true }, // Ainda hospedado
      { hospede_id: 5, dia: 7, hora: 9, minuto: 45, duracaoDias: 5, hospedou: true },
      { hospede_id: 19, dia: 8, hora: 14, minuto: 30, duracaoDias: 7, hospedou: true },
      { hospede_id: 7, dia: 10, hora: 11, minuto: 0, duracaoDias: null, hospedou: true }, // Ainda hospedado
      { hospede_id: 20, dia: 11, hora: 17, minuto: 15, duracaoDias: 4, hospedou: false }, // Não hospedou
      { hospede_id: 9, dia: 13, hora: 13, minuto: 30, duracaoDias: 9, hospedou: true },
      { hospede_id: 10, dia: 14, hora: 10, minuto: 45, duracaoDias: null, hospedou: true }, // Ainda hospedado
      { hospede_id: 11, dia: 16, hora: 15, minuto: 0, duracaoDias: 6, hospedou: true },
      { hospede_id: 12, dia: 17, hora: 12, minuto: 30, duracaoDias: 5, hospedou: true },
      { hospede_id: 13, dia: 19, hora: 16, minuto: 45, duracaoDias: null, hospedou: true }, // Ainda hospedado
      { hospede_id: 14, dia: 20, hora: 9, minuto: 0, duracaoDias: 7, hospedou: true },
      { hospede_id: 15, dia: 22, hora: 14, minuto: 15, duracaoDias: 4, hospedou: true },
      { hospede_id: 1, dia: 23, hora: 11, minuto: 30, duracaoDias: null, hospedou: true }, // Ainda hospedado
      { hospede_id: 4, dia: 25, hora: 15, minuto: 45, duracaoDias: 6, hospedou: true },
      { hospede_id: 6, dia: 26, hora: 10, minuto: 0, duracaoDias: 8, hospedou: true },
      { hospede_id: 8, dia: 27, hora: 13, minuto: 15, duracaoDias: null, hospedou: true }, // Ainda hospedado
      { hospede_id: 16, dia: 28, hora: 16, minuto: 30, duracaoDias: 5, hospedou: true },
    ];

    // Processar entradas de setembro
    entradasSetembro.forEach(e => {
      const dataEntrada = new Date(`2025-09-${String(e.dia).padStart(2, '0')}T${String(e.hora).padStart(2, '0')}:${String(e.minuto).padStart(2, '0')}:00Z`);
      const dataSaida = e.duracaoDias ? new Date(dataEntrada.getTime() + e.duracaoDias * 24 * 60 * 60 * 1000) : null;

      entradas.push({
        hospede_id: e.hospede_id,
        data_entrada: dataEntrada,
        data_saida: dataSaida,
        hospedou: e.hospedou,
        created_at: dataEntrada,
        updated_at: dataSaida || dataEntrada,
      });
    });

    // Processar entradas de outubro
    entradasOutubro.forEach(e => {
      const dataEntrada = new Date(`2025-10-${String(e.dia).padStart(2, '0')}T${String(e.hora).padStart(2, '0')}:${String(e.minuto).padStart(2, '0')}:00Z`);
      const dataSaida = e.duracaoDias ? new Date(dataEntrada.getTime() + e.duracaoDias * 24 * 60 * 60 * 1000) : null;

      entradas.push({
        hospede_id: e.hospede_id,
        data_entrada: dataEntrada,
        data_saida: dataSaida,
        hospedou: e.hospedou,
        created_at: dataEntrada,
        updated_at: dataSaida || dataEntrada,
      });
    });

    // Processar entradas de novembro
    entradasNovembro.forEach(e => {
      const dataEntrada = new Date(`2025-11-${String(e.dia).padStart(2, '0')}T${String(e.hora).padStart(2, '0')}:${String(e.minuto).padStart(2, '0')}:00Z`);
      const dataSaida = e.duracaoDias ? new Date(dataEntrada.getTime() + e.duracaoDias * 24 * 60 * 60 * 1000) : null;

      entradas.push({
        hospede_id: e.hospede_id,
        data_entrada: dataEntrada,
        data_saida: dataSaida,
        hospedou: e.hospedou,
        created_at: dataEntrada,
        updated_at: dataSaida || dataEntrada,
      });
    });

    await queryInterface.bulkInsert('entradas', entradas, {});
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('entradas', null, {});
  }
};
