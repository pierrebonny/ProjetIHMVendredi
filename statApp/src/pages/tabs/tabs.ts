import { Component } from '@angular/core';

import {Player11Page} from "../players/player11/player11";
import {Player12Page} from "../players/player12/player12";


@Component({
  templateUrl: 'tabs.html'
})
export class TabsPage {

  tab1Root = Player11Page;
  tab2Root = Player12Page;
  constructor() {

  }
}
