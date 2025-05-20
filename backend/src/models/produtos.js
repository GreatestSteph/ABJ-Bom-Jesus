import Sequelize, { Model } from 'sequelize';

class Produtos extends Model {
  static init(sequelize) {
    super.init(
      {
        nomeDoProduto: Sequelize.STRING,
        tamanho: Sequelize.STRING,
        cor: Sequelize.STRING,
        quantidade: Sequelize.INTEGER,
        marca: Sequelize.STRING,
        descricao: Sequelize.STRING,
        custoTotal: Sequelize.INTEGER,
      },
      { sequelize },
    );

    return this;
  }

  static associate(models) {}
}

export default Produtos;
