import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { HomeconfigPage } from './homeconfig';

@NgModule({
  declarations: [
    HomeconfigPage,
  ],
  imports: [
    IonicPageModule.forChild(HomeconfigPage),
  ],
})
export class HomeconfigPageModule {}
