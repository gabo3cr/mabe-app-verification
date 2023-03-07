import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { SelectQRPage } from './select-qr.page';

const routes: Routes = [
  {
    path: '',
    component: SelectQRPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class SelectQRPageRoutingModule {}
