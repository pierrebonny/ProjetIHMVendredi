import { Component } from '@angular/core';

import {StatPage} from "../stat/stat";
import {HistoryPage} from "../history/history";
import {TutoPage} from "../tuto/tuto";
import {VideoPage} from "../video/video";


@Component({
  templateUrl: 'tabs.html'
})
export class TabsPage {

  tab1Root = StatPage;
  tab2Root = TutoPage;
  tab3Root = HistoryPage;
  tab4Root = VideoPage;

  constructor() {

  }
}
