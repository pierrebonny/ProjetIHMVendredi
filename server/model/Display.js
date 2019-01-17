class Display {
    constructor(socket){
        this.socket = socket;
    }

    getSocket(){
        return this.socket;
    }
}
module.exports = Display;
