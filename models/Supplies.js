module.exports = (sequelize, DataTypes) => {
    const Supplies = sequelize.define('supplies', {
        product: {
            type: DataTypes.INTEGER,
            allowNull: false,
            primaryKey: true,
            validate: {
                notEmpty: false
            },
        },
      
        supplier: {
            type: DataTypes.INTEGER,
            allowNull: false,
            validate: {
                notEmpty: false
            },
        }
      });

    return Supplies;
};