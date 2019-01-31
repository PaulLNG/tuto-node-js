'use strict';
module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define('User', {
    username: DataTypes.STRING,
    password: DataTypes.STRING,
    local_key: DataTypes.STRING , allowNull: true, defaultValue: null 
  }, {});
  User.associate = function(models) {
    // associations can be defined here
  };
  return User;
};
