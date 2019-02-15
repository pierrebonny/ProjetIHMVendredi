const express = require('express');
const app = express();
const server = require('http').Server(app);
require('socket.io').listen(server);

app.use('/js', express.static(__dirname + '/js'));
app.use('/assets', express.static(__dirname + '/assets'));
app.use('/lib', express.static(__dirname + '/lib'));

const fs = require('fs');
let address;
if(process.argv.length === 3) {
    address = process.argv.slice(2)[0];
    fs.writeFile('./serverIpAdress.txt', address, function (err) {
        if (err) throw err;
    });
}
else {
    address = checkTxtFile();
}

app.get('/',function(req, res) {
    res.sendFile(__dirname+'/index.html');
});
app.get('/ipAdress',function(req, res) {
    res.json({ipAddress: address})
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
