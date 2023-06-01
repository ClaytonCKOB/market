module.exports = (sequelize, DataTypes) => {
    const Product = sequelize.define('product', {
        cod: {
            type: DataTypes.INTEGER,
            allowNull: false,
            validate: {
                notEmpty: true
            }
        },
        description: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                notEmpty: false
            }
        },
        cost: {
            type: DataTypes.FLOAT,
            allowNull: false,
            validate: {
                notEmpty: false
            }
        },
        price: {
            type: DataTypes.FLOAT,
            allowNull: false,
            validate: {
                notEmpty: false
            }
        },
        supplier: {
            type: DataTypes.INTEGER,
            allowNull: true,
            validate: {
                notEmpty: false
            }
        },
        category: {
            type: DataTypes.INTEGER,
            allowNull: true,
            validate: {
                notEmpty: false
            }
        },
    });

    console.log(Product);
    return Product;
};