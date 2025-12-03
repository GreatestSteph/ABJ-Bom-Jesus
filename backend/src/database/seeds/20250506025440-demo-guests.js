'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    // Função para gerar CPF válido
    function generateValidCPF(index) {
      // Base para os primeiros 9 dígitos (usando index para garantir unicidade)
      const base = String(100000000 + index * 11111).padStart(9, '0');

      // Calcular primeiro dígito verificador
      let sum = 0;
      for (let i = 0; i < 9; i++) {
        sum += parseInt(base.charAt(i)) * (10 - i);
      }
      let firstDigit = 11 - (sum % 11);
      if (firstDigit >= 10) firstDigit = 0;

      // Calcular segundo dígito verificador
      sum = 0;
      for (let i = 0; i < 9; i++) {
        sum += parseInt(base.charAt(i)) * (11 - i);
      }
      sum += firstDigit * 2;
      let secondDigit = 11 - (sum % 11);
      if (secondDigit >= 10) secondDigit = 0;

      // Formatar CPF
      const cpf = base + firstDigit + secondDigit;
      return `${cpf.substring(0, 3)}.${cpf.substring(3, 6)}.${cpf.substring(6, 9)}-${cpf.substring(9, 11)}`;
    }

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
        cpf: generateValidCPF(i),
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
