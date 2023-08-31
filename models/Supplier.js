module.exports = (sequelize, DataTypes) => {
  const Supplier = sequelize.define("supplier", {
    id: {
      type: DataTypes.INTEGER.UNSIGNED,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false,
    },
    name: {
      type: DataTypes.STRING(40),
      allowNull: false,
    },
    cpf_cnpj: {
      type: DataTypes.STRING(20),
      allowNull: false,
      unique: true,
    },
    phone_number: {
      type: DataTypes.STRING(11),
      allowNull: false,
    },
    email: {
      type: DataTypes.STRING(40),
      allowNull: false,
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
  });

  return Supplier;
};
