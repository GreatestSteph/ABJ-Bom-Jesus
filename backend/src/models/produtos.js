import Sequelize, { Model } from 'sequelize';

class Produtos extends Model {
  static init(sequelize) {
    super.init(
      {
        nomeDoProduto: {
          type: Sequelize.STRING,
          field: 'nome_do_produto',
        },
        tamanho: Sequelize.STRING,
        cor: Sequelize.STRING,
        quantidade: Sequelize.INTEGER,
        marca: Sequelize.STRING,
        descricao: Sequelize.STRING,
        custoTotal: {
          type: Sequelize.INTEGER,
          field: 'custo_total',
        },
      },
      { sequelize },
    );

    return this;
  }

  static associate(models) {}
}

export default Produtos;
