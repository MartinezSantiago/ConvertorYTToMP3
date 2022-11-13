import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ConvertorTasaDeCambioPage } from './convertor-tasa-de-cambio.page';

const routes: Routes = [
  {
    path: '',
    component: ConvertorTasaDeCambioPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ConvertorTasaDeCambioPageRoutingModule {}
