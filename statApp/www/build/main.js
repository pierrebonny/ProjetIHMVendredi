webpackJsonp([5],{

/***/ 110:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return HistoryPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(22);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__sample_modal_sample_modal__ = __webpack_require__(111);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};




/**
 * Generated class for the HistoryPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */
var HistoryPage = /** @class */ (function () {
    function HistoryPage(navCtrl, navParams, modalCtrl) {
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.modalCtrl = modalCtrl;
    }
    HistoryPage.prototype.ionViewDidLoad = function () {
        console.log('ionViewDidLoad HistoryPage');
    };
    HistoryPage.prototype.openModal = function (title, text, img) {
        var obj = { title: title, text: text, img: img };
        var myModal = this.modalCtrl.create(__WEBPACK_IMPORTED_MODULE_2__sample_modal_sample_modal__["a" /* SampleModalPage */], obj);
        myModal.present();
    };
    HistoryPage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["m" /* Component */])({
            selector: 'page-history',template:/*ion-inline-start:"D:\ProjetIHMVendredi\statApp\src\pages\history\history.html"*/'<link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.2.1/css/bootstrap.min.css"\n      integrity="sha384-GJzZqFGwb1QTTN6wy59ffF1BuGJpLSa9DkKMp0DgiMDm4iYMj70gZWKYbI706tWS" crossorigin="anonymous">\n\n\n<ion-header>\n\n    <ion-navbar>\n        <ion-title>Histoire du sport</ion-title>\n    </ion-navbar>\n\n</ion-header>\n\n\n<ion-content padding>\n    <div class="row">\n        <div class="col-sm" style="text-align: center; color: #FF7F50">\n            <button (click)="openModal(\'XVIIIe siècle\',\'Le terme de canoë tire son origine du langage des Indiens d Amérique du Nord (XVIIIe siècle) mais serait issu de l espagnol canoa. Ces Indiens construisaient des embarcations dans des troncs d arbres pour se déplacer plus aisément sur les rivières au lieu d avoir à traverser des forêts très denses. Ces embarcations étaient fortes utiles lors des voyages vers des lieux de marchandages mais aussi pour la pratique de la chasse, de la pêche ou lors des guerres. \', \'../../assets/imgs/history/18e.jpg\')">\n                <p>XVIIIe siècle</p>\n            </button>\n        </div>\n        <div class="col-sm" style="text-align: center; color: #FF7F50">\n            <button (click)="openModal(\'1850\',\'La pratique de ce sport dans la culture occidentale fut introduite par John MacGrégor durant la seconde moitié du XIXe siècle. John MacGregor (1825-1892), surnommé « Rob Roy », est un avocat, explorateur, écrivain et philanthrope écossais. Il est souvent considéré comme le créateur des premiers canoë à voile, et comme la personne qui a popularisé la pratique sportive du canoë en Europe et aux États-Unis. En 1866, il a fondé le Royal Canoe Club (en) (RCC) britannique, premier club de canoë-kayak du monde. Il était également artiste et il a dessiné toutes les illustrations de ses livres de voyage.\', \'../../assets/imgs/history/1850.jpg\')">\n                <p>1850</p>\n            </button>\n        </div>\n        <div class="col-sm" style="text-align: center; color: #FF7F50">\n            <button (click)="openModal(\'1865\',\'La pratique sportive du canoë-kayak en eau calme a vue le jour en Angleterre en 1865. Ce sport s’est ensuite répandu en France (1869) et en Amérique du Nord (1871).\', \'../../assets/imgs/history/1865.jpg\')">\n                <p>1865</p>\n            </button>\n        </div>\n        <div class="col-sm" style="text-align: center; color: #FF7F50">\n            <button (click)="openModal(\'1924\',\'C est au XXe siècle, et plus précisément en 1924, qu est créée la Fédération internationale de canoë. Les compétitions s enchaînent : le premier championnat d Europe a lieu en 1933 et le premier championnat du monde en 1938. Ce sport devient une épreuve officielle des jeux olympiques de Berlin en 1936.\', \'../../assets/imgs/history/1924.jpg\')">\n                <p>1924</p>\n            </button>\n        </div>\n        <div class="col-sm" style="text-align: center; color: #FF7F50">\n            <button (click)="openModal(\'De nos jours\',\'De nos jours il existe enormément de variantes dans la pratique du canoe-kayak : En eau vive (le Slalom, la Descente, le Freestyle (ou rodéo), le Rafting, la Haute-rivière), en eau calme (La Course en ligne, le Marathon, le Paracanoë, le Kayak-polo, le Dragon Boat, la Randonnée), en mer (L Ocean Racing (ou Merathon), la Vaa (ou pirogue polynésienne), le Wave-ski, le Kayak de mer (randonnée)). Il existe aujourdhui des millions de licenciés à travers le monde.\', \'../../assets/imgs/history/dnj.jpg\')">\n                <p>De nos jours</p>\n            </button>\n        </div>\n    </div>\n    <br>\n    <hr width="100%" color="white" size="4" style="background-color: white; color: #000;">\n    <br>\n    <div class="row" style="padding-top: 5%">\n        <div class="col" style="background-color: white;">\n            <p style="font-size: 25px; text-align: center;">Description</p>\n            <p style="font-size: 20px; text-align: center;">Un canoë est une embarcation ouverte dirigée en position à\n                genoux avec une pagaie simple.\n                Le terme de kayak vient du langage des esquimaux : il désigne une petite embarcation de pêche, faite de\n                peaux de phoque tendues sur une légère carcasse de bois et manœuvrée à la pagaie. Ces pagaies servent à\n                propulser, diriger et équilibrer l\'embarcation. Un kayak est une embarcation fermée dirigée en position\n                assise avec une pagaie double.</p>\n        </div>\n        <div class="col">\n            <p style="font-size: 25px; text-align: center;">Règles de sécurité</p>\n            <ul style="font-size: 20px; text-align: center;">\n                <li>Utiliser un équipement adapté</li>\n                <li>Une embarcation conforme</li>\n                <li>Renforcer sa condition physique</li>\n                <li>Anticiper l’environnement et le contexte</li>\n                <li>Ne jamais partir seul</li>\n            </ul>\n        </div>\n    </div>\n    <div class="row">\n        <div class="col" style="text-align: center;">\n            <img src="../../assets/imgs/history/col1.jpg">\n        </div>\n        <div class="col" style="text-align: center;">\n            <img src="../../assets/imgs/history/col2.jpg" style="width:220px;height:165px;">\n        </div>\n    </div>\n\n</ion-content>\n'/*ion-inline-end:"D:\ProjetIHMVendredi\statApp\src\pages\history\history.html"*/,
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["f" /* NavController */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["g" /* NavParams */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["e" /* ModalController */]])
    ], HistoryPage);
    return HistoryPage;
}());

