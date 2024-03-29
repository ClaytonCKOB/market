module.exports = (sequelize, DataTypes) => {
  const Payment = sequelize.define(
    "payment",
    {
      payment_method: {
        type: DataTypes.INTEGER.UNSIGNED,
        primaryKey: true,
        allowNull: false,
        references: {
          model: "payment_methods",
          key: "id",
        },
        onUpdate: "CASCADE",
      },
      sell: {
        type: DataTypes.INTEGER.UNSIGNED,
        primaryKey: true,
        allowNull: false,
        references: {
          model: "sells",
          key: "invoice",
        },
        onUpdate: "CASCADE",
      },
      value: {
        type: DataTypes.FLOAT(6, 2),
        validate: {
          min: 0,
        },
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
        checkValor() {
          if (this.valor <= 0) {
            throw new Error("Value must be greater than 0.");
          }
        },
      },
    }
  );

  return Payment;
};
