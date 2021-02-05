module.exports = function (sequelize, DataTypes) {
    let Movies = sequelize.define("Movies", {
        // The email cannot be null, and must be a proper email before creation
        title: {
            type: DataTypes.STRING
        },
        year: {
            type: DataTypes.INTEGER
        },
        IMDb: {
            type: DataTypes.DOUBLE
        },
        netflix: {
            type: DataTypes.BOOLEAN
        },
        hulu: {
            type: DataTypes.BOOLEAN
        },
        prime_video: {
            type: DataTypes.BOOLEAN
        },
        disney_plus:{
            type: DataTypes.BOOLEAN
        },
        genres: {
            type: DataTypes.STRING
        },
        runtime: {
            type: DataTypes.INTEGER
        }
    });
    return Movies;
};