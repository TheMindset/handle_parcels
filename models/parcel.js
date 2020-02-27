'use strict';
module.exports = (sequelize, DataTypes) => {
  const Parcel = sequelize.define('Parcel', {
    type: {
      type: DataTypes.STRING,
      validate: {
        isIn: {
          args: [['CLASSIC', 'EXPRESS']],
          msg: "Type must be between CLASSIC and EXPRESS"
        } 
      }
    },
    weight: DataTypes.FLOAT,
    volume: DataTypes.FLOAT,
    recipient: DataTypes.STRING,
    address: DataTypes.STRING,
    city: DataTypes.STRING,
    zipcode: DataTypes.STRING
  }, {});
  Parcel.associate = function(models) {
    // associations can be defined here
  };
  return Parcel;
};