const express = require('express');
const app = express();
const server = require('http').Server(app);
require('socket.io').listen(server);

app.use('/css', express.static(__dirname + '/css'));
app.use('/js', express.static(__dirname + '/js'));
app.use('/assets', express.static(__dirname + '/assets'));
app.use('/lib', express.static(__dirname + '/lib'));

app.get('/',function(req, res) {
    res.sendFile(__dirname+'/index.html');
});

server.listen(process.env.PORT || 8081, function(){
    console.log('Listening on ' + server.address().port);
});