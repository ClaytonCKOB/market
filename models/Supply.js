module.exports = (sequelize, DataTypes) => {
  const Supply = sequelize.define(
    "supply",
    {
      product: {
        type: DataTypes.INTEGER.UNSIGNED,
        allowNull: false,
        references: {
          model: "products",
          key: "cod",
        },
        onUpdate: "CASCADE",
        onDelete: "CASCADE",
      },
      supplier: {
        type: DataTypes.INTEGER.UNSIGNED,
        allowNull: false,
        references: {
          model: "suppliers",
          key: "id",
        },
        onUpdate: "CASCADE",
        onDelete: "CASCADE",
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
      primaryKey: true,
    }
  );

  return Supply;
};
