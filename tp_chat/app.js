var http = require('http');
var fs = require('fs');
var ent = require('ent');// Permet de bloquer les caractères HTML (sécurité équivalente à htmlentities en PHP)

// Chargement du fichier index.html affiché au client
var server = http.createServer(function(req, res) {
    fs.readFile('./index.html', 'utf-8', function(error, content) {
        res.writeHead(200, {"Content-Type": "text/html"});
        res.end(content);
    });
});

// Chargement de socket.io
var io = require('socket.io').listen(server);

// Quand un client se connecte, on le note dans la console
//io.sockets.on('connection', function (socket) {
//    console.log('Un client est connecté !');
//});

io.sockets.on('connection', function (socket) {
    socket.emit('message', 'Vous êtes bien connecté !');
    socket.broadcast.emit('message', 'Un autre client vient de se connecter !');
    
 // Quand le serveur reçoit un signal de type "message" du client    
//    socket.on('message', function (message) {
//        console.log('Un client me parle ! Il me dit : ' + message);
//    });	
    
//    var readimage = require("readimage");
//    
//    var filedata = fs.readFileSync("Jellyfish.jpg");
//     
//    readimage(filedata, function (err, image) {
//      if (err) {
//        console.log("failed to parse the image")
//        console.log(err)
//      }
//      socket.emit("imageSend" , image);
//      console.log(image);
//    });
    
    socket.on('newUser', function(pseudo) {
    	pseudo = ent.encode(pseudo);
        socket.pseudo = pseudo;
        socket.broadcast.emit('newUserTchat'," <p> <em> " + pseudo + ' a rejoint le tchat </em> </p>');
        
//      console.log(socket.pseudo + ' se connecte au tchat!');
    });
    
    socket.on('sendMessage', function (message) {
    	var message = ent.encode(message);
    	console.log(message);
    	socket.broadcast.emit('viewMessageForOther', '<p> <em>' + socket.pseudo + ' : ' + message + '</em> </p>');
    	
    	// On envoi le pseudo enregistré en session (donc le pseudo actuel) ainsi que le message en paramètre 
    	socket.emit('viewMessageForUser', { pseudo: socket.pseudo , message: message });
    	
//    	console.log(socket.pseudo + ' dit : ' + message);
    });
    
    socket.on('disconnect', function() {
    	socket.broadcast.emit('userLeave', '<p> <em>' + socket.pseudo + ' est parti...</em> </p>');
    });
    
    socket.on('changePseudo', function(newPseudo) {
    	var oldPseudo = socket.pseudo;
    	// On enregistre le new Pseudo en session
    	socket.pseudo = newPseudo;
    	socket.broadcast.emit('changePseudoText', '<p> <em>' + oldPseudo + ' s\'est renommé en ' + newPseudo + '</em> </p>');
    	console.log(socket.pseudo);
    	
    });
    
    socket.on('dingding', function(newPseudo) {
    	// $ mplayer foo.mp3 
    
    player.play('./son.wav', function(err){
      if (err) throw err
    })
    
    });
    
    
    
});


server.listen(8080);

