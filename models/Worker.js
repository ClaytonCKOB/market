module.exports = (sequelize, DataTypes) => {
  const Worker = sequelize.define(
    "worker",
    {
      id: {
        type: DataTypes.INTEGER.UNSIGNED,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
      },
      cpf: {
        type: DataTypes.STRING(11),
        unique: true,
        allowNull: false,
      },
      name: {
        type: DataTypes.STRING(40),
        allowNull: false,
      },
      CNH: {
        type: DataTypes.STRING(11),
        unique: true,
      },
      shift: {
        type: DataTypes.INTEGER.UNSIGNED,
        references: {
          model: "shifts", // Assuming your Turno model is named 'Turno'
          key: "id",
        },
        onUpdate: "CASCADE",
        onDelete: "SET NULL",
      },
      user: {
        type: DataTypes.STRING(40),
        unique: true,
      },
      password: {
        type: DataTypes.STRING(40),
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
        checkUsuarioSenha() {
          if ((this.user && !this.password) || (!this.user && this.password)) {
            throw new Error(
              "Both user and password must be provided together."
            );
          }
        },
      },
    }
  );

  return Worker;
};