//# sourceMappingURL=history.js.map

/***/ }),

/***/ 111:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return SampleModalPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(22);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};



/**
 * Generated class for the SampleModalPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */
var SampleModalPage = /** @class */ (function () {
    function SampleModalPage(navCtrl, navParams, viewCtrl) {
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.viewCtrl = viewCtrl;
        this.title = this.navParams.get('title');
        this.text = this.navParams.get('text');
        this.img = this.navParams.get('img');
    }
    SampleModalPage.prototype.ionViewDidLoad = function () {
        console.log('ionViewDidLoad SampleModalPage');
    };
    SampleModalPage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["m" /* Component */])({
            selector: 'page-sample-modal',template:/*ion-inline-start:"D:\ProjetIHMVendredi\statApp\src\pages\sample-modal\sample-modal.html"*/'\n<ion-header>\n\n  <ion-navbar>\n    <ion-title>{{title}}</ion-title>\n  </ion-navbar>\n\n</ion-header>\n\n\n<ion-content padding style="height: 100%">\n\n  <ion-card>\n    <img src={{img}}/>\n    <ion-card-content>\n      <ion-card-title style="text-align: center;">\n        {{title}}\n      </ion-card-title>\n      <p>\n        {{text}}\n      </p>\n    </ion-card-content>\n  </ion-card>\n\n</ion-content>\n'/*ion-inline-end:"D:\ProjetIHMVendredi\statApp\src\pages\sample-modal\sample-modal.html"*/,
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["f" /* NavController */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["g" /* NavParams */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["i" /* ViewController */]])
    ], SampleModalPage);
    return SampleModalPage;
}());

//# sourceMappingURL=sample-modal.js.map

/***/ }),

/***/ 112:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return TutoPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(22);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};


/**
 * Generated class for the TutoPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */
var TutoPage = /** @class */ (function () {
    function TutoPage(navCtrl, navParams) {
        this.navCtrl = navCtrl;
        this.navParams = navParams;
    }
    TutoPage.prototype.ionViewDidLoad = function () {
        console.log('ionViewDidLoad TutoPage');
    };
    TutoPage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["m" /* Component */])({
            selector: 'page-tuto',template:/*ion-inline-start:"D:\ProjetIHMVendredi\statApp\src\pages\tuto\tuto.html"*/'<!--\n  Generated template for the TutoPage page.\n\n  See http://ionicframework.com/docs/components/#navigation for more info on\n  Ionic pages and navigation.\n-->\n<ion-header>\n\n  <ion-navbar>\n    <ion-title>tuto</ion-title>\n  </ion-navbar>\n\n</ion-header>\n\n\n<ion-content padding>\n\n</ion-content>\n'/*ion-inline-end:"D:\ProjetIHMVendredi\statApp\src\pages\tuto\tuto.html"*/,
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["f" /* NavController */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["g" /* NavParams */]])
    ], TutoPage);
    return TutoPage;
}());

