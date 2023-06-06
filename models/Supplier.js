module.exports = (sequelize, DataTypes) => {
    const Supplier = sequelize.define('supplier', {
        id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            validate: {
                notEmpty: false
            },
        },
      
        name: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                notEmpty: false
            },
        },
      
        corporate_id: {
            type: DataTypes.STRING,
            allowNull: true,
            validate: {
                notEmpty: true
            },
        }
      });

    return Supplier;
};