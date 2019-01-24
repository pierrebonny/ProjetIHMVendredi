import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { ViewController } from 'ionic-angular';


/**
 * Generated class for the SampleModalPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-sample-modal',
  templateUrl: 'sample-modal.html',
})
export class SampleModalPage {

    title: string = this.navParams.get('title');
    text: string = this.navParams.get('text');
    img: string = this.navParams.get('img');

    constructor(public navCtrl: NavController, public navParams: NavParams, public viewCtrl: ViewController) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad SampleModalPage');
  }

}
