module.exports = (sequelize, DataTypes) => {
  const Sell = sequelize.define(
    "sell",
    {
      invoice: {
        type: DataTypes.INTEGER.UNSIGNED,
        primaryKey: true,
        allowNull: false,
      },
      date: {
        type: DataTypes.DATE,
        allowNull: false,
      },
      clerk: {
        type: DataTypes.INTEGER.UNSIGNED,
        allowNull: false,
        references: {
          model: "workers",
          key: "id",
        },
      },
      client: {
        type: DataTypes.INTEGER.UNSIGNED,
        references: {
          model: "clients", // Assuming your Cliente model is named 'Cliente'
          key: "id",
        },
      },
      deliveryman: {
        type: DataTypes.STRING(11),
        references: {
          model: "workers", // Assuming your Funcionario model is named 'Funcionario'
          key: "CNH",
        },
      },
      vehicle: {
        type: DataTypes.INTEGER.UNSIGNED,
        references: {
          model: "vehicles", // Assuming your Veiculo model is named 'Veiculo'
          key: "id",
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
        checkVeiculoEntregador() {
          if (
            (this.vehicle === null && this.deliveryman !== null) ||
            (this.vehicle !== null && this.deliveryman === null)
          ) {
            throw new Error(
              "Both vehicle and deliveryman must be provided together, or both must be null."
            );
          }
        },
      },
    }
  );

  return Sell;
};
