module.exports = (sequelize, DataTypes) => {
    const Category = sequelize.define('category', {

        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
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
        }
      });

    return Category;
};