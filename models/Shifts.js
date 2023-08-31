module.exports = (sequelize, DataTypes) => {
  const Shift = sequelize.define("shift", {
    id: {
      type: DataTypes.INTEGER.UNSIGNED,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
      validate: {
        notEmpty: false,
      },
    },

    name: {
      type: DataTypes.STRING,
      allowNull: true,
      validate: {
        notEmpty: true,
      },
    },

    start: {
      type: DataTypes.TIME,
      allowNull: true,
      validate: {
        notEmpty: true,
      },
    },

    end: {
      type: DataTypes.TIME,
      allowNull: true,
      validate: {
        notEmpty: true,
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
  });

  return Shift;
};
