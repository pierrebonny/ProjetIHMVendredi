import {Component, ViewChild} from '@angular/core';
import {IonicPage, NavController, NavParams, Platform} from 'ionic-angular';

import {Chart} from 'chart.js';
import {Socket} from 'ng-socket-io';

/**
 * Generated class for the StatPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
    selector: 'page-stat',
    templateUrl: 'stat.html',
})
export class StatPage {

    @ViewChild('doughnutCanvas') doughnutCanvas;
    @ViewChild('lineCanvas1') lineCanvas1;
    @ViewChild('ctx') ctx;


    team = "1";

    doughnutChart: any;
    lineChart: any;
    scatterChart: any;

    pitchs = [];
    touch = [0,0];//true,false
    firstTeam = undefined;
    secondTeam = undefined;


    constructor(public navCtrl: NavController, public navParams: NavParams, private socket: Socket) {
        this.socket.on("CONNECTION_STATE", (data) => {
            console.log("CONNECTION_STATE", data);
            if (data.status === 0) {
                console.log("status = 0 !");
            }
        });
        this.socket.on("ADD_TEAM", (data) => {
            if(this.firstTeam == undefined){
                this.firstTeam = data.color;
            }else {
                this.secondTeam = data.color;
            }
        });
        this.socket.on("MOVE", (data) => {
            this.pitchs.push(data.pitch);
            if(data.touch === true){
                this.touch[0] = this.touch[0]+1;
            }else if(data.touch === false){
                this.touch[1]=this.touch[1]+1;
            }
        });
        this.socket.on("FINISH", (data) => {
            console.log(data.color);
            this.connect();
        });
    }

    connect(){
        this.doughnutChart = new Chart(this.doughnutCanvas.nativeElement, {

            type: 'doughnut',
            data: {
                labels: ["Touchés", "Manqués"],
                datasets: [{
                    label: '# of touches',
                    data: this.touch,
                    backgroundColor: [
                        'rgba(255, 99, 132, 0.8)',
                        'rgba(0, 128, 0, 0.8)'
                    ],
                    hoverBackgroundColor: [
                        "#FF6384",
                        "#36A2EB",
                        "#FFCE56",
                        "#FF6384",
                        "#36A2EB",
                        "#FFCE56"
                    ]
                }]
            }

        });

        this.lineChart = new Chart(this.lineCanvas1.nativeElement, {

            type: 'line',
            data: {
                labels: ["January", "February", "March", "April", "May", "June", "July", "aug"],
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
                        data: this.pitchs,
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
                        data: [90, 90, 90, 90, 90, 90, 90, 90],
                        spanGaps: false,
                    },
                ]
            }
        });
        //this.lineChart = new Chart(this.lineCanvas1.nativeElement, {
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
    ionViewDidLoad() {
        this.socket.connect();
        this.socket.emit("CONNECTION", {device: "Stats"});

    }

    segmentChanged(ev: any) {
        console.log('Segment changed', ev);
    }


}
