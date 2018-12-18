var express = require('express');

var app = express();

app.get('/', function(req, res) {
    res.setHeader('Content-Type', 'text/plain');
    res.send('Vous êtes à l\'accueil');
    res.status(404).send('Page introuvable !');
});

app.get('/etage/:etagenum/chambre', function(req, res) {
    
//	if(typeof req.params.etagenum === 'number' )
//    	{
//    	res.writeHead(200 , {"Content-Type": "text/plain"});
//    	res.end('Vous êtes à la chambre de l\'étage n°' + req.params.etagenum);
//    	}
//    else
//    	{
//    	res.writeHead(404 , {"Content-Type": "text/html"});
//    	res.write('Une erreur est survenue');
//    	}
	
	res.render('chambre.html.twig', {etage: req.params.etagenum});
});


app.get('/compter/:nombre', function(req, res) {
    var noms = ['Robert', 'Jacques', 'David'];
    res.render('page.html.twig', {compteur: req.params.nombre, noms: noms});
});

app.listen(8080);