const Sequelize = require('sequelize');


module.exports = (sequelize, DataTypes) => {
	  return sequelize.define("piscine", {
		  username: {
			    type: Sequelize.STRING
			  },
		  password: {
		    type: Sequelize.STRING
		  },
		  local_key: {
			    type: Sequelize.STRING , allowNull: true, defaultValue: null 
			  }
	  })
	}

