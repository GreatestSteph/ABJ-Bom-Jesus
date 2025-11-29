'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    const bloqueios = [
      // Setembro 2025 - Status: ativo, concluido, cancelado
      { hospede_id: 2, motivo: 'Bloqueio automático por uso de substâncias ilícitas nas dependências', data_inicio: '2025-09-04', duracaoDias: 15, status: 'concluido', ocorrencia_id: 8, cancelado_usuario: null, motivo_cancelamento: null, cancelado_dia: null },
      { hospede_id: 5, motivo: 'Bloqueio por comportamento agressivo repetido', data_inicio: '2025-09-11', duracaoDias: 30, status: 'ativo', ocorrencia_id: 4, cancelado_usuario: null, motivo_cancelamento: null, cancelado_dia: null },
      { hospede_id: 11, motivo: 'Bloqueio automático por suspeita de uso de substâncias', data_inicio: '2025-09-18', duracaoDias: 45, status: 'cancelado', ocorrencia_id: 8, cancelado_usuario: 1, motivo_cancelamento: 'Investigação concluiu pela não confirmação da suspeita', cancelado_dia: 7 },
      { hospede_id: 4, motivo: 'Bloqueio preventivo após conflito grave com outro hóspede', data_inicio: '2025-09-15', duracaoDias: 20, status: 'concluido', ocorrencia_id: 6, cancelado_usuario: null, motivo_cancelamento: null, cancelado_dia: null },
      { hospede_id: 7, motivo: 'Bloqueio por falta às atividades obrigatórias de forma reiterada', data_inicio: '2025-09-13', duracaoDias: 10, status: 'concluido', ocorrencia_id: 5, cancelado_usuario: null, motivo_cancelamento: null, cancelado_dia: null },
      { hospede_id: 3, motivo: 'Bloqueio por má conservação reiterada dos espaços compartilhados', data_inicio: '2025-09-09', duracaoDias: 7, status: 'concluido', ocorrencia_id: 3, cancelado_usuario: null, motivo_cancelamento: null, cancelado_dia: null },
      { hospede_id: 6, motivo: 'Bloqueio por perturbação do sossego noturno de forma repetida', data_inicio: '2025-09-21', duracaoDias: 14, status: 'concluido', ocorrencia_id: 9, cancelado_usuario: null, motivo_cancelamento: null, cancelado_dia: null },

      // Outubro 2025
      { hospede_id: 12, motivo: 'Bloqueio por descuido reiterado com higiene dos espaços comuns', data_inicio: '2025-10-03', duracaoDias: 7, status: 'concluido', ocorrencia_id: 11, cancelado_usuario: null, motivo_cancelamento: null, cancelado_dia: null },
      { hospede_id: 14, motivo: 'Bloqueio por desacato à autoridade e desobediência às normas', data_inicio: '2025-10-06', duracaoDias: 21, status: 'ativo', ocorrencia_id: 12, cancelado_usuario: null, motivo_cancelamento: null, cancelado_dia: null },
      { hospede_id: 3, motivo: 'Bloqueio automático por comportamento agressivo verbal', data_inicio: '2025-10-08', duracaoDias: 15, status: 'concluido', ocorrencia_id: 13, cancelado_usuario: null, motivo_cancelamento: null, cancelado_dia: null },
      { hospede_id: 16, motivo: 'Bloqueio por falta não justificada em atividades obrigatórias', data_inicio: '2025-10-10', duracaoDias: 10, status: 'cancelado', ocorrencia_id: 14, cancelado_usuario: 3, motivo_cancelamento: 'Hóspede apresentou atestado médico justificando ausências', cancelado_dia: 5 },
      { hospede_id: 10, motivo: 'Bloqueio automático por vandalismo ao patrimônio da instituição', data_inicio: '2025-10-12', duracaoDias: 60, status: 'ativo', ocorrencia_id: 15, cancelado_usuario: null, motivo_cancelamento: null, cancelado_dia: null },
      { hospede_id: 18, motivo: 'Bloqueio por desrespeito às regras de áreas comuns', data_inicio: '2025-10-15', duracaoDias: 7, status: 'concluido', ocorrencia_id: 16, cancelado_usuario: null, motivo_cancelamento: null, cancelado_dia: null },
      { hospede_id: 5, motivo: 'Bloqueio por conflito reiterado com colega de quarto', data_inicio: '2025-10-17', duracaoDias: 14, status: 'concluido', ocorrencia_id: 17, cancelado_usuario: null, motivo_cancelamento: null, cancelado_dia: null },
      { hospede_id: 13, motivo: 'Bloqueio por atrasos frequentes sem justificativa', data_inicio: '2025-10-19', duracaoDias: 10, status: 'concluido', ocorrencia_id: 18, cancelado_usuario: null, motivo_cancelamento: null, cancelado_dia: null },
      { hospede_id: 20, motivo: 'Bloqueio por perturbação do descanso de outros hóspedes', data_inicio: '2025-10-21', duracaoDias: 7, status: 'concluido', ocorrencia_id: 19, cancelado_usuario: null, motivo_cancelamento: null, cancelado_dia: null },
      { hospede_id: 1, motivo: 'Bloqueio por falta de cuidado com espaços compartilhados', data_inicio: '2025-10-24', duracaoDias: 5, status: 'concluido', ocorrencia_id: 20, cancelado_usuario: null, motivo_cancelamento: null, cancelado_dia: null },
      { hospede_id: 15, motivo: 'Bloqueio automático por furto de pertences de outro hóspede', data_inicio: '2025-10-26', duracaoDias: 45, status: 'ativo', ocorrencia_id: 21, cancelado_usuario: null, motivo_cancelamento: null, cancelado_dia: null },

      // Novembro 2025
      { hospede_id: 17, motivo: 'Bloqueio por não cumprimento de tarefas atribuídas', data_inicio: '2025-11-04', duracaoDias: 7, status: 'ativo', ocorrencia_id: 22, cancelado_usuario: null, motivo_cancelamento: null, cancelado_dia: null },
      { hospede_id: 2, motivo: 'Bloqueio por faltas não justificadas em consultas', data_inicio: '2025-11-06', duracaoDias: 10, status: 'ativo', ocorrencia_id: 23, cancelado_usuario: null, motivo_cancelamento: null, cancelado_dia: null },
      { hospede_id: 19, motivo: 'Bloqueio automático por comportamento agressivo grave', data_inicio: '2025-11-09', duracaoDias: 30, status: 'ativo', ocorrencia_id: 24, cancelado_usuario: null, motivo_cancelamento: null, cancelado_dia: null },
      { hospede_id: 7, motivo: 'Bloqueio por atrasos frequentes às atividades', data_inicio: '2025-11-11', duracaoDias: 14, status: 'cancelado', ocorrencia_id: 25, cancelado_usuario: 2, motivo_cancelamento: 'Hóspede demonstrou melhora significativa na pontualidade', cancelado_dia: 8 },
      { hospede_id: 11, motivo: 'Bloqueio por desobediência às normas de segurança', data_inicio: '2025-11-13', duracaoDias: 21, status: 'ativo', ocorrencia_id: 26, cancelado_usuario: null, motivo_cancelamento: null, cancelado_dia: null },
      { hospede_id: 4, motivo: 'Bloqueio por perturbação noturna reiterada', data_inicio: '2025-11-16', duracaoDias: 10, status: 'ativo', ocorrencia_id: 27, cancelado_usuario: null, motivo_cancelamento: null, cancelado_dia: null },
      { hospede_id: 8, motivo: 'Bloqueio por falta de cuidado com higiene pessoal', data_inicio: '2025-11-18', duracaoDias: 7, status: 'ativo', ocorrencia_id: 28, cancelado_usuario: null, motivo_cancelamento: null, cancelado_dia: null },
    ];

    const bloqueiosFormatted = bloqueios.map(b => {
      const dataInicio = new Date(b.data_inicio);
      const dataTerminoOriginal = new Date(dataInicio);
      dataTerminoOriginal.setDate(dataTerminoOriginal.getDate() + b.duracaoDias);

      let dataTermino, canceladoEm, updatedAt;

      if (b.status === 'concluido') {
        // Concluído: data_termino = data_termino_original
        dataTermino = dataTerminoOriginal;
        canceladoEm = null;
        updatedAt = dataTerminoOriginal;
      } else if (b.status === 'cancelado') {
        // Cancelado: data_termino encurtado, tem cancelado_em
        const diasDecorridos = b.cancelado_dia || Math.floor(b.duracaoDias / 2);
        dataTermino = new Date(dataInicio);
        dataTermino.setDate(dataTermino.getDate() + diasDecorridos);
        canceladoEm = dataTermino;
        updatedAt = dataTermino;
      } else {
        // Ativo: data_termino = data_termino_original
        dataTermino = dataTerminoOriginal;
        canceladoEm = null;
        updatedAt = dataInicio;
      }

      return {
        hospede_id: b.hospede_id,
        motivo: b.motivo,
        data_inicio: dataInicio,
        data_termino: dataTermino,
        data_termino_original: dataTerminoOriginal,
        ocorrencia_id: b.ocorrencia_id,
        status: b.status,
        cancelado_em: canceladoEm,
        cancelado_por_usuario_id: b.cancelado_usuario,
        motivo_cancelamento: b.motivo_cancelamento,
        created_at: dataInicio,
        updated_at: updatedAt,
      };
    });

    await queryInterface.bulkInsert('bloqueios', bloqueiosFormatted, {});
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('bloqueios', null, {});
  }
};
