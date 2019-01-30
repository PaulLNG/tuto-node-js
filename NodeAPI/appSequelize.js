//L'application requiert l'utilisation du module Express.
//La variable express nous permettra d'utiliser les fonctionnalités du module Express.  
var express = require('express'); 
// Nous définissons ici les paramètres du serveur.
var hostname = 'localhost'; 
var port = 3000; 

// Nous créons un objet de type Express. 
var app = express(); 
 
var bodyParser = require("body-parser"); 
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

const Sequelize = require('sequelize');
const sequelize = new Sequelize('nodeapi', 'root', 'root', {
  host: 'localhost',
  dialect: 'mysql',
  operatorsAliases: false,

  pool: {
    max: 5,
    min: 0,
    acquire: 30000,
    idle: 10000
  },
  
});


//Or you can simply use a connection uri
//const sequelize = new Sequelize('postgres://user:pass@example.com:5432/dbname');

//TEST CONNEXION BDD
sequelize
.authenticate()
.then(() => {
  console.log('Connection has been established successfully.');
})
.catch(err => {
  console.error('Unable to connect to the database:', err);
});

//MODEL BDD

// On déclare on objet Piscine avec ses attributs
const Piscine = sequelize.define('piscine', {
	  ville: {
	    type: Sequelize.STRING
	  },
	  nom: {
	    type: Sequelize.STRING
	  },
	  directeur: {
		    type: Sequelize.STRING
		  }
	});

//// force: true will drop the table if it already exists
//Piscine.sync({force: true}).then(() => {
//  // Table created
//  return Piscine.create({
//    ville: 'Paris',
//    nom: 'La Piscine DE PARIS',
//    directeur : 'Paul LANGE'
//  });
//});


// FIN MODEL BDD	
	
// Déclaration d'un objet "post" nommé "Post" , nous pouvons ajouter des options comme timestamps a cet objet
const Post = sequelize.define('post', {}, {
  timestamps: true // timestamps will now be true
});
	

////Afin de faciliter le routage (les URL que nous souhaitons prendre en charge dans notre API), nous créons un objet Router.
////C'est à partir de cet objet myRouter, que nous allons implémenter les méthodes. 
var myRouter = express.Router(); 
//
myRouter.route('/')
//all permet de prendre en charge toutes les méthodes. 
.all(function(req,res){ 
  res.json({message : "Bienvenue sur notre Frugal API ", methode : req.method});
});

// Je vous rappelle notre route (/piscines).  
myRouter.route('/piscines')
// J'implémente les méthodes GET, PUT, UPDATE et DELETE
// GET
.get(function(req,res){ 
	res.json({
		 message : "Liste les piscines de Lille Métropole avec paramètres :",
		 ville : req.query.ville,
		 nbResultat : req.query.maxresultat, 
		 methode : req.method });
	
	let ville = req.query.ville;
	
	Piscine.findAll().then(piscines => {
		  console.log(piscines)
		})
	
	Piscine.findOne().then(piscine => {
		  console.log(piscine.get('nom'));
		});

})
//POST
.post(function(req,res){
	  res.json({message : "Ajoute une nouvelle piscine à la liste", 
	  nom : req.body.nom, 
	  ville : req.body.ville, 
	  directeur : req.body.directeur,
	  methode : req.method});
	  
	
	  
		let ville = req.body.ville;
		let nom = req.body.nom;
		let directeur = req.body.directeur;
		
		Piscine.sync().then(() => {
		  // Table created if table not exist (Piscine est l'objet piscine defini plus haut , lors de la création la table prend le nom de "PISCINES" 
		  // avec l'objet user la table porterais le nom "USERS"
		  return Piscine.create({
		    ville: ville,
		    nom: nom ,
		    directeur : directeur
		  });
		});
})
.delete(function(req , res){
	res.json({message : "Suppresion d'une piscine selon son ID", 
		  id : req.body.id,
		  methode : req.method});
	
	let id = req.body.id;
	
	Piscine.destroy({
	  where: {
	    id: id
	  }
	});
// DELETE FROM piscine WHERE id = id récupéré dans la requête
})
.put(function(req , res) {
	res.json({message : "Suppresion d'une piscine selon son ID", 
		  id : req.body.id ,
		  nom : req.body.nom, 
		  ville : req.body.ville, 
		  directeur : req.body.directeur,
		  methode : req.method});
	
	let ville = req.body.ville;
	let nom = req.body.nom;
	let directeur = req.body.directeur;
	let id = req.body.id;
	
	Piscine.update({
		ville : ville ,
		nom : nom ,
		directeur : directeur ,
		} , {
		where: 
		{ 
			id : id
			
		}
	});
});

//Nous demandons à l'application d'utiliser notre routeur
app.use(myRouter);  

//// Démarrer le serveur 
app.listen(port, hostname, function(){
	console.log("Mon serveur fonctionne sur http://"+ hostname +":"+port); 
});
