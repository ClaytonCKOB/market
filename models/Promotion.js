module.exports = (sequelize, DataTypes) => {
    const Promotion = sequelize.define('promotion', {
        id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            validate: {
                notEmpty: false
            }
        },
      
        product: {
            type: DataTypes.JSON,
            allowNull: true,
            validate: {
                notEmpty: true
            }
        },
      
        category: {
            type: DataTypes.JSON,
            allowNull: true,
            validate: {
                notEmpty: true
            }
        }
    });

    return Promotion;
};