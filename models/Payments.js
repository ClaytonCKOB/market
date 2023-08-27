module.exports = (sequelize, DataTypes) => {
    const Payments = sequelize.define('payments', {

        payment_method: {
            type: DataTypes.INTEGER,
            allowNull: false,
            primaryKey: true,
            validate: {
                notEmpty: false
            }
        },

        sell: {
            type: DataTypes.INTEGER,
            allowNull: false,
            primaryKey: true,
            validate: {
                notEmpty: false
            }
        },

        value: {
            type: DataTypes.FLOAT,
            allowNull: false,
            primaryKey: true,
            validate: {
                notEmpty: false
            }
        }
      });

    return PaymentMethod;
};