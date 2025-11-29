'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    const occurrences = [
      // Setembro 2025 - Tipos de ocorrência: 1-Uso substâncias(Grave), 2-Vandalismo(Grave), 3-Furto(Grave), 4-Comp.agressivo(Mod), 5-Conflito(Mod), 6-Desacato(Mod), 7-Perturbação(Mod), 8-Desrespeito(Leve), 9-Atraso(Leve), 10-Falta atividades(Leve), 11-Má conservação(Leve)
      { guest_id: 1, occurrence_type_id: 8, registration_date: '2025-09-03', description: 'Hóspede não seguiu horário estabelecido para refeições, causando transtorno na organização da cozinha.', registered_by_user_id: 2, mes: 9, dia: 3 },
      { guest_id: 2, occurrence_type_id: 9, registration_date: '2025-09-05', description: 'Chegada tardia após o horário permitido pela terceira vez consecutiva nesta semana.', registered_by_user_id: 3, mes: 9, dia: 5 },
      { guest_id: 3, occurrence_type_id: 11, registration_date: '2025-09-08', description: 'Quarto encontrado em estado de desorganização, com lixo acumulado e roupas espalhadas.', registered_by_user_id: 2, mes: 9, dia: 8 },
      { guest_id: 5, occurrence_type_id: 4, registration_date: '2025-09-10', description: 'Comportamento agressivo durante conversa com assistente social, elevando voz e fazendo gestos intimidadores.', registered_by_user_id: 4, mes: 9, dia: 10 },
      { guest_id: 7, occurrence_type_id: 10, registration_date: '2025-09-12', description: 'Ausência não justificada na reunião obrigatória semanal com a equipe técnica.', registered_by_user_id: 3, mes: 9, dia: 12 },
      { guest_id: 4, occurrence_type_id: 5, registration_date: '2025-09-14', description: 'Discussão acalorada com outro hóspede na área comum, foi necessária intervenção da equipe.', registered_by_user_id: 1, mes: 9, dia: 14 },
      { guest_id: 8, occurrence_type_id: 8, registration_date: '2025-09-16', description: 'Desrespeito às regras de uso da área de lazer, utilizando equipamentos após horário permitido.', registered_by_user_id: 2, mes: 9, dia: 16 },
      { guest_id: 11, occurrence_type_id: 1, registration_date: '2025-09-18', description: 'Suspeita de uso de substâncias ilícitas nas dependências. Hóspede apresentava comportamento alterado e odor característico.', registered_by_user_id: 5, mes: 9, dia: 18 },
      { guest_id: 6, occurrence_type_id: 7, registration_date: '2025-09-20', description: 'Perturbação do sossego noturno com música alta no quarto após às 22h.', registered_by_user_id: 3, mes: 9, dia: 20 },
      { guest_id: 9, occurrence_type_id: 9, registration_date: '2025-09-22', description: 'Atraso reiterado para compromissos agendados com profissionais da instituição.', registered_by_user_id: 4, mes: 9, dia: 22 },

      // Outubro 2025
      { guest_id: 12, occurrence_type_id: 11, registration_date: '2025-10-02', description: 'Banheiro compartilhado deixado sujo após uso, sem higienização adequada.', registered_by_user_id: 2, mes: 10, dia: 2 },
      { guest_id: 14, occurrence_type_id: 6, registration_date: '2025-10-05', description: 'Desacato à orientação de funcionário, recusando-se a cumprir determinação sobre uso de espaços comuns.', registered_by_user_id: 3, mes: 10, dia: 5 },
      { guest_id: 3, occurrence_type_id: 4, registration_date: '2025-10-07', description: 'Atitude agressiva verbal contra outro hóspede durante atividade em grupo.', registered_by_user_id: 4, mes: 10, dia: 7 },
      { guest_id: 16, occurrence_type_id: 10, registration_date: '2025-10-09', description: 'Falta na oficina de capacitação profissional sem apresentar justificativa.', registered_by_user_id: 2, mes: 10, dia: 9 },
      { guest_id: 10, occurrence_type_id: 2, registration_date: '2025-10-11', description: 'Dano intencional a porta do banheiro coletivo, arrancando trinco durante episódio de raiva.', registered_by_user_id: 5, mes: 10, dia: 11 },
      { guest_id: 18, occurrence_type_id: 8, registration_date: '2025-10-14', description: 'Desrespeito às normas de convivência, fumando em área não permitida.', registered_by_user_id: 3, mes: 10, dia: 14 },
      { guest_id: 5, occurrence_type_id: 5, registration_date: '2025-10-16', description: 'Conflito com colega de quarto sobre organização do espaço, necessitou mediação.', registered_by_user_id: 1, mes: 10, dia: 16 },
      { guest_id: 13, occurrence_type_id: 9, registration_date: '2025-10-18', description: 'Chegada após horário permitido sem aviso prévio, dificultando controle de segurança.', registered_by_user_id: 2, mes: 10, dia: 18 },
      { guest_id: 20, occurrence_type_id: 7, registration_date: '2025-10-20', description: 'Comportamento que perturba outros hóspedes, falando alto no corredor durante período de descanso.', registered_by_user_id: 4, mes: 10, dia: 20 },
      { guest_id: 1, occurrence_type_id: 11, registration_date: '2025-10-23', description: 'Falta de cuidado com espaços compartilhados, deixando louça suja na pia coletiva.', registered_by_user_id: 3, mes: 10, dia: 23 },
      { guest_id: 15, occurrence_type_id: 3, registration_date: '2025-10-25', description: 'Apropriação indevida de alimentos de outro hóspede guardados na geladeira compartilhada.', registered_by_user_id: 5, mes: 10, dia: 25 },

      // Novembro 2025
      { guest_id: 17, occurrence_type_id: 8, registration_date: '2025-11-03', description: 'Não cumprimento de tarefa atribuída para manutenção das áreas comuns.', registered_by_user_id: 2, mes: 11, dia: 3 },
      { guest_id: 2, occurrence_type_id: 10, registration_date: '2025-11-05', description: 'Ausência em consulta agendada com psicólogo sem cancelamento prévio.', registered_by_user_id: 4, mes: 11, dia: 5 },
      { guest_id: 19, occurrence_type_id: 4, registration_date: '2025-11-08', description: 'Postura agressiva durante atendimento, ameaçando verbalmente membro da equipe técnica.', registered_by_user_id: 5, mes: 11, dia: 8 },
      { guest_id: 7, occurrence_type_id: 9, registration_date: '2025-11-10', description: 'Atrasos frequentes para atividades programadas, demonstrando falta de comprometimento.', registered_by_user_id: 3, mes: 11, dia: 10 },
      { guest_id: 11, occurrence_type_id: 6, registration_date: '2025-11-12', description: 'Desobediência às orientações da coordenação sobre normas de segurança.', registered_by_user_id: 1, mes: 11, dia: 12 },
      { guest_id: 4, occurrence_type_id: 7, registration_date: '2025-11-15', description: 'Perturbação durante a madrugada, acordando outros hóspedes com ruídos excessivos.', registered_by_user_id: 2, mes: 11, dia: 15 },
      { guest_id: 8, occurrence_type_id: 11, registration_date: '2025-11-17', description: 'Espaço pessoal mantido em condições inadequadas de higiene e organização.', registered_by_user_id: 3, mes: 11, dia: 17 },
      { guest_id: 16, occurrence_type_id: 5, registration_date: '2025-11-19', description: 'Desentendimento com outro residente sobre uso de televisão na sala comum.', registered_by_user_id: 4, mes: 11, dia: 19 },
      { guest_id: 12, occurrence_type_id: 8, registration_date: '2025-11-22', description: 'Descumprimento de regra sobre uso de celular em horário de atividades em grupo.', registered_by_user_id: 2, mes: 11, dia: 22 },
      { guest_id: 9, occurrence_type_id: 9, registration_date: '2025-11-24', description: 'Chegada tardia repetidas vezes, prejudicando rotina e segurança da instituição.', registered_by_user_id: 3, mes: 11, dia: 24 },
    ];

    const occurrencesFormatted = occurrences.map(o => ({
      guest_id: o.guest_id,
      occurrence_type_id: o.occurrence_type_id,
      registration_date: new Date(o.registration_date),
      description: o.description,
      registered_by_user_id: o.registered_by_user_id,
      created_at: new Date(`2025-${String(o.mes).padStart(2, '0')}-${String(o.dia).padStart(2, '0')}`),
      updated_at: new Date(`2025-${String(o.mes).padStart(2, '0')}-${String(o.dia).padStart(2, '0')}`),
    }));

    await queryInterface.bulkInsert('occurrences', occurrencesFormatted, {});
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('occurrences', null, {});
  }
};