'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    const nomes = [
      'João da Silva', 'Carlos Pereira', 'Pedro Costa', 'Roberto Lima', 'Ricardo Mendes',
      'Paulo Martins', 'Lucas Barbosa', 'Marcos Dias', 'Felipe Araújo', 'Rodrigo Nascimento',
      'André Santos', 'Bruno Oliveira', 'Diego Souza', 'Eduardo Alves', 'Fernando Rocha',
      'Gustavo Ferreira', 'Henrique Cardoso', 'Igor Cavalcanti', 'José Monteiro', 'Leonardo Gomes'
    ];

    const escolaridades = ['Analfabeto', 'Fundamental Incompleto', 'Fundamental Completo', 'Médio Incompleto', 'Médio Completo', 'Superior Incompleto'];
    const estadosCivis = ['Solteiro', 'Casado', 'Divorciado', 'Viúvo'];

    const hospedes = [];

    for (let i = 0; i < 20; i++) {
      const mes = i < 7 ? 9 : (i < 14 ? 10 : 11); // Distribuir entre set, out, nov
      const dia = Math.floor(Math.random() * 28) + 1;
      const anoNasc = 1960 + Math.floor(Math.random() * 45); // Entre 1960 e 2005

      hospedes.push({
        nome: nomes[i],
        data_nascimento: new Date(`${anoNasc}-${String(Math.floor(Math.random() * 12) + 1).padStart(2, '0')}-${String(Math.floor(Math.random() * 28) + 1).padStart(2, '0')}`),
        rg: `${10000000 + i}${Math.floor(Math.random() * 10)}`,
        cpf: `${String(100 + i).padStart(3, '0')}.${String(Math.floor(Math.random() * 1000)).padStart(3, '0')}.${String(Math.floor(Math.random() * 1000)).padStart(3, '0')}-${String(Math.floor(Math.random() * 100)).padStart(2, '0')}`,
        data_contato_familia: new Date(`2025-${String(mes).padStart(2, '0')}-${String(dia).padStart(2, '0')}`),
        escolaridade: escolaridades[Math.floor(Math.random() * escolaridades.length)],
        empregado: Math.random() > 0.6,
        biometria: `bio_${i + 1}_${Math.random().toString(36).substring(7)}`,
        genero: 'Masculino',
        estado_civil: estadosCivis[Math.floor(Math.random() * estadosCivis.length)],
        created_at: new Date(`2025-${String(mes).padStart(2, '0')}-${String(dia).padStart(2, '0')}`),
        updated_at: new Date(`2025-${String(mes).padStart(2, '0')}-${String(dia).padStart(2, '0')}`),
      });
    }

    await queryInterface.bulkInsert('guests', hospedes, {});
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('guests', null, {});
  }
};
