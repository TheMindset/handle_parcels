'use strict';
module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define('User', {
    name: DataTypes.STRING,
    email: {
      type: DataTypes.STRING,
      validate: {
        isEmail: true,
        isUnique() {
          return Client.findOne({ 
            where: {email: this.email}
          }).then (email => {
            if (email) {
              throw new Error('Validation error: email already exist')
            }
          })
        }
      }
    },
    password: DataTypes.STRING
  }, {});
  User.associate = function(models) {
    // associations can be defined here
  };
  return User;
};