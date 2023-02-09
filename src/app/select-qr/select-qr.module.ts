import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { SelectQRPageRoutingModule } from './select-qr-routing.module';

import { SelectQRPage } from './select-qr.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    SelectQRPageRoutingModule
  ],
  declarations: [SelectQRPage]
})
export class SelectQRPageModule {}
