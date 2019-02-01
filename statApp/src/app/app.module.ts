import {NgModule, ErrorHandler} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import {IonicApp, IonicModule, IonicErrorHandler} from 'ionic-angular';
import {MyApp} from './app.component';


import {StatusBar} from '@ionic-native/status-bar';
import {SplashScreen} from '@ionic-native/splash-screen';
import {ScreenOrientation} from "@ionic-native/screen-orientation";
import {HistoryPage} from "../pages/history/history";
import {SampleModalPage} from "../pages/sample-modal/sample-modal";
import {SelectPage} from "../pages/select/select";
import {Player11Page} from "../pages/players/player11/player11";
import {Player12Page} from "../pages/players/player12/player12";
import {Player21Page} from "../pages/players/player21/player21";
import {Player22Page} from "../pages/players/player22/player22";

import { SocketIoModule, SocketIoConfig } from 'ng-socket-io';
const config: SocketIoConfig = { url: 'http://localhost:8080/', options: {} };
//10.212.111.96
@NgModule({
    declarations: [
        MyApp,
        Player11Page,
        SelectPage,
        HistoryPage,
        SampleModalPage,
        Player12Page,
        Player21Page,
        Player22Page
    ],
    imports: [
        BrowserModule,
        IonicModule.forRoot(MyApp),
        SocketIoModule.forRoot(config)

    ],
    bootstrap: [IonicApp],
    entryComponents: [
        MyApp,
        HistoryPage,
        SelectPage,
        SampleModalPage,
        Player11Page,
        Player12Page,
        Player21Page,
        Player22Page
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
