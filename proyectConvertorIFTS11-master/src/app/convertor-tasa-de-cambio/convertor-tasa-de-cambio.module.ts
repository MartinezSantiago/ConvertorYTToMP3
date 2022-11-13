import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ConvertorTasaDeCambioPageRoutingModule } from './convertor-tasa-de-cambio-routing.module';

import { ConvertorTasaDeCambioPage } from './convertor-tasa-de-cambio.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ConvertorTasaDeCambioPageRoutingModule
  ],
  declarations: [ConvertorTasaDeCambioPage]
})
export class ConvertorTasaDeCambioPageModule {}
