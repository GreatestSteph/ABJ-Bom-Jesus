'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    const quartos = [];
    const statusOptions = ['disponivel', 'ocupado', 'manutencao'];

    // Distribuir quartos entre setembro, outubro e novembro de 2025
    // Setembro: 6 quartos (101-106)
    // Outubro: 7 quartos (201-207)
    // Novembro: 7 quartos (301-307)

    for (let andar = 1; andar <= 3; andar++) {
      const numQuartosAndar = andar === 1 ? 6 : 7;
      const mes = andar === 1 ? 9 : (andar === 2 ? 10 : 11);

      for (let num = 1; num <= numQuartosAndar; num++) {
        const numeroQuarto = `${andar}0${num}`;
        const dia = Math.floor(Math.random() * 28) + 1;

        // Distribuição de status: 50% disponivel, 35% ocupado, 15% manutencao
        let status;
        const random = Math.random();
        if (random < 0.50) {
          status = 'disponivel';
        } else if (random < 0.85) {
          status = 'ocupado';
        } else {
          status = 'manutencao';
        }

        quartos.push({
          numero: numeroQuarto,
          status: status,
          created_at: new Date(`2025-${String(mes).padStart(2, '0')}-${String(dia).padStart(2, '0')}`),
          updated_at: new Date(`2025-${String(mes).padStart(2, '0')}-${String(dia).padStart(2, '0')}`),
        });
      }
    }

    await queryInterface.bulkInsert('quartos', quartos, {});
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('quartos', null, {});
  }
};
