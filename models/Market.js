module.exports = (sequelize, DataTypes) => {
    const Market = sequelize.define('market', {

        id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            validate: {
                notEmpty: false
            },
        },
      
        name: {
            type: DataTypes.STRING,
            allowNull: true,
            validate: {
                notEmpty: true
            },
        },
      
        cnpj: {
            type: DataTypes.STRING,
            allowNull: true,
            validate: {
                notEmpty: true
            },
        }
      });

    return Market;
};