const express = require('express');
const app = express();
const server = require('http').Server(app);
require('socket.io').listen(server);

app.use('/css', express.static(__dirname + '/css'));
app.use('/js', express.static(__dirname + '/js'));
app.use('/assets', express.static(__dirname + '/assets'));
app.use('/lib', express.static(__dirname + '/lib'));

const fs = require('fs');
let address;
if(process.env.server) {
    address = process.env.server;
    fs.writeFile('./serverIpAdress.txt', address, function (err) {
        if (err) throw err;
    });
}
else {
    address = checkTxtFile();
}
console.log("address " + address);
app.get('/',function(req, res) {
    res.sendFile(__dirname+'/index.html');
});
app.get('/ipAdress',function(req, res) {

});
server.listen(process.env.PORT || 8081, function(){
    console.log('Listening on ' + server.address().port);
});

function checkTxtFile() {
    try {
        return fs.readFileSync('./serverIpAdress.txt', "utf8");
    } catch (e) {
        return "localhost"
    }
}
