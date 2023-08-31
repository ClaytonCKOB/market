module.exports = (sequelize, DataTypes) => {
    const Cart = sequelize.define('cart', {
        sell: {
          type: DataTypes.INTEGER.UNSIGNED,
          primaryKey: true,
          allowNull: false,
          references: {
            model: 'sells', 
            key: 'invoice',
          },
          onUpdate: 'CASCADE',
        },
        product: {
          type: DataTypes.INTEGER.UNSIGNED,
          primaryKey: true,
          allowNull: false,
          references: {
            model: 'products', 
            key: 'cod',
          },
          onUpdate: 'CASCADE',
        },
        quantity: {
          type: DataTypes.INTEGER.UNSIGNED,
          allowNull: false,
          validate: {
            min: 1,
          },
        },
        createdAt: { type: DataTypes.DATE, allowNull: true, defaultValue: sequelize.literal('CURRENT_TIMESTAMP') },
        updatedAt: { type: DataTypes.DATE, allowNull: true, defaultValue: sequelize.literal('CURRENT_TIMESTAMP') }
      },
       {
        validate: {
          checkQuantidade() {
            if (this.quantidade <= 0) {
              throw new Error('Quantity must be greater than 0.');
            }
          },
        },
      });

    return Cart;
};