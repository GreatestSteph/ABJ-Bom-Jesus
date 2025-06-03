import Sequelize, { Model } from 'sequelize'; // Importa o Sequelize e a classe Model do pacote 'sequelize'

class Quarto extends Model {
  // Método estático init é chamado para configurar o modelo no Sequelize
  static init(sequelizeInstance) {
    super.init(
      {
        numero: {
          type: Sequelize.STRING,     // Define o tipo da coluna como STRING (texto)
          allowNull: false,            // Não permite valor nulo para este campo
          unique: true,                // Garante valor único na tabela para "numero"
        },
        tipo: {
          type: Sequelize.ENUM('Solteiro', 'Casal', 'Beliche'), // Define um ENUM com as opções 'Solteiro', 'Casal' ou 'Beliche'
          allowNull: false,            // Não permite valor nulo para este campo
        },
        ocupacao_max: {
          type: Sequelize.INTEGER,    // Define o tipo da coluna como INTEGER (número inteiro)
          allowNull: false,            // Não permite valor nulo para este campo
          defaultValue: 1,            // Valor padrão será 1 se não for informado
        },
        preco_diaria: {
          type: Sequelize.DECIMAL(10, 2), // Define o tipo como DECIMAL com 10 dígitos no total, sendo 2 decimais
          allowNull: false,            // Não permite valor nulo para este campo
        },
        status: {
          type: Sequelize.ENUM('disponivel', 'ocupado', 'manutencao'), // Define um ENUM com os status possíveis
          allowNull: false,            // Não permite valor nulo para este campo
          defaultValue: 'disponivel',  // Valor padrão será 'disponivel' se não for informado
        },
      },
      {
        sequelize: sequelizeInstance, // Passa a instância do Sequelize para configurar o modelo
        modelName: 'Quarto',          // Nome do modelo dentro do Sequelize
        tableName: 'quartos',         // Nome da tabela no banco de dados
        underscored: true,            // Usa snake_case (em vez de camelCase) para os campos criados automaticamente
        timestamps: true,             // Habilita as colunas created_at e updated_at automaticamente
      }
    );
    return this; // Retorna a própria classe Quarto para permitir encadeamento, se necessário
  }

  static associate(models) {
    // Método responsável por definir associações/relacionamentos com outros modelos
    // (Nenhuma associação especificada por enquanto)
  }
}

// Chama Quarto.init com a instância global "sequelize" para registrar o modelo
Quarto.init(sequelize);

export default Quarto; // Exporta o modelo Quarto para uso em outras partes da aplicação