//# sourceMappingURL=tuto.js.map

/***/ }),

/***/ 113:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return StatPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(22);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_chart_js__ = __webpack_require__(394);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_chart_js___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2_chart_js__);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};



/**
 * Generated class for the StatPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */
var StatPage = /** @class */ (function () {
    function StatPage(navCtrl, navParams) {
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.player = "p1";
    }
    StatPage.prototype.ionViewDidLoad = function () {
        /*
        this.barChart = new Chart(this.barCanvas.nativeElement, {
  
            type: 'bar',
            data: {
                labels: ["Red", "Blue", "Yellow", "Green", "Purple", "Orange"],
                datasets: [{
                    label: '# of Votes',
                    data: [12, 19, 3, 5, 2, 3],
                    backgroundColor: [
                        'rgba(255, 99, 132, 0.2)',
                        'rgba(54, 162, 235, 0.2)',
                        'rgba(255, 206, 86, 0.2)',
                        'rgba(75, 192, 192, 0.2)',
                        'rgba(153, 102, 255, 0.2)',
                        'rgba(255, 159, 64, 0.2)'
                    ],
                    borderColor: [
                        'rgba(255,99,132,1)',
                        'rgba(54, 162, 235, 1)',
                        'rgba(255, 206, 86, 1)',
                        'rgba(75, 192, 192, 1)',
                        'rgba(153, 102, 255, 1)',
                        'rgba(255, 159, 64, 1)'
                    ],
                    borderWidth: 1
                }]
            },
            options: {
                scales: {
                    yAxes: [{
                        ticks: {
                            beginAtZero:true
                        }
                    }]
                }
            }
  
        });*/
        this.doughnutChart = new __WEBPACK_IMPORTED_MODULE_2_chart_js__["Chart"](this.doughnutCanvas.nativeElement, {
            type: 'doughnut',
            data: {
                labels: ["Red", "Blue", "Yellow", "Green", "Purple", "Orange"],
                datasets: [{
                        label: '# of Votes',
                        data: [12, 19, 3, 5, 2, 3],
                        backgroundColor: [
                            'rgba(255, 99, 132, 0.2)',
                            'rgba(54, 162, 235, 0.2)',
                            'rgba(255, 206, 86, 0.2)',
                            'rgba(75, 192, 192, 0.2)',
                            'rgba(153, 102, 255, 0.2)',
                            'rgba(255, 159, 64, 0.2)'
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
        this.lineChart = new __WEBPACK_IMPORTED_MODULE_2_chart_js__["Chart"](this.lineCanvas.nativeElement, {
            type: 'line',
            data: {
                labels: ["January", "February", "March", "April", "May", "June", "July"],
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
                        data: [65, 59, 80, 81, 56, 55, 40],
                        spanGaps: false,
                    }
                ]
            }
        });
    };
    StatPage.prototype.segmentChanged = function (ev) {
        console.log('Segment changed', ev);
    };
    __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["_8" /* ViewChild */])('barCanvas'),
        __metadata("design:type", Object)
    ], StatPage.prototype, "barCanvas", void 0);
    __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["_8" /* ViewChild */])('doughnutCanvas'),
        __metadata("design:type", Object)
    ], StatPage.prototype, "doughnutCanvas", void 0);
    __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["_8" /* ViewChild */])('lineCanvas'),
        __metadata("design:type", Object)
    ], StatPage.prototype, "lineCanvas", void 0);
    StatPage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["m" /* Component */])({
            selector: 'page-stat',template:/*ion-inline-start:"D:\ProjetIHMVendredi\statApp\src\pages\stat\stat.html"*/'<!--\n\n\n<ion-content>\n\n\n    <ion-card>\n        <ion-card-header>\n            Bar Chart\n        </ion-card-header>\n        <ion-card-content>\n            <canvas #barCanvas></canvas>\n        </ion-card-content>\n    </ion-card>\n\n    <ion-card>\n        <ion-card-header>\n            Doughnut Chart\n        </ion-card-header>\n        <ion-card-content>\n            <canvas #doughnutCanvas></canvas>\n        </ion-card-content>\n    </ion-card>\n\n    <ion-card>\n        <ion-card-header>\n            Line Chart\n        </ion-card-header>\n        <ion-card-content>\n            <canvas #lineCanvas></canvas>\n        </ion-card-content>\n    </ion-card>\n\n</ion-content>-->\n<ion-header>\n    <ion-navbar no-border-bottom>\n        <ion-title>\n            Statistiques de la partie :\n        </ion-title>\n    </ion-navbar>\n\n    <ion-toolbar no-border-top>\n        <ion-segment [(ngModel)]="player">\n            <ion-segment-button value="p1">\n                Joueur 1\n            </ion-segment-button>\n            <ion-segment-button value="p2">\n                Joueur 2\n            </ion-segment-button>\n            <ion-segment-button value="p3">\n                Joueur 3\n            </ion-segment-button>\n            <ion-segment-button value="p4">\n                Joueur 4\n            </ion-segment-button>\n        </ion-segment>\n    </ion-toolbar>\n</ion-header>\n\n<ion-content>\n\n    <div [ngSwitch]="player">\n        <div class="row" *ngSwitchCase="\'p1\'">\n            <div class="col" style="text-align: center; max-width: 50%">\n                <ion-card>\n                    <ion-card-header>\n                        Doughnut Chart\n                    </ion-card-header>\n                    <ion-card-content>\n                        <canvas #doughnutCanvas></canvas>\n                    </ion-card-content>\n                </ion-card>\n            </div>\n            <div class="col"  style="text-align: center; max-width: 50%">\n                <ion-card>\n                    <ion-card-header>\n                        Line Chart\n                    </ion-card-header>\n                    <ion-card-content>\n                        <canvas #lineCanvas></canvas>\n                    </ion-card-content>\n                </ion-card>\n            </div>\n        </div>\n\n        <div class="row" *ngSwitchCase="\'p2\'">\n            <div class="col" style="text-align: center; max-width: 50%">\n                <ion-card>\n                    <ion-card-header>\n                        Doughnut Chart2\n                    </ion-card-header>\n                    <ion-card-content>\n                        <canvas #doughnutCanvas></canvas>\n                    </ion-card-content>\n                </ion-card>\n            </div>\n            <div class="col"  style="text-align: center; max-width: 50%">\n                <ion-card>\n                    <ion-card-header>\n                        Line Chart2\n                    </ion-card-header>\n                    <ion-card-content>\n                        <canvas #lineCanvas></canvas>\n                    </ion-card-content>\n                </ion-card>\n            </div>\n        </div>\n\n        <ion-list *ngSwitchCase="\'p3\'">\n            <ion-item>\n                <h2>Daffy</h2>\n            </ion-item>\n            <ion-item>\n                <h2>Huey</h2>\n            </ion-item>\n            <ion-item>\n                <h2>Dewey</h2>\n            </ion-item>\n            <ion-item>\n                <h2>Louie</h2>\n            </ion-item>\n        </ion-list>\n        <ion-list *ngSwitchCase="\'p4\'">\n            <ion-item>\n                <h2>Ruby</h2>\n            </ion-item>\n            <ion-item>\n                <h2>Oscar</h2>\n            </ion-item>\n            <ion-item>\n                <h2>Zoey</h2>\n            </ion-item>\n            <ion-item>\n                <h2>Otto</h2>\n            </ion-item>\n        </ion-list>\n    </div>\n\n\n</ion-content>'/*ion-inline-end:"D:\ProjetIHMVendredi\statApp\src\pages\stat\stat.html"*/,
        }),
        __metadata("design:paramtypes", [typeof (_a = typeof __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["f" /* NavController */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["f" /* NavController */]) === "function" && _a || Object, typeof (_b = typeof __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["g" /* NavParams */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["g" /* NavParams */]) === "function" && _b || Object])
    ], StatPage);
    return StatPage;
    var _a, _b;
}());

