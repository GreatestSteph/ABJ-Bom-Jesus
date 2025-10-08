'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    const today = new Date();
    const yesterday = new Date(today);
    yesterday.setDate(yesterday.getDate() - 1);

    const tomorrow = new Date(today);
    tomorrow.setDate(tomorrow.getDate() + 1);

    const nextWeek = new Date(today);
    nextWeek.setDate(nextWeek.getDate() + 7);

    const threeMonthsLater = new Date(today);
    threeMonthsLater.setMonth(threeMonthsLater.getMonth() + 3);

    const lastMonth = new Date(today);
    lastMonth.setMonth(lastMonth.getMonth() - 1);

    const lastWeek = new Date(today);
    lastWeek.setDate(lastWeek.getDate() - 7);

    await queryInterface.bulkInsert('bloqueios', [
      {
        hospede_id: 1,
        motivo: 'Bloqueio automático por ocorrência grave: Agressão Física',
        data_inicio: yesterday,
        data_termino: threeMonthsLater,
        data_termino_original: threeMonthsLater,
        ocorrencia_id: 4,
        status: 'ativo',
        cancelado_em: null,
        cancelado_por_usuario_id: null,
        motivo_cancelamento: null,
        created_at: yesterday,
        updated_at: yesterday,
      },
      {
        hospede_id: 2,
        motivo: 'Bloqueio manual devido a violações repetidas das regras da instituição',
        data_inicio: lastWeek,
        data_termino: nextWeek,
        data_termino_original: nextWeek,
        ocorrencia_id: null,
        status: 'ativo',
        cancelado_em: null,
        cancelado_por_usuario_id: null,
        motivo_cancelamento: null,
        created_at: lastWeek,
        updated_at: lastWeek,
      },
      {
        hospede_id: 3,
        motivo: 'Bloqueio temporário para investigação interna de conduta',
        data_inicio: lastMonth,
        data_termino: lastWeek,
        data_termino_original: lastWeek,
        ocorrencia_id: null,
        status: 'ativo',
        cancelado_em: null,
        cancelado_por_usuario_id: null,
        motivo_cancelamento: null,
        created_at: lastMonth,
        updated_at: lastMonth,
      },
      {
        hospede_id: 1,
        motivo: 'Bloqueio automático por ocorrência grave: Agressão Verbal Grave',
        data_inicio: new Date('2025-08-01'),
        data_termino: new Date('2025-08-15'),
        data_termino_original: new Date('2025-11-01'),
        ocorrencia_id: null,
        status: 'cancelado',
        cancelado_em: new Date('2025-08-10'),
        cancelado_por_usuario_id: 1,
        motivo_cancelamento: 'Hóspede demonstrou melhora significativa no comportamento e concluiu sessões de controle de raiva',
        created_at: new Date('2025-08-01'),
        updated_at: new Date('2025-08-10'),
      },
      {
        hospede_id: 2,
        motivo: 'Bloqueio preventivo por questões de segurança da instituição',
        data_inicio: new Date('2025-07-15'),
        data_termino: new Date('2025-07-20'),
        data_termino_original: new Date('2025-07-20'),
        ocorrencia_id: null,
        status: 'ativo',
        cancelado_em: null,
        cancelado_por_usuario_id: null,
        motivo_cancelamento: null,
        created_at: new Date('2025-07-15'),
        updated_at: new Date('2025-07-15'),
      }
    ], {});
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('bloqueios', null, {});
  }
};
