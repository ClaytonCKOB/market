module.exports = (sequelize, DataTypes) => {
  const Vehicle = sequelize.define("vehicle", {
    id: {
      type: DataTypes.INTEGER.UNSIGNED,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false,
    },
    CRV: {
      type: DataTypes.STRING(11),
      allowNull: false,
      unique: true,
    },
    license_plate: {
      type: DataTypes.STRING(7),
      allowNull: false,
      unique: true,
    },
    model: {
      type: DataTypes.STRING(40),
      allowNull: false,
    },
    color: {
      type: DataTypes.STRING(15),
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

  return Vehicle;
};
