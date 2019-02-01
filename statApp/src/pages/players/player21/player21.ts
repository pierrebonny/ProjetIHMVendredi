import {IonicPage, NavController, NavParams} from 'ionic-angular';
import {Component, ViewChild} from '@angular/core';
import {Chart} from 'chart.js';
import {Player22Page} from "../player22/player22";

/**
 * Generated class for the Player21Page page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
    selector: 'page-player21',
    templateUrl: 'player21.html',
})
export class Player21Page {
    @ViewChild('doughnutCanvas') doughnutCanvas;
    @ViewChild('lineCanvas1') lineCanvas1;
    @ViewChild('ctx') ctx;
    @ViewChild('lineCanvasSpeed') lineCanvasSpeed;


    doughnutChart: any;
    lineChart: any;
    scatterChart: any;
    lineChartS: any;



    p3Pitch;
    p3Speed;
    p4Pitch;
    p4Speed;
    p34Position;

    constructor(public navCtrl: NavController, public navParams: NavParams) {
        this.p3Pitch = navParams.get('p3Pitch');
        this.p3Speed = navParams.get('p3Speed');
        this.p4Pitch = navParams.get('p4Pitch');
        this.p4Speed = navParams.get('p4Speed');
        this.p34Position = navParams.get('p34Position');
    }

    ionViewDidLoad() {
        console.log("p3Pitch : ");
        console.log(this.p3Pitch);
        console.log("p4Pitch : ");
        console.log(this.p4Pitch);

        console.log("connecter avant");
        this.connect();
        console.log("connecter apres");
    }

    connect() {
        let scalePitch = [];
        let reference = [];
        let scaleSpeed = [];

        for (let i = 1; i < this.p3Pitch.length + 1; i++) {
            scalePitch.push('.');
            reference.push(90);
        }
        for (let i=1; i<this.p3Speed.length+1; i++){
            scaleSpeed.push('.');
        }
        this.lineChart = new Chart(this.lineCanvas1.nativeElement, {

            type: 'line',
            data: {
                labels: scalePitch,
                datasets: [
                    {
                        label: "My First dataset",
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
                        data: this.p3Pitch,
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
                        data: this.p3Speed,
                        spanGaps: false,
                    }
                ]
            }
        });
        this.scatterChart = new Chart(this.ctx.nativeElement, {
            type: 'scatter',
            data: {
                datasets: [{
                    data: [{
                        x: 1,
                        y: 1
                    }, {
                        x: 3,
                        y: 7
                    }, {
                        x: 6,
                        y: 5
                    }, { // add same data as the first one, to draw the closing line
                        x: 1,
                        y: 1
                    }],
                    borderColor: 'black',
                    borderWidth: 1,
                    pointBackgroundColor: ['#000', '#00bcd6', '#d300d6'],
                    pointBorderColor: ['#000', '#00bcd6', '#d300d6'],
                    pointRadius: 5,
                    pointHoverRadius: 5,
                    fill: false,
                    tension: 0,
                    showLine: true
                }, {
                    data: [{
                        x: 3.5,
                        y: 4.5
                    }],
                    pointBackgroundColor: 'orange',
                    pointBorderColor: 'darkorange',
                    pointRadius: 10,
                    pointHoverRadius: 10
                }]
            },
            options: {
                legend: false,
                tooltips: false,
                scales: {
                    xAxes: [{
                        ticks: {
                            min: 0,
                            max: 10
                        },
                        gridLines: {
                            color: '#888',
                            drawOnChartArea: false
                        }
                    }],
                    yAxes: [{
                        ticks: {
                            min: 0,
                            max: 8,
                            padding: 10
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

    goTop4() {
        let data = {
            p3Pitch: this.p3Pitch,
            p3Speed: this.p3Speed,
            p4Pitch: this.p4Pitch,
            p4Speed: this.p4Speed,
            p34Position: this.p34Position
        }
        this.navCtrl.push(Player22Page, data);
    }


}