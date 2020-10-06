"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Report extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      this.belongsTo(models.User, {
        foreignKey: "userID",
        onDelete: "CASCADE",
      });
    }
  }
  Report.init(
    {
      latitude: DataTypes.DOUBLE,
      longitude: DataTypes.DOUBLE,
      rainfall_rate: DataTypes.DOUBLE,
      flood_depth: DataTypes.DOUBLE,
    },
    {
      sequelize,
      modelName: "Report",
      timestampe: true,
    }
  );
  return Report;
};