//# sourceMappingURL=stat.js.map

/***/ }),

/***/ 114:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return VideoPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(22);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};


/**
 * Generated class for the VideoPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */
var VideoPage = /** @class */ (function () {
    function VideoPage(navCtrl, navParams) {
        this.navCtrl = navCtrl;
        this.navParams = navParams;
    }
    VideoPage.prototype.ionViewDidLoad = function () {
        console.log('ionViewDidLoad VideoPage');
    };
    VideoPage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["m" /* Component */])({
            selector: 'page-video',template:/*ion-inline-start:"D:\ProjetIHMVendredi\statApp\src\pages\video\video.html"*/'<!--\n  Generated template for the VideoPage page.\n\n  See http://ionicframework.com/docs/components/#navigation for more info on\n  Ionic pages and navigation.\n-->\n<ion-header>\n\n  <ion-navbar>\n    <ion-title>video</ion-title>\n  </ion-navbar>\n\n</ion-header>\n\n\n<ion-content padding>\n\n</ion-content>\n'/*ion-inline-end:"D:\ProjetIHMVendredi\statApp\src\pages\video\video.html"*/,
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["f" /* NavController */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["g" /* NavParams */]])
    ], VideoPage);
    return VideoPage;
}());

//# sourceMappingURL=video.js.map

