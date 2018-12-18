var http = require('http');
var url = require('url');
var querystring = require('querystring');
var test = require('./test'); // Fait appel à test.js (même dossier)
//var test = require('../test'); // Fait appel à test.js (dossier parent)
//var test = require('test'); // Fait appel à test.js (sous-dossier node_modules)

var firstModule = require('firstModule');
firstModule.direBonjour();

var markdown = require('markdown').markdown;

console.log(markdown.toHTML('Un paragraphe en **markdown** !'));

var server = http.createServer(function(req, res) {
    var page = url.parse(req.url).pathname;
    console.log(page);
    
    var params = querystring.parse(url.parse(req.url).query);
    
    if (page == '/login') {
	    res.writeHead(200, {"Content-Type": "text/plain"});
	    if ('prenom' in params && 'nom' in params) {
	        res.write('Vous vous appelez ' + params['prenom'] + ' ' + params['nom']);
	    }
	    else {
	        res.write('Vous devez bien avoir un prénom et un nom, non ?');
	    }
	}
        
//    if (page == '/') {
//    	res.writeHead(200, {"Content-Type": "text/plain"});
//        res.write('Vous êtes à l\'accueil, que puis-je pour vous ?');
//    }
//    else if (page == '/sous-sol') {
//    	res.writeHead(200, {"Content-Type": "text/plain"});
//        res.write('Vous êtes dans la cave à vins, ces bouteilles sont à moi !');
//    }
//    else if (page == '/etage/1/chambre') {
//    	res.writeHead(200, {"Content-Type": "text/plain"});
//        res.write('Hé ho, c\'est privé ici !');
//    } else {
//    	res.writeHead(404, {"Content-Type": "text/plain"});
//    	res.write('Une erreur est survenue');
//    }
    
    res.end();
});

server.on('close', function() {
//    console.log("À la prochaine !");
	firstModule.direByeBye();
})

server.listen(8080);


server.close();