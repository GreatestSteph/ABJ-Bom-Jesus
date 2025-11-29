'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    const tipos = [
      // Graves - Setembro
      { nome: 'Uso de substâncias', descricao: 'Uso ou porte de substâncias ilícitas dentro das dependências', nivel: 'Grave', mes: 9, dia: 5 },
      { nome: 'Vandalismo', descricao: 'Destruição ou dano ao patrimônio da instituição', nivel: 'Grave', mes: 9, dia: 10 },
      { nome: 'Furto', descricao: 'Apropriação indevida de pertences de outros hóspedes ou da instituição', nivel: 'Grave', mes: 9, dia: 15 },

      // Moderados - Setembro/Outubro
      { nome: 'Comportamento agressivo', descricao: 'Atitudes agressivas verbais ou físicas contra outros hóspedes ou funcionários', nivel: 'Moderado', mes: 9, dia: 20 },
      { nome: 'Conflito entre hóspedes', descricao: 'Brigas ou discussões acaloradas entre residentes', nivel: 'Moderado', mes: 10, dia: 3 },
      { nome: 'Desacato à autoridade', descricao: 'Desrespeito ou desobediência às orientações da equipe', nivel: 'Moderado', mes: 10, dia: 8 },
      { nome: 'Perturbação do sossego', descricao: 'Comportamentos que perturbam o descanso dos demais hóspedes', nivel: 'Moderado', mes: 10, dia: 15 },

      // Leves - Outubro/Novembro
      { nome: 'Desrespeito às regras', descricao: 'Não cumprimento das regras básicas de convivência da instituição', nivel: 'Leve', mes: 10, dia: 22 },
      { nome: 'Atraso frequente', descricao: 'Chegadas tardias constantes após horário permitido', nivel: 'Leve', mes: 11, dia: 5 },
      { nome: 'Falta às atividades obrigatórias', descricao: 'Ausência não justificada em atividades ou reuniões obrigatórias', nivel: 'Leve', mes: 11, dia: 12 },
      { nome: 'Má conservação do espaço', descricao: 'Falta de cuidado com a limpeza e organização dos espaços compartilhados', nivel: 'Leve', mes: 11, dia: 18 }
    ];

    const tiposFormatados = tipos.map(t => ({
      nome: t.nome,
      descricao: t.descricao,
      nivel: t.nivel,
      created_at: new Date(`2025-${String(t.mes).padStart(2, '0')}-${String(t.dia).padStart(2, '0')}`),
      updated_at: new Date(`2025-${String(t.mes).padStart(2, '0')}-${String(t.dia).padStart(2, '0')}`)
    }));

    await queryInterface.bulkInsert('tipos_ocorrencia', tiposFormatados, {});
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('tipos_ocorrencia', null, {});
  }
};