import {Component} from '@angular/core';
import {IonicPage, NavController, NavParams} from 'ionic-angular';
import {HistoryPage} from "../history/history";
import {Socket} from "ng-socket-io";
import {Player11Page} from "../players/player11/player11";
import {Player21Page} from "../players/player21/player21";


/**
 * Generated class for the SelectPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
    selector: 'page-select',
    templateUrl: 'select.html',
})
export class SelectPage {

    isenabled: boolean = false;
    winner = ''; //color
    p1Pitch = [];
    p1Speed = [];
    p2Pitch = [];
    p2Speed = [];
    p3Pitch = [];
    p3Speed = [];
    p4Pitch = [];
    p4Speed = [];
    p12Position = [];
    p34Position = [];
    allFinished = 0;

    constructor(public navCtrl: NavController, public navParams: NavParams, private socket: Socket) {
        this.socket.on("CONNECTION_STATE", (data) => {
            console.log("CONNECTION_STATE", data);
            if (data.status === 0) {
                console.log("status = 0 !");
            }
        });
        this.socket.on("ADD_TEAM", (data) => {
            console.log(data.color);
        });

        this.socket.on("MOVE", (data) => {
            console.log("on reçoit un move" + data.id);
            switch (data.id) {
                case 1: {
                    this.p1Speed.push(data.speed);
                    this.p1Pitch.push(data.pitch);
                    break;
                }
                case 2: {
                    this.p2Speed.push(data.speed);
                    this.p2Pitch.push(data.pitch);
                    break;
                }
                case 3: {
                    this.p3Speed.push(data.speed);
                    this.p3Pitch.push(data.pitch);
                    break;
                }
                case 4: {
                    this.p4Speed.push(data.speed);
                    this.p4Pitch.push(data.pitch);
                    break;
                }
            }
        });
        this.socket.on("FINISH", (data) => {
            if (this.allFinished == 1){
                this.enable();
            }
            this.allFinished = 1;
            if (data.color == "blue") {
                for (let i = 0; i < data.positions.length; i++) {
                    this.p12Position.push({x: data.positions[i].x, y: data.positions[i].y});
                }
            } else if (data.color == "red") {
                for (let i = 0; i < data.positions.length; i++) {
                    this.p34Position.push({x: data.positions[i].x, y: data.positions[i].y});
                }
            }
        });

    }

    ionViewDidLoad() {
        this.socket.connect();
        this.socket.emit("CONNECTION", {device: "Stats"});
    }

    enable() {
        this.isenabled = true;
    }

    goToHistory() {
        this.navCtrl.push(HistoryPage);
    }

    goToTeam1() {
        console.log("p12 : ");
        console.log(this.p12Position);
        let data = {
            p1Pitch: this.p1Pitch,
            p1Speed: this.p1Speed,
            p2Pitch: this.p2Pitch,
            p2Speed: this.p2Speed,
            p12Position: this.p12Position,
            p34Position: this.p34Position
        };
        this.navCtrl.push(Player11Page, data);
    }

    goToTeam2() {
        console.log("p34 : ");
        console.log(this.p34Position);
        let data = {
            p3Pitch: this.p3Pitch,
            p3Speed: this.p3Speed,
            p4Pitch: this.p4Pitch,
            p4Speed: this.p4Speed,
            p12Position: this.p12Position,
            p34Position: this.p34Position
        };
        this.navCtrl.push(Player21Page, data);
    }
}