/***/ }),

/***/ 124:
/***/ (function(module, exports) {

function webpackEmptyAsyncContext(req) {
	// Here Promise.resolve().then() is used instead of new Promise() to prevent
	// uncatched exception popping up in devtools
	return Promise.resolve().then(function() {
		throw new Error("Cannot find module '" + req + "'.");
	});
}
webpackEmptyAsyncContext.keys = function() { return []; };
webpackEmptyAsyncContext.resolve = webpackEmptyAsyncContext;
module.exports = webpackEmptyAsyncContext;
webpackEmptyAsyncContext.id = 124;

/***/ }),

/***/ 165:
/***/ (function(module, exports, __webpack_require__) {

var map = {
	"../pages/history/history.module": [
		463,
		4
	],
	"../pages/sample-modal/sample-modal.module": [
		464,
		3
	],
	"../pages/stat/stat.module": [
		466,
		2
	],
	"../pages/tuto/tuto.module": [
		465,
		1
	],
	"../pages/video/video.module": [
		467,
		0
	]
};
function webpackAsyncContext(req) {
	var ids = map[req];
	if(!ids)
		return Promise.reject(new Error("Cannot find module '" + req + "'."));
	return __webpack_require__.e(ids[1]).then(function() {
		return __webpack_require__(ids[0]);
	});
};
webpackAsyncContext.keys = function webpackAsyncContextKeys() {
	return Object.keys(map);
};
webpackAsyncContext.id = 165;
module.exports = webpackAsyncContext;

/***/ }),

/***/ 344:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return TabsPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__stat_stat__ = __webpack_require__(113);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__history_history__ = __webpack_require__(110);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__tuto_tuto__ = __webpack_require__(112);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__video_video__ = __webpack_require__(114);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};





var TabsPage = /** @class */ (function () {
    function TabsPage() {
        this.tab1Root = __WEBPACK_IMPORTED_MODULE_1__stat_stat__["a" /* StatPage */];
        this.tab2Root = __WEBPACK_IMPORTED_MODULE_3__tuto_tuto__["a" /* TutoPage */];
        this.tab3Root = __WEBPACK_IMPORTED_MODULE_2__history_history__["a" /* HistoryPage */];
        this.tab4Root = __WEBPACK_IMPORTED_MODULE_4__video_video__["a" /* VideoPage */];
    }
    TabsPage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["m" /* Component */])({template:/*ion-inline-start:"D:\ProjetIHMVendredi\statApp\src\pages\tabs\tabs.html"*/'<ion-tabs>\n  <ion-tab [root]="tab1Root" tabTitle="Stats" tabIcon="stats"></ion-tab>\n  <ion-tab [root]="tab2Root" tabTitle="Tuto" tabIcon="information-circle"></ion-tab>\n  <ion-tab [root]="tab3Root" tabTitle="History" tabIcon="archive"></ion-tab>\n  <ion-tab [root]="tab4Root" tabTitle="Video" tabIcon="logo-youtube"></ion-tab>\n</ion-tabs>\n'/*ion-inline-end:"D:\ProjetIHMVendredi\statApp\src\pages\tabs\tabs.html"*/
        }),
        __metadata("design:paramtypes", [])
    ], TabsPage);
    return TabsPage;
}());

//# sourceMappingURL=tabs.js.map

/***/ }),

/***/ 345:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_platform_browser_dynamic__ = __webpack_require__(346);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__app_module__ = __webpack_require__(368);


Object(__WEBPACK_IMPORTED_MODULE_0__angular_platform_browser_dynamic__["a" /* platformBrowserDynamic */])().bootstrapModule(__WEBPACK_IMPORTED_MODULE_1__app_module__["a" /* AppModule */]);
//# sourceMappingURL=main.js.map

/***/ }),

/***/ 368:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return AppModule; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_platform_browser__ = __webpack_require__(37);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_ionic_angular__ = __webpack_require__(22);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__app_component__ = __webpack_require__(454);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__pages_tabs_tabs__ = __webpack_require__(344);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__ionic_native_status_bar__ = __webpack_require__(341);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__ionic_native_splash_screen__ = __webpack_require__(343);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__ionic_native_screen_orientation__ = __webpack_require__(462);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8__pages_stat_stat__ = __webpack_require__(113);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_9__pages_history_history__ = __webpack_require__(110);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_10__pages_tuto_tuto__ = __webpack_require__(112);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_11__pages_video_video__ = __webpack_require__(114);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_12__pages_sample_modal_sample_modal__ = __webpack_require__(111);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};













var AppModule = /** @class */ (function () {
    function AppModule() {
    }
    AppModule = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["I" /* NgModule */])({
            declarations: [
                __WEBPACK_IMPORTED_MODULE_3__app_component__["a" /* MyApp */],
                __WEBPACK_IMPORTED_MODULE_8__pages_stat_stat__["a" /* StatPage */],
                __WEBPACK_IMPORTED_MODULE_9__pages_history_history__["a" /* HistoryPage */],
                __WEBPACK_IMPORTED_MODULE_10__pages_tuto_tuto__["a" /* TutoPage */],
                __WEBPACK_IMPORTED_MODULE_11__pages_video_video__["a" /* VideoPage */],
                __WEBPACK_IMPORTED_MODULE_4__pages_tabs_tabs__["a" /* TabsPage */],
                __WEBPACK_IMPORTED_MODULE_12__pages_sample_modal_sample_modal__["a" /* SampleModalPage */]
            ],
            imports: [
                __WEBPACK_IMPORTED_MODULE_1__angular_platform_browser__["a" /* BrowserModule */],
                __WEBPACK_IMPORTED_MODULE_2_ionic_angular__["c" /* IonicModule */].forRoot(__WEBPACK_IMPORTED_MODULE_3__app_component__["a" /* MyApp */], {}, {
                    links: [
                        { loadChildren: '../pages/history/history.module#HistoryPageModule', name: 'HistoryPage', segment: 'history', priority: 'low', defaultHistory: [] },
                        { loadChildren: '../pages/sample-modal/sample-modal.module#SampleModalPageModule', name: 'SampleModalPage', segment: 'sample-modal', priority: 'low', defaultHistory: [] },
                        { loadChildren: '../pages/tuto/tuto.module#TutoPageModule', name: 'TutoPage', segment: 'tuto', priority: 'low', defaultHistory: [] },
                        { loadChildren: '../pages/stat/stat.module#StatPageModule', name: 'StatPage', segment: 'stat', priority: 'low', defaultHistory: [] },
                        { loadChildren: '../pages/video/video.module#VideoPageModule', name: 'VideoPage', segment: 'video', priority: 'low', defaultHistory: [] }
                    ]
                })
            ],
            bootstrap: [__WEBPACK_IMPORTED_MODULE_2_ionic_angular__["a" /* IonicApp */]],
            entryComponents: [
                __WEBPACK_IMPORTED_MODULE_3__app_component__["a" /* MyApp */],
                __WEBPACK_IMPORTED_MODULE_8__pages_stat_stat__["a" /* StatPage */],
                __WEBPACK_IMPORTED_MODULE_9__pages_history_history__["a" /* HistoryPage */],
                __WEBPACK_IMPORTED_MODULE_10__pages_tuto_tuto__["a" /* TutoPage */],
                __WEBPACK_IMPORTED_MODULE_11__pages_video_video__["a" /* VideoPage */],
                __WEBPACK_IMPORTED_MODULE_4__pages_tabs_tabs__["a" /* TabsPage */],
                __WEBPACK_IMPORTED_MODULE_12__pages_sample_modal_sample_modal__["a" /* SampleModalPage */]
            ],
            providers: [
                __WEBPACK_IMPORTED_MODULE_5__ionic_native_status_bar__["a" /* StatusBar */],
                __WEBPACK_IMPORTED_MODULE_6__ionic_native_splash_screen__["a" /* SplashScreen */],
                __WEBPACK_IMPORTED_MODULE_7__ionic_native_screen_orientation__["a" /* ScreenOrientation */],
                { provide: __WEBPACK_IMPORTED_MODULE_0__angular_core__["u" /* ErrorHandler */], useClass: __WEBPACK_IMPORTED_MODULE_2_ionic_angular__["b" /* IonicErrorHandler */] }
            ]
        })
    ], AppModule);
    return AppModule;
}());

//# sourceMappingURL=app.module.js.map

/***/ }),

