module.exports = (sequelize, DataTypes) => {
  const Product = sequelize.define(
    "product",
    {
      cod: {
        type: DataTypes.INTEGER.UNSIGNED,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
      },
      description: {
        type: DataTypes.STRING(50),
        allowNull: false,
      },
      cost: {
        type: DataTypes.FLOAT(6, 2),
        allowNull: false,
        validate: {
          min: 0,
        },
      },
      price: {
        type: DataTypes.FLOAT(6, 2),
        allowNull: false,
        validate: {
          min: 0,
          isGreaterThanCusto(value) {
            if (value <= this.cost) {
              throw new Error("Price must be greater than custo.");
            }
          },
        },
      },
      category: {
        type: DataTypes.INTEGER.UNSIGNED,
        references: {
          model: "categories", // Assuming your category model is named 'Categorias'
          key: "id",
        },
        onUpdate: "CASCADE",
        onDelete: "SET NULL",
      },
      discount: {
        type: DataTypes.FLOAT(6, 2),
        defaultValue: 0,
      },
      createdAt: {
        type: DataTypes.DATE,
        allowNull: true,
        defaultValue: sequelize.literal("CURRENT_TIMESTAMP"),
      },
      updatedAt: {
        type: DataTypes.DATE,
        allowNull: true,
        defaultValue: sequelize.literal("CURRENT_TIMESTAMP"),
      },
    },
    {
      validate: {
        checkPrecoCusto() {
          if (this.preco <= this.custo) {
            throw new Error("Price must be greater than custo.");
          }
        },
      },
    }
  );

  return Product;
};
