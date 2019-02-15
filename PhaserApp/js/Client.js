const ADDRESS = "10.212.111.96:8088";

/**
 * Client used to communicate with the server
 */
class Client {
    constructor() {
        fetch("http://localhost:8081/ipAdress", {
            method: 'GET'
        }).then((response) => response.json())
        .then((responseJson)=> {
            this.connectToServer(responseJson.ipAddress + ":8088");
        });
    }

    connectToServer(address) {
        this.socket = io.connect(address, {transports: ['websocket'], rejectUnauthorized: false});
        console.log("emit CONNECTION");
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

    listenAddTeam(callback) {
        this.socket.on("ADD_TEAM", (data) => {
            console.log("ADD_TEAM", data);
            callback(data.color);
        });
    }

    listenRemoveTeam(callback) {
        this.socket.on("REMOVE_TEAM", (data) => {
            console.log("REMOVE_TEAM", data);
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
            console.log("MOVE", data);
            callback(data);
        });
    }

    sendFinished(color, boatPositions, time) {
        console.log("send FINISH", {color: color, positions: boatPositions, time: time});
        this.socket.emit("FINISH", {color: color, positions: boatPositions, time: time});
    }
}
