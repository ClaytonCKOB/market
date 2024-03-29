module.exports = (sequelize, DataTypes) => {
  const Client = sequelize.define(
    "client",
    {
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
      cpf: {
        type: DataTypes.STRING(11),
        allowNull: false,
        unique: true,
      },
      address: {
        type: DataTypes.STRING(30),
        allowNull: false,
      },
      credit_limit: {
        type: DataTypes.FLOAT(6, 2),
        allowNull: false,
        defaultValue: 0,
        validate: {
          min: 0,
        },
      },
      email: {
        type: DataTypes.STRING(40),
      },
      phone_number: {
        type: DataTypes.STRING(11),
      },
      receive_offers: {
        type: DataTypes.BOOLEAN,
        defaultValue: false,
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
        checkLimiteCredito() {
          if (this.credit_limit < 0) {
            throw new Error("credit_limit must be greater than or equal to 0.");
          }
        },
      },
    }
  );

  return Client;
};
