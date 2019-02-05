import {IonicPage, NavController, NavParams} from 'ionic-angular';
import {Component, ViewChild} from '@angular/core';
import {Chart} from 'chart.js';
/**
 * Generated class for the Player22Page page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-player22',
  templateUrl: 'player22.html',
})
export class Player22Page {

    @ViewChild('doughnutCanvas') doughnutCanvas;
    @ViewChild('lineCanvas1') lineCanvas1;
    @ViewChild('ctx') ctx;
    @ViewChild('lineCanvasSpeed') lineCanvasSpeed;


    doughnutChart: any;
    lineChart: any;
    lineChartS: any;
    scatterChart: any;


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
        let scaleSpeed = [];

        let scalePitch = [];
        let reference = [];
        for (let i = 1; i < this.p4Pitch.length + 1; i++) {
            scalePitch.push('.');
            reference.push(90);
        }
        for (let i=1; i<this.p4Speed.length+1; i++){
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
                        data: this.p4Pitch,
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
                        data: this.p4Speed,
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
                    data: this.p34Position,
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
                            min: 0,
                            max: 400,
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
}
