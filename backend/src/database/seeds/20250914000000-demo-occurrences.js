'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert('occurrences', [
      {
        guest_id: 1,
        occurrence_type_id: 1,
        registration_date: new Date('2025-09-10'),
        description: 'Hóspede demonstrou comportamento colaborativo durante as atividades matinais. Ajudou na organização do refeitório e participou ativamente das discussões em grupo.',
        registered_by_user_id: 1,
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        guest_id: 2,
        occurrence_type_id: 2,
        registration_date: new Date('2025-09-12'),
        description: 'Hóspede apresentou resistência às regras estabelecidas, recusando-se a participar das atividades programadas e demonstrando irritação com outros residentes.',
        registered_by_user_id: 1,
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        guest_id: 3,
        occurrence_type_id: 1,
        registration_date: new Date('2025-09-13'),
        description: 'Comportamento exemplar durante todo o dia. Auxiliou funcionários na manutenção do jardim e demonstrou liderança positiva com outros hóspedes.',
        registered_by_user_id: 1,
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        guest_id: 1,
        occurrence_type_id: 3,
        registration_date: new Date('2025-09-14'),
        description: 'Hóspede envolveu-se em discussão acalorada com outro residente durante o jantar. Foi necessária intervenção da equipe para acalmar a situação. Demonstrou arrependimento posteriormente.',
        registered_by_user_id: 1,
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        guest_id: 2,
        occurrence_type_id: 2,
        registration_date: new Date('2025-09-14'),
        description: 'Segunda ocorrência de resistência às normas. Hóspede se recusou a seguir o horário de repouso e perturbou outros residentes durante a madrugada.',
        registered_by_user_id: 1,
        created_at: new Date(),
        updated_at: new Date(),
      }
    ], {});
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('occurrences', null, {});
  }
};