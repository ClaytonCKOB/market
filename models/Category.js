module.exports = (sequelize, DataTypes) => {
    const Category = sequelize.define('category', {

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
        }
      });

    return Category;
};