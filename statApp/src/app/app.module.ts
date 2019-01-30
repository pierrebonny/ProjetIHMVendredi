import {NgModule, ErrorHandler} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import {IonicApp, IonicModule, IonicErrorHandler} from 'ionic-angular';
import {MyApp} from './app.component';

import {TabsPage} from '../pages/tabs/tabs';

import {StatusBar} from '@ionic-native/status-bar';
import {SplashScreen} from '@ionic-native/splash-screen';
import {ScreenOrientation} from "@ionic-native/screen-orientation";
import {StatPage} from "../pages/stat/stat";
import {HistoryPage} from "../pages/history/history";
import {TutoPage} from "../pages/tuto/tuto";
import {VideoPage} from "../pages/video/video";
import {SampleModalPage} from "../pages/sample-modal/sample-modal";
import {SelectPage} from "../pages/select/select";
import {Player11Page} from "../pages/players/player11/player11";
import {Player12Page} from "../pages/players/player12/player12";
import {Player21Page} from "../pages/players/player21/player21";
import {Player22Page} from "../pages/players/player22/player22";
import {TabsTeam2Page} from "../pages/tabs-team2/tabs-team2";

import { SocketIoModule, SocketIoConfig } from 'ng-socket-io';
const config: SocketIoConfig = { url: 'localhost:8080', options: {} };

@NgModule({
    declarations: [
        MyApp,
        Player11Page,
        SelectPage,
        StatPage,
        HistoryPage,
        TutoPage,
        VideoPage,
        TabsPage,
        SampleModalPage,
        Player12Page,
        Player21Page,
        Player22Page,
        TabsTeam2Page
    ],
    imports: [
        BrowserModule,
        IonicModule.forRoot(MyApp),
        SocketIoModule.forRoot(config)

    ],
    bootstrap: [IonicApp],
    entryComponents: [
        MyApp,
        StatPage,
        HistoryPage,
        TutoPage,
        VideoPage,
        TabsPage,
        SelectPage,
        SampleModalPage,
        Player11Page,
        Player12Page,
        Player21Page,
        Player22Page,
        TabsTeam2Page
    ],
    providers: [
        StatusBar,
        SplashScreen,
        ScreenOrientation,
        {provide: ErrorHandler, useClass: IonicErrorHandler}
    ]
})
export class AppModule {
}
