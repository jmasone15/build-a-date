module.exports = function (sequelize, DataTypes) {
    let Date = sequelize.define("Date", {
        movie: {
            type: DataTypes.STRING
        },
        day: {
            type: DataTypes.DATEONLY
        },
        tv: {
            type: DataTypes.STRING
        },
        recipe: {
            type: DataTypes.STRING
        },
        restaurant: {
            type: DataTypes.STRING
        },
        adventure: {
            type: DataTypes.STRING
        },
        stayIn: {
            type: DataTypes.BOOLEAN
        },
        goOut: {
            type: DataTypes.BOOLEAN
        },
        completed: {
            type: DataTypes.BOOLEAN,
            defaultValue: false
        }
    });

    Date.associate = function (models) {
        Date.belongsTo(models.User, {
            foreignKey: {
                allowNull: false
            }
        });
    }
    return Date;
};