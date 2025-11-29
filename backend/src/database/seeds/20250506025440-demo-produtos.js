'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    const produtos = [
      // Calçados - Setembro
      { nomeDoProduto: 'Chinelo Havaianas', tamanho: '38', cor: 'azul', quantidade: '15', marca: 'Havaianas', descricao: 'Chinelo Havaianas azul, confortável para uso diário', custoTotal: '150.00', mes: 9 },
      { nomeDoProduto: 'Tênis Esportivo', tamanho: '40', cor: 'preto', quantidade: '8', marca: 'Nike', descricao: 'Tênis esportivo preto para atividades físicas', custoTotal: '320.00', mes: 9 },
      { nomeDoProduto: 'Sandália Masculina', tamanho: '42', cor: 'marrom', quantidade: '12', marca: 'Pegada', descricao: 'Sandália masculina confortável para uso casual', custoTotal: '180.00', mes: 9 },

      // Roupas - Setembro/Outubro
      { nomeDoProduto: 'Camiseta Básica Branca', tamanho: 'G', cor: 'branca', quantidade: '25', marca: 'Hering', descricao: 'Camiseta básica de algodão, tamanho G', custoTotal: '250.00', mes: 9 },
      { nomeDoProduto: 'Camiseta Básica Azul', tamanho: 'M', cor: 'azul', quantidade: '20', marca: 'Hering', descricao: 'Camiseta básica masculina de algodão', custoTotal: '200.00', mes: 9 },
      { nomeDoProduto: 'Calça Jeans 42', tamanho: '42', cor: 'azul', quantidade: '10', marca: 'Levis', descricao: 'Calça jeans masculina resistente', custoTotal: '400.00', mes: 10 },
      { nomeDoProduto: 'Calça Jeans 40', tamanho: '40', cor: 'azul', quantidade: '8', marca: 'Levis', descricao: 'Calça jeans masculina tradicional', custoTotal: '320.00', mes: 10 },
      { nomeDoProduto: 'Shorts Esportivo', tamanho: 'M', cor: 'cinza', quantidade: '15', marca: 'Adidas', descricao: 'Shorts esportivo masculino', custoTotal: '225.00', mes: 10 },
      { nomeDoProduto: 'Bermuda Jeans', tamanho: 'G', cor: 'azul', quantidade: '6', marca: 'Levis', descricao: 'Bermuda jeans casual masculina', custoTotal: '180.00', mes: 10 },

      // Higiene Pessoal - Setembro/Outubro/Novembro
      { nomeDoProduto: 'Shampoo Pantene', tamanho: '400ml', cor: 'branco', quantidade: '30', marca: 'Pantene', descricao: 'Shampoo hidratante para todos os tipos de cabelo', custoTotal: '300.00', mes: 9 },
      { nomeDoProduto: 'Condicionador Pantene', tamanho: '400ml', cor: 'branco', quantidade: '30', marca: 'Pantene', descricao: 'Condicionador hidratante', custoTotal: '300.00', mes: 9 },
      { nomeDoProduto: 'Sabonete Dove', tamanho: '90g', cor: 'branco', quantidade: '50', marca: 'Dove', descricao: 'Sabonete em barra hidratante', custoTotal: '150.00', mes: 10 },
      { nomeDoProduto: 'Pasta de Dente Colgate', tamanho: '90g', cor: 'branco', quantidade: '40', marca: 'Colgate', descricao: 'Creme dental com flúor', custoTotal: '120.00', mes: 10 },
      { nomeDoProduto: 'Escova de Dente', tamanho: 'único', cor: 'sortido', quantidade: '50', marca: 'Oral-B', descricao: 'Escova dental macia', custoTotal: '100.00', mes: 10 },
      { nomeDoProduto: 'Desodorante Rexona', tamanho: '50ml', cor: 'azul', quantidade: '25', marca: 'Rexona', descricao: 'Desodorante roll-on', custoTotal: '175.00', mes: 11 },
      { nomeDoProduto: 'Papel Higiênico', tamanho: '30m', cor: 'branco', quantidade: '100', marca: 'Neve', descricao: 'Papel higiênico folha dupla', custoTotal: '200.00', mes: 11 },

      // Roupa de Cama - Outubro/Novembro
      { nomeDoProduto: 'Lençol Solteiro', tamanho: 'solteiro', cor: 'branco', quantidade: '20', marca: 'Santista', descricao: 'Jogo de lençol de solteiro, 100% algodão', custoTotal: '400.00', mes: 10 },
      { nomeDoProduto: 'Travesseiro', tamanho: '50x70cm', cor: 'branco', quantidade: '25', marca: 'Nasa', descricao: 'Travesseiro de fibra siliconizada', custoTotal: '625.00', mes: 10 },
      { nomeDoProduto: 'Cobertor Solteiro', tamanho: 'solteiro', cor: 'cinza', quantidade: '15', marca: 'Jolitex', descricao: 'Cobertor de microfibra', custoTotal: '450.00', mes: 11 },
      { nomeDoProduto: 'Fronha', tamanho: '50x70cm', cor: 'branco', quantidade: '40', marca: 'Santista', descricao: 'Fronha de algodão', custoTotal: '200.00', mes: 11 },

      // Limpeza - Setembro/Outubro
      { nomeDoProduto: 'Detergente', tamanho: '500ml', cor: 'neutro', quantidade: '30', marca: 'Ypê', descricao: 'Detergente líquido neutro', custoTotal: '60.00', mes: 9 },
      { nomeDoProduto: 'Desinfetante', tamanho: '2L', cor: 'lavanda', quantidade: '20', marca: 'Veja', descricao: 'Desinfetante com fragrância de lavanda', custoTotal: '100.00', mes: 10 },
      { nomeDoProduto: 'Sabão em Pó', tamanho: '1kg', cor: 'branco', quantidade: '15', marca: 'OMO', descricao: 'Sabão em pó para roupas', custoTotal: '180.00', mes: 10 },
      { nomeDoProduto: 'Amaciante', tamanho: '2L', cor: 'azul', quantidade: '12', marca: 'Comfort', descricao: 'Amaciante concentrado', custoTotal: '144.00', mes: 11 },

      // Diversos - Novembro
      { nomeDoProduto: 'Toalha de Banho', tamanho: '70x140cm', cor: 'branca', quantidade: '18', marca: 'Döhler', descricao: 'Toalha de banho felpuda', custoTotal: '360.00', mes: 11 },
      { nomeDoProduto: 'Toalha de Rosto', tamanho: '50x80cm', cor: 'azul', quantidade: '25', marca: 'Döhler', descricao: 'Toalha de rosto em algodão', custoTotal: '250.00', mes: 11 },
      { nomeDoProduto: 'Pente', tamanho: 'único', cor: 'preto', quantidade: '30', marca: 'Océane', descricao: 'Pente de plástico resistente', custoTotal: '60.00', mes: 11 },
      { nomeDoProduto: 'Aparelho de Barbear', tamanho: 'único', cor: 'azul', quantidade: '40', marca: 'Gillette', descricao: 'Aparelho de barbear descartável', custoTotal: '200.00', mes: 11 },
      { nomeDoProduto: 'Fralda Geriátrica', tamanho: 'G', cor: 'branco', quantidade: '20', marca: 'Bigfral', descricao: 'Fralda geriátrica tamanho grande', custoTotal: '400.00', mes: 11 },
    ];

    const produtosFormatados = produtos.map(p => {
      const dia = Math.floor(Math.random() * 28) + 1;
      return {
        nomeDoProduto: p.nomeDoProduto,
        tamanho: p.tamanho,
        cor: p.cor,
        quantidade: p.quantidade,
        marca: p.marca,
        descricao: p.descricao,
        custoTotal: p.custoTotal,
        created_at: new Date(`2025-${String(p.mes).padStart(2, '0')}-${String(dia).padStart(2, '0')}`),
        updated_at: new Date(`2025-${String(p.mes).padStart(2, '0')}-${String(dia).padStart(2, '0')}`),
      };
    });

    await queryInterface.bulkInsert('produtos', produtosFormatados, {});
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('produtos', null, {});
  }
};