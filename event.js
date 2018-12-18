var http = require('http');
var url = require('url');
var querystring = require('querystring');
var EventEmitter = require('events').EventEmitter;

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
    
    res.end();
});

var jeu = new EventEmitter();

jeu.on('gameover', function(message){
    console.log(message);
});

jeu.on('nouveaujoueur', function(nom , age){
    console.log(nom + " a " + age + " ans");
});

jeu.emit('gameover', 'Vous avez perdu !');
jeu.emit('nouveaujoueur', 'Paul', 21); 

server.on('close', function() {
    console.log("À la prochaine !");
})

server.listen(8080);


server.close();