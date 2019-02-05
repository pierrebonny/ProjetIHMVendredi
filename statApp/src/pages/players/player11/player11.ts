import {Component, ViewChild} from '@angular/core';
import {IonicPage, ModalController, NavController, NavParams} from 'ionic-angular';
import {Player12Page} from "../player12/player12";
import {Chart} from 'chart.js';
import {PoiPage} from "../../poi/poi";

@IonicPage()
@Component({
    selector: 'page-player11',
    templateUrl: 'player11.html',
})
export class Player11Page {

    @ViewChild('doughnutCanvas') doughnutCanvas;
    @ViewChild('lineCanvas1') lineCanvas1;
    @ViewChild('lineCanvasSpeed') lineCanvasSpeed;
    @ViewChild('ctx') ctx;

    doughnutChart: any;
    lineChart: any;
    lineChartS: any;
    scatterChart: any;

    p1Pitch;
    p1Speed;
    p2Pitch;
    p2Speed;
    p12Position;
    p34Position;

    constructor(public navCtrl: NavController, public navParams: NavParams, public modalCtrl: ModalController) {
        this.p1Pitch = navParams.get('p1Pitch');
        this.p1Speed = navParams.get('p1Speed');
        this.p2Pitch = navParams.get('p2Pitch');
        this.p2Speed = navParams.get('p2Speed');
        this.p12Position = navParams.get('p12Position');
        this.p34Position = navParams.get('p34Position)');
    }

    ionViewDidLoad() {
        console.log("p1pitch : ");
        console.log(this.p1Pitch);
        console.log("p2pitch : ");
        console.log(this.p2Pitch);
        console.log("p12position : ");
        console.log(this.p12Position);
        for (let i=0; i<this.p12Position.length; i++){
            this.p12Position[i].y=970-this.p12Position[i].y;
        }
        console.log("positions 12 corrigées : ");
        console.log(this.p12Position);
        this.connect();
    }

    goTop2() {
        let data = {
            p1Pitch: this.p1Pitch,
            p1Speed: this.p1Speed,
            p2Pitch: this.p2Pitch,
            p2Speed: this.p2Speed,
            p12Position: this.p12Position
        };
        this.navCtrl.push(Player12Page, data);
    }


    connect() {
        let scalePitch = [];
        let scaleSpeed = [];
        let reference = [];
        for (let i = 1; i < this.p1Pitch.length + 1; i++) {
            scalePitch.push('.');
            reference.push(90);
        }
        for (let i = 1; i < this.p1Speed.length + 1; i++) {
            scaleSpeed.push('.');
        }
        this.lineChart = new Chart(this.lineCanvas1.nativeElement, {

            type: 'line',
            data: {
                labels: scalePitch,
                datasets: [
                    {
                        label: "Angle de la pagaie par rapport à l'optimal",
                        fill: false,
                        lineTension: 0.1,
                        backgroundColor: "rgba(75,192,192,0.4)",
                        borderColor: "rgba(75,192,192,1)",
                        borderCapStyle: 'butt',
                        borderDash: [],
                        borderDashOffset: 0.0,
                        borderJoinStyle: 'miter',
                        pointBorderColor: "rgba(75,192,192,1)",
                        pointBackgroundColor: "#fff",
                        pointBorderWidth: 1,
                        pointHoverRadius: 5,
                        pointHoverBackgroundColor: "rgba(75,192,192,1)",
                        pointHoverBorderColor: "rgba(220,220,220,1)",
                        pointHoverBorderWidth: 2,
                        pointRadius: 1,
                        pointHitRadius: 10,
                        data: this.p1Pitch,
                        spanGaps: false,
                    },
                    {
                        label: "Reference",
                        fill: false,
                        lineTension: 0.1,
                        borderColor: "rgba(255,0,0,1)",
                        borderCapStyle: 'butt',
                        borderDash: [],
                        borderDashOffset: 0.0,
                        borderJoinStyle: 'miter',
                        pointBorderColor: "rgba(255,0,0,1)",
                        pointBackgroundColor: "#fff",
                        pointBorderWidth: 1,
                        pointHoverRadius: 5,
                        pointHoverBackgroundColor: "rgba(255,0,0,1)",
                        pointHoverBorderColor: "rgba(220,220,220,1)",
                        pointHoverBorderWidth: 2,
                        pointRadius: 1,
                        pointHitRadius: 10,
                        data: reference,
                        spanGaps: false,
                    },
                ]
            }
        });
        this.lineChartS = new Chart(this.lineCanvasSpeed.nativeElement, {

            type: 'line',
            data: {
                labels: scaleSpeed,
                datasets: [
                    {
                        label: "Vitesse de la pagaie",
                        fill: false,
                        lineTension: 0.1,
                        backgroundColor: "rgba(75,192,192,0.4)",
                        borderColor: "rgba(75,192,192,1)",
                        borderCapStyle: 'butt',
                        borderDash: [],
                        borderDashOffset: 0.0,
                        borderJoinStyle: 'miter',
                        pointBorderColor: "rgba(75,192,192,1)",
                        pointBackgroundColor: "#fff",
                        pointBorderWidth: 1,
                        pointHoverRadius: 5,
                        pointHoverBackgroundColor: "rgba(75,192,192,1)",
                        pointHoverBorderColor: "rgba(220,220,220,1)",
                        pointHoverBorderWidth: 2,
                        pointRadius: 1,
                        pointHitRadius: 10,
                        data: this.p1Speed,
                        spanGaps: false,
                    }
                ]
            }
        });
        this.scatterChart = new Chart(this.ctx.nativeElement, {
            type: 'scatter',
            data: {
                datasets: [{
                    label: "Trajectoire du kayak",
                    data: this.p12Position,
                    borderColor: 'black',
                    borderWidth: 1,
                    pointRadius: 5,
                    pointHoverRadius: 5,
                    fill: false,
                    tension: 0,
                    showLine: true
                }]
            },
            options: {
                legend: false,
                tooltips: false,
                scales: {
                    xAxes: [{
                        ticks: {
                            min: 0,
                            max: 1920,
                            padding: 50
                        },
                        gridLines: {
                            color: '#888',
                            drawOnChartArea: false
                        }
                    }],
                    yAxes: [{
                        ticks: {
                            min: 455,
                            max: 730,
                            padding: 50
                        },
                        gridLines: {
                            color: '#888',
                            drawOnChartArea: false
                        }
                    }]
                }
            }
        });
    }

    openPoi(){
        let obj = {speed: this.p12Position, position: this.p12Position, positionOther: this.p12Position};
        let myModal = this.modalCtrl.create(PoiPage, obj);
        myModal.present();
    }

}
