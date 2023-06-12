module.exports = (sequelize, DataTypes) => {
    const Sell = sequelize.define('sell', {

        id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            primaryKey: true,
            validate: {
                notEmpty: false
            }
        },
      
        products: {
            type: DataTypes.JSON,
            allowNull: true,
            validate: {
                notEmpty: true
            }
        },
      
        total: {
            type: DataTypes.FLOAT,
            allowNull: true,
            validate: {
                notEmpty: true
            }
        },
      
        discount: {
            type: DataTypes.FLOAT,
            allowNull: true,
            validate: {
                notEmpty: true
            }
        },
      
        client: {
            type: DataTypes.INTEGER,
            allowNull: true,
            validate: {
                notEmpty: true
            }
        },
      
        user: {
            type: DataTypes.INTEGER,
            allowNull: true,
            validate: {
                notEmpty: true
            }
        },
      
        date: {
            type: DataTypes.DATE,
            allowNull: true,
            validate: {
                notEmpty: true
            }
        },
      
        payment_method: {
            type: DataTypes.INTEGER,
            allowNull: true,
            validate: {
                notEmpty: true
            }
        },
      });

    return Sell;
};