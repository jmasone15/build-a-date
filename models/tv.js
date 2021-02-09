module.exports = function (sequelize, DataTypes) {
  let Tv = sequelize.define("Tv", {
    // The email cannot be null, and must be a proper email before creation
    title: {
      type: DataTypes.STRING,
    },
    year: {
      type: DataTypes.INTEGER,
    },
    IMDB: {
      type: DataTypes.DOUBLE,
    },
    Netflix: {
      type: DataTypes.BOOLEAN,
    },
    Hulu: {
      type: DataTypes.BOOLEAN,
    },
    Prime: {
      type: DataTypes.BOOLEAN,
    },
    Disney: {
      type: DataTypes.BOOLEAN,
    },

  });
  return Tv;
};