/***/ 418:
/***/ (function(module, exports, __webpack_require__) {

var map = {
	"./af": 175,
	"./af.js": 175,
	"./ar": 176,
	"./ar-dz": 177,
	"./ar-dz.js": 177,
	"./ar-kw": 178,
	"./ar-kw.js": 178,
	"./ar-ly": 179,
	"./ar-ly.js": 179,
	"./ar-ma": 180,
	"./ar-ma.js": 180,
	"./ar-sa": 181,
	"./ar-sa.js": 181,
	"./ar-tn": 182,
	"./ar-tn.js": 182,
	"./ar.js": 176,
	"./az": 183,
	"./az.js": 183,
	"./be": 184,
	"./be.js": 184,
	"./bg": 185,
	"./bg.js": 185,
	"./bm": 186,
	"./bm.js": 186,
	"./bn": 187,
	"./bn.js": 187,
	"./bo": 188,
	"./bo.js": 188,
	"./br": 189,
	"./br.js": 189,
	"./bs": 190,
	"./bs.js": 190,
	"./ca": 191,
	"./ca.js": 191,
	"./cs": 192,
	"./cs.js": 192,
	"./cv": 193,
	"./cv.js": 193,
	"./cy": 194,
	"./cy.js": 194,
	"./da": 195,
	"./da.js": 195,
	"./de": 196,
	"./de-at": 197,
	"./de-at.js": 197,
	"./de-ch": 198,
	"./de-ch.js": 198,
	"./de.js": 196,
	"./dv": 199,
	"./dv.js": 199,
	"./el": 200,
	"./el.js": 200,
	"./en-SG": 201,
	"./en-SG.js": 201,
	"./en-au": 202,
	"./en-au.js": 202,
	"./en-ca": 203,
	"./en-ca.js": 203,
	"./en-gb": 204,
	"./en-gb.js": 204,
	"./en-ie": 205,
	"./en-ie.js": 205,
	"./en-il": 206,
	"./en-il.js": 206,
	"./en-nz": 207,
	"./en-nz.js": 207,
	"./eo": 208,
	"./eo.js": 208,
	"./es": 209,
	"./es-do": 210,
	"./es-do.js": 210,
	"./es-us": 211,
	"./es-us.js": 211,
	"./es.js": 209,
	"./et": 212,
	"./et.js": 212,
	"./eu": 213,
	"./eu.js": 213,
	"./fa": 214,
	"./fa.js": 214,
	"./fi": 215,
	"./fi.js": 215,
	"./fo": 216,
	"./fo.js": 216,
	"./fr": 217,
	"./fr-ca": 218,
	"./fr-ca.js": 218,
	"./fr-ch": 219,
	"./fr-ch.js": 219,
	"./fr.js": 217,
	"./fy": 220,
	"./fy.js": 220,
	"./ga": 221,
	"./ga.js": 221,
	"./gd": 222,
	"./gd.js": 222,
	"./gl": 223,
	"./gl.js": 223,
	"./gom-latn": 224,
	"./gom-latn.js": 224,
	"./gu": 225,
	"./gu.js": 225,
	"./he": 226,
	"./he.js": 226,
	"./hi": 227,
	"./hi.js": 227,
	"./hr": 228,
	"./hr.js": 228,
	"./hu": 229,
	"./hu.js": 229,
	"./hy-am": 230,
	"./hy-am.js": 230,
	"./id": 231,
	"./id.js": 231,
	"./is": 232,
	"./is.js": 232,
	"./it": 233,
	"./it-ch": 234,
	"./it-ch.js": 234,
	"./it.js": 233,
	"./ja": 235,
	"./ja.js": 235,
	"./jv": 236,
	"./jv.js": 236,
	"./ka": 237,
	"./ka.js": 237,
	"./kk": 238,
	"./kk.js": 238,
	"./km": 239,
	"./km.js": 239,
	"./kn": 240,
	"./kn.js": 240,
	"./ko": 241,
	"./ko.js": 241,
	"./ku": 242,
	"./ku.js": 242,
	"./ky": 243,
	"./ky.js": 243,
	"./lb": 244,
	"./lb.js": 244,
	"./lo": 245,
	"./lo.js": 245,
	"./lt": 246,
	"./lt.js": 246,
	"./lv": 247,
	"./lv.js": 247,
	"./me": 248,
	"./me.js": 248,
	"./mi": 249,
	"./mi.js": 249,
	"./mk": 250,
	"./mk.js": 250,
	"./ml": 251,
	"./ml.js": 251,
	"./mn": 252,
	"./mn.js": 252,
	"./mr": 253,
	"./mr.js": 253,
	"./ms": 254,
	"./ms-my": 255,
	"./ms-my.js": 255,
	"./ms.js": 254,
	"./mt": 256,
	"./mt.js": 256,
	"./my": 257,
	"./my.js": 257,
	"./nb": 258,
	"./nb.js": 258,
	"./ne": 259,
	"./ne.js": 259,
	"./nl": 260,
	"./nl-be": 261,
	"./nl-be.js": 261,
	"./nl.js": 260,
	"./nn": 262,
	"./nn.js": 262,
	"./pa-in": 263,
	"./pa-in.js": 263,
	"./pl": 264,
	"./pl.js": 264,
	"./pt": 265,
	"./pt-br": 266,
	"./pt-br.js": 266,
	"./pt.js": 265,
	"./ro": 267,
	"./ro.js": 267,
	"./ru": 268,
	"./ru.js": 268,
	"./sd": 269,
	"./sd.js": 269,
	"./se": 270,
	"./se.js": 270,
	"./si": 271,
	"./si.js": 271,
	"./sk": 272,
	"./sk.js": 272,
	"./sl": 273,
	"./sl.js": 273,
	"./sq": 274,
	"./sq.js": 274,
	"./sr": 275,
	"./sr-cyrl": 276,
	"./sr-cyrl.js": 276,
	"./sr.js": 275,
	"./ss": 277,
	"./ss.js": 277,
	"./sv": 278,
	"./sv.js": 278,
	"./sw": 279,
	"./sw.js": 279,
	"./ta": 280,
	"./ta.js": 280,
	"./te": 281,
	"./te.js": 281,
	"./tet": 282,
	"./tet.js": 282,
	"./tg": 283,
	"./tg.js": 283,
	"./th": 284,
	"./th.js": 284,
	"./tl-ph": 285,
	"./tl-ph.js": 285,
	"./tlh": 286,
	"./tlh.js": 286,
	"./tr": 287,
	"./tr.js": 287,
	"./tzl": 288,
	"./tzl.js": 288,
	"./tzm": 289,
	"./tzm-latn": 290,
	"./tzm-latn.js": 290,
	"./tzm.js": 289,
	"./ug-cn": 291,
	"./ug-cn.js": 291,
	"./uk": 292,
	"./uk.js": 292,
	"./ur": 293,
	"./ur.js": 293,
	"./uz": 294,
	"./uz-latn": 295,
	"./uz-latn.js": 295,
	"./uz.js": 294,
	"./vi": 296,
	"./vi.js": 296,
	"./x-pseudo": 297,
	"./x-pseudo.js": 297,
	"./yo": 298,
	"./yo.js": 298,
	"./zh-cn": 299,
	"./zh-cn.js": 299,
	"./zh-hk": 300,
	"./zh-hk.js": 300,
	"./zh-tw": 301,
	"./zh-tw.js": 301
};
function webpackContext(req) {
	return __webpack_require__(webpackContextResolve(req));
};
function webpackContextResolve(req) {
	var id = map[req];
	if(!(id + 1)) // check for number or string
		throw new Error("Cannot find module '" + req + "'.");
	return id;
};
webpackContext.keys = function webpackContextKeys() {
	return Object.keys(map);
};
webpackContext.resolve = webpackContextResolve;
module.exports = webpackContext;
webpackContext.id = 418;

/***/ }),

