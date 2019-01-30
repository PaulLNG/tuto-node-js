const Sequelize = require('sequelize');


module.exports = (sequelize, DataTypes) => {
	  return sequelize.define("piscine", {
		  ville: {
			    type: Sequelize.STRING
			  },
			  nom: {
			    type: Sequelize.STRING
			  },
			  directeur: {
				    type: Sequelize.STRING
				  }
	  })
	}

