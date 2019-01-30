import {Component} from '@angular/core';
import {IonicPage, NavController, NavParams} from 'ionic-angular';
import {Player12Page} from "../players/player12/player12";
import {Player11Page} from "../players/player11/player11";
import {Player21Page} from "../players/player21/player21";
import {Player22Page} from "../players/player22/player22";

/**
 * Generated class for the TabsTeam2Page page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
    selector: 'page-tabs-team2',
    templateUrl: 'tabs-team2.html',
})
export class TabsTeam2Page {
    tab1Root = Player21Page;
    tab2Root = Player22Page;

    constructor() {

    }
}
