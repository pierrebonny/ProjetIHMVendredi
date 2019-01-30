import {Component, ViewChild} from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import {Chart} from 'chart.js';


/**
 * Generated class for the Player12Page page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-player12',
  templateUrl: 'player12.html',
})
export class Player12Page {

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

    constructor(public navCtrl: NavController, public navParams: NavParams) {
        this.p1Pitch = navParams.get('p1Pitch');
        this.p1Speed = navParams.get('p1Speed');
        this.p2Pitch = navParams.get('p2Pitch');
        this.p2Speed = navParams.get('p2Speed');
        this.p12Position = navParams.get('p12Position');
    }

    ionViewDidLoad() {
        console.log("p1pitch : ");
        console.log(this.p1Pitch);
        console.log("p2pitch : ");
        console.log(this.p2Pitch);

        console.log("connecter avant");
        this.connect();
        console.log("connecter apres");
    }
    connect(){
        let scalePitch = [];
        let reference = [];
        let scaleSpeed = [];

        for (let i=1; i<this.p2Pitch.length+1; i++){
            scalePitch.push('.');
            reference.push(90);
        }
        for (let i=1; i<this.p2Speed.length+1; i++){
            scaleSpeed.push('.');
        }
        this.lineChart = new Chart(this.lineCanvas1.nativeElement, {

            type: 'line',
            data: {
                labels: scalePitch,
                datasets: [
                    {
                        label: "Angle de la pagaie par rapport à l'optimale",
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
                        data: this.p2Pitch,
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
                        data: this.p2Speed,
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

}
