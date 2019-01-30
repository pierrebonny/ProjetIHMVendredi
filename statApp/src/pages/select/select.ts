import {Component, ViewChild} from '@angular/core';
import {IonicPage, NavController, NavParams} from 'ionic-angular';
import {HistoryPage} from "../history/history";
import {TabsPage} from "../tabs/tabs";
import {TabsTeam2Page} from "../tabs-team2/tabs-team2";
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
    teamOne = ''; //color
    teamTwo = ''; //color
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

    constructor(public navCtrl: NavController, public navParams: NavParams, private socket: Socket) {
        this.socket.on("CONNECTION_STATE", (data) => {
            console.log("CONNECTION_STATE", data);
            if (data.status === 0) {
                console.log("status = 0 !");
            }
        });
        this.socket.on("ADD_TEAM", (data) => {
            if (this.teamOne === '') {
                this.teamOne = data.color;
            } else {
                this.teamTwo = data.color;
            }
            console.log(data.color);
        });
        this.socket.on("MOVE", (data) => {
            console.log(data.id);
            switch (data.id) {
                case 1: {
                    console.log("on est la");
                    this.p1Speed.push(data.speed);
                    this.p1Pitch.push(data.pitch);
                    //this.p12Position.push("");
                    break;
                }
                case 2: {
                    console.log("on est aussi la");
                    this.p2Speed.push(data.speed);
                    this.p2Pitch.push(data.pitch);
                    break;
                }
                case 3: {
                    this.p3Speed.push(data.speed);
                    this.p3Pitch.push(data.pitch);
//                  this.p34Position.push("");
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
            this.winner = data.color; //mettre "les gagnats sont les ...color"
            this.enable();
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
        let data = {p1Pitch: this.p1Pitch, p1Speed: this.p1Speed, p2Pitch: this.p2Pitch, p2Speed: this.p2Speed, p12Position: this.p12Position}
        this.navCtrl.push(Player11Page, data);
    }

    goToTeam2() {
        let data = {p3Pitch: this.p3Pitch, p3Speed: this.p3Speed, p4Pitch: this.p4Pitch, p4Speed: this.p4Speed, p34Position: this.p34Position}
        this.navCtrl.push(Player21Page, data);
    }
}
