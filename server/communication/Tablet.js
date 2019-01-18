const express = require('express');
class Tablet {

    initiateCRUDServer(){

        const app = express();

        app.get('/getRaceData', function (req, res) {
            res.json({data: 'Hello World!'});
        });

        app.listen(3333, function () {
            console.log('Example app listening on port 3333!')
        });
    }
}

module.exports = Tablet;