/***/ 454:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return MyApp; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(22);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__ionic_native_status_bar__ = __webpack_require__(341);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__ionic_native_splash_screen__ = __webpack_require__(343);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__pages_tabs_tabs__ = __webpack_require__(344);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};





var MyApp = /** @class */ (function () {
    function MyApp(platform, statusBar, splashScreen) {
        this.rootPage = __WEBPACK_IMPORTED_MODULE_4__pages_tabs_tabs__["a" /* TabsPage */];
        platform.ready().then(function () {
            // Okay, so the platform is ready and our plugins are available.
            // Here you can do any higher level native things you might need.
            statusBar.styleDefault();
            splashScreen.hide();
        });
    }
    MyApp = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["m" /* Component */])({template:/*ion-inline-start:"D:\ProjetIHMVendredi\statApp\src\app\app.html"*/'<link href="https://fonts.googleapis.com/css?family=ZCOOL+QingKe+HuangYou" rel="stylesheet">\n<ion-nav [root]="rootPage"></ion-nav>\n'/*ion-inline-end:"D:\ProjetIHMVendredi\statApp\src\app\app.html"*/
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["h" /* Platform */], __WEBPACK_IMPORTED_MODULE_2__ionic_native_status_bar__["a" /* StatusBar */], __WEBPACK_IMPORTED_MODULE_3__ionic_native_splash_screen__["a" /* SplashScreen */]])
    ], MyApp);
    return MyApp;
}());

//# sourceMappingURL=app.component.js.map

/***/ })

},[345]);
//# sourceMappingURL=main.js.map