module.exports = (sequelize, DataTypes) => {
    const PaymentMethod = sequelize.define('payment_method', {

        id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            primaryKey: true,
            validate: {
                notEmpty: false
            }
        },
      
        description: {
            type: DataTypes.STRING,
            allowNull: true,
            validate: {
                notEmpty: true
            }
        }
      });

    return PaymentMethod;
};