import {Component} from '@angular/core';
import {IonicPage, NavParams, ViewController} from 'ionic-angular';

/**
 * Generated class for the PoiPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
    selector: 'page-poi',
    templateUrl: 'poi.html',
})
export class PoiPage {
    speed: any = this.navParams.get('speed');
    position: any = this.navParams.get('position');
    positionother: any = this.navParams.get('positionOther');
    tabOfPicto = [];
    tabOfAction = [];
    tabOfTimes = [];
    tabOfType = [];

    constructor(public navParams: NavParams, public viewCtrl: ViewController) {
    }

    ionViewDidLoad() {
        console.log("data entrées : ");
        console.log(this.position);
        this.positionother = this.position;
        this.speed = this.position;
        console.log(this.positionother);
        console.log(this.speed);
        let min = (this.position.length <= this.positionother ? this.position.length : this.positionother.length);
        let first = false;
        for (let i=3; i<min; i++){
            if(!first && this.position[i].x >= this.positionother[i].x){
                first = true;
                this.tabOfAction.push("Vous avez doublé l'équipe adverse !");
                this.tabOfPicto.push("../../assets/imgs/picto/top1.png");
                this.tabOfTimes.push(i/10 + " sec");
                this.tabOfType.push("1ere position !");
            }else if(first && this.position[i].x < this.positionother[i].x){
                first = false;
            }
        }
        for (let i = 0; i< this.speed.length; i++){
            if (this.speed[i] > 150){
                this.tabOfAction.push("Vous avez atteint un pic de vitesse de "+parseInt(this.speed[i])+" !");
                this.tabOfPicto.push("../../assets/imgs/picto/accelerate.png");
                this.tabOfTimes.push(i/10+" sec");
                this.tabOfType.push("Pic de vitesse");
            }
        }
        let collision = false;
        for (let i=0; i< this.position.length; i++){
            if (this.position[i].y <= 469 || this.position[i].y >=700){
                if (!collision){
                    collision = true;
                    this.tabOfTimes.push(i/10+" sec");
                    this.tabOfType.push("Collision !");
                    this.tabOfPicto.push("../../assets/imgs/picto/boom.png");
                    this.tabOfAction.push("Vous êtes rentré en collision avec un obstacle !");
                }
            }else{
                collision = false;
            }
        }
    }

    closeModal() {
        this.viewCtrl.dismiss();
    }


}
