'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    const produtos = [
      // Calçados - Setembro
      { nome_do_produto: 'Chinelo Havaianas', tamanho: '38', cor: 'azul', quantidade: '15', marca: 'Havaianas', descricao: 'Chinelo Havaianas azul, confortável para uso diário', custo_total: '150.00', mes: 9 },
      { nome_do_produto: 'Tênis Esportivo', tamanho: '40', cor: 'preto', quantidade: '8', marca: 'Nike', descricao: 'Tênis esportivo preto para atividades físicas', custo_total: '320.00', mes: 9 },
      { nome_do_produto: 'Sandália Masculina', tamanho: '42', cor: 'marrom', quantidade: '12', marca: 'Pegada', descricao: 'Sandália masculina confortável para uso casual', custo_total: '180.00', mes: 9 },

      // Roupas - Setembro/Outubro
      { nome_do_produto: 'Camiseta Básica Branca', tamanho: 'G', cor: 'branca', quantidade: '25', marca: 'Hering', descricao: 'Camiseta básica de algodão, tamanho G', custo_total: '250.00', mes: 9 },
      { nome_do_produto: 'Camiseta Básica Azul', tamanho: 'M', cor: 'azul', quantidade: '20', marca: 'Hering', descricao: 'Camiseta básica masculina de algodão', custo_total: '200.00', mes: 9 },
      { nome_do_produto: 'Calça Jeans 42', tamanho: '42', cor: 'azul', quantidade: '10', marca: 'Levis', descricao: 'Calça jeans masculina resistente', custo_total: '400.00', mes: 10 },
      { nome_do_produto: 'Calça Jeans 40', tamanho: '40', cor: 'azul', quantidade: '8', marca: 'Levis', descricao: 'Calça jeans masculina tradicional', custo_total: '320.00', mes: 10 },
      { nome_do_produto: 'Shorts Esportivo', tamanho: 'M', cor: 'cinza', quantidade: '15', marca: 'Adidas', descricao: 'Shorts esportivo masculino', custo_total: '225.00', mes: 10 },
      { nome_do_produto: 'Bermuda Jeans', tamanho: 'G', cor: 'azul', quantidade: '6', marca: 'Levis', descricao: 'Bermuda jeans casual masculina', custo_total: '180.00', mes: 10 },

      // Higiene Pessoal - Setembro/Outubro/Novembro
      { nome_do_produto: 'Shampoo Pantene', tamanho: '400ml', cor: 'branco', quantidade: '30', marca: 'Pantene', descricao: 'Shampoo hidratante para todos os tipos de cabelo', custo_total: '300.00', mes: 9 },
      { nome_do_produto: 'Condicionador Pantene', tamanho: '400ml', cor: 'branco', quantidade: '30', marca: 'Pantene', descricao: 'Condicionador hidratante', custo_total: '300.00', mes: 9 },
      { nome_do_produto: 'Sabonete Dove', tamanho: '90g', cor: 'branco', quantidade: '50', marca: 'Dove', descricao: 'Sabonete em barra hidratante', custo_total: '150.00', mes: 10 },
      { nome_do_produto: 'Pasta de Dente Colgate', tamanho: '90g', cor: 'branco', quantidade: '40', marca: 'Colgate', descricao: 'Creme dental com flúor', custo_total: '120.00', mes: 10 },
      { nome_do_produto: 'Escova de Dente', tamanho: 'único', cor: 'sortido', quantidade: '50', marca: 'Oral-B', descricao: 'Escova dental macia', custo_total: '100.00', mes: 10 },
      { nome_do_produto: 'Desodorante Rexona', tamanho: '50ml', cor: 'azul', quantidade: '25', marca: 'Rexona', descricao: 'Desodorante roll-on', custo_total: '175.00', mes: 11 },
      { nome_do_produto: 'Papel Higiênico', tamanho: '30m', cor: 'branco', quantidade: '100', marca: 'Neve', descricao: 'Papel higiênico folha dupla', custo_total: '200.00', mes: 11 },

      // Roupa de Cama - Outubro/Novembro
      { nome_do_produto: 'Lençol Solteiro', tamanho: 'solteiro', cor: 'branco', quantidade: '20', marca: 'Santista', descricao: 'Jogo de lençol de solteiro, 100% algodão', custo_total: '400.00', mes: 10 },
      { nome_do_produto: 'Travesseiro', tamanho: '50x70cm', cor: 'branco', quantidade: '25', marca: 'Nasa', descricao: 'Travesseiro de fibra siliconizada', custo_total: '625.00', mes: 10 },
      { nome_do_produto: 'Cobertor Solteiro', tamanho: 'solteiro', cor: 'cinza', quantidade: '15', marca: 'Jolitex', descricao: 'Cobertor de microfibra', custo_total: '450.00', mes: 11 },
      { nome_do_produto: 'Fronha', tamanho: '50x70cm', cor: 'branco', quantidade: '40', marca: 'Santista', descricao: 'Fronha de algodão', custo_total: '200.00', mes: 11 },

      // Limpeza - Setembro/Outubro
      { nome_do_produto: 'Detergente', tamanho: '500ml', cor: 'neutro', quantidade: '30', marca: 'Ypê', descricao: 'Detergente líquido neutro', custo_total: '60.00', mes: 9 },
      { nome_do_produto: 'Desinfetante', tamanho: '2L', cor: 'lavanda', quantidade: '20', marca: 'Veja', descricao: 'Desinfetante com fragrância de lavanda', custo_total: '100.00', mes: 10 },
      { nome_do_produto: 'Sabão em Pó', tamanho: '1kg', cor: 'branco', quantidade: '15', marca: 'OMO', descricao: 'Sabão em pó para roupas', custo_total: '180.00', mes: 10 },
      { nome_do_produto: 'Amaciante', tamanho: '2L', cor: 'azul', quantidade: '12', marca: 'Comfort', descricao: 'Amaciante concentrado', custo_total: '144.00', mes: 11 },

      // Diversos - Novembro
      { nome_do_produto: 'Toalha de Banho', tamanho: '70x140cm', cor: 'branca', quantidade: '18', marca: 'Döhler', descricao: 'Toalha de banho felpuda', custo_total: '360.00', mes: 11 },
      { nome_do_produto: 'Toalha de Rosto', tamanho: '50x80cm', cor: 'azul', quantidade: '25', marca: 'Döhler', descricao: 'Toalha de rosto em algodão', custo_total: '250.00', mes: 11 },
      { nome_do_produto: 'Pente', tamanho: 'único', cor: 'preto', quantidade: '30', marca: 'Océane', descricao: 'Pente de plástico resistente', custo_total: '60.00', mes: 11 },
      { nome_do_produto: 'Aparelho de Barbear', tamanho: 'único', cor: 'azul', quantidade: '40', marca: 'Gillette', descricao: 'Aparelho de barbear descartável', custo_total: '200.00', mes: 11 },
      { nome_do_produto: 'Fralda Geriátrica', tamanho: 'G', cor: 'branco', quantidade: '20', marca: 'Bigfral', descricao: 'Fralda geriátrica tamanho grande', custo_total: '400.00', mes: 11 },
    ];

    const produtosFormatados = produtos.map(p => {
      const dia = Math.floor(Math.random() * 28) + 1;
      return {
        nome_do_produto: p.nome_do_produto,
        tamanho: p.tamanho,
        cor: p.cor,
        quantidade: p.quantidade,
        marca: p.marca,
        descricao: p.descricao,
        custo_total: p.custo_total,
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
