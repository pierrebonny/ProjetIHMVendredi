import {Component} from '@angular/core';
import {IonicPage, NavController, NavParams} from 'ionic-angular';
import {Player21Page} from "../players/player21/player21";
import {SelectPage} from "../select/select";

/**
 * Generated class for the HomeconfigPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
    selector: 'page-homeconfig',
    templateUrl: 'homeconfig.html',
})
export class HomeconfigPage {

    ipServeur: any;

    constructor(public navCtrl: NavController, public navParams: NavParams) {
    }

    validateServeur() {
        let murl = "http://";
        if (this.ipServeur.length === 0) {
            console.log('error');
        } else {
            murl+= this.ipServeur+":8088";
            let data = {
                url: murl
            };
            console.log(data);
            this.navCtrl.push(SelectPage);

        }

    }

}
