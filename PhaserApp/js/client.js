const ADDRESS = "10.212.111.96:8080";

/**
 * Client used to communicate with the server
 */
class Client {
    constructor() {
        this.connectToServer(ADDRESS);
    }

    connectToServer(address) {
        this.socket = io.connect(address, {transports: ['websocket'], rejectUnauthorized: false});
        console.log("emit CONNECTION")
        this.socket.emit("CONNECTION", {device: "Phaser"});
        this.getConnectionState();
    }

    getConnectionState() {
        this.socket.on("CONNECTION_STATE", (data) => {
            console.log("CONNECTION_STATE", data);
            if (data.status === 0) {
                this.connectToServer(ADDRESS);
            }
        });
    }

    listenTeam(callback) {
        this.socket.on("ADD_TEAM", (data) => {
            console.log("ADD_TEAM", data);
            callback(data.color);
        });
    }

    listenStart(callback) {
        this.socket.on("START", () => {
            console.log("START");
            callback();
        });
    }

    listenMovement(callback) {
        this.socket.on("MOVE", (data) => {
            console.log(data);
        });
        callback(data);
    }

    sendFinished(color) {
        console.log("send FINISH", {color: color});
        this.socket.emit("FINISH", {color: color});
    }
}