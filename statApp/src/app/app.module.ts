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

@NgModule({
    declarations: [
        MyApp,
        StatPage,
        HistoryPage,
        TutoPage,
        VideoPage,
        TabsPage,
        SampleModalPage
    ],
    imports: [
        BrowserModule,
        IonicModule.forRoot(MyApp)
    ],
    bootstrap: [IonicApp],
    entryComponents: [
        MyApp,
        StatPage,
        HistoryPage,
        TutoPage,
        VideoPage,
        TabsPage,
        SampleModalPage
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
