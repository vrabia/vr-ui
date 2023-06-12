  import { NgModule } from '@angular/core';
import { GoogleMapsModule } from '@angular/google-maps';
import { CommonModule } from '@angular/common';
import { MapScreenComponent } from "@map/map-screen/map-screen.component";
import { MapRoutingModule } from "@map/map-routing.module";
import { SharedModule } from "@shared/shared.module";
import { HttpClientJsonpModule, HttpClientModule } from "@angular/common/http";
  import { NgxsModule } from "@ngxs/store";
  import { musicLocationStates } from "@map/shared-map/redux/musicLocationStates";

@NgModule({
  declarations: [
    MapScreenComponent,
  ],
  imports: [
    CommonModule,
    SharedModule,
    GoogleMapsModule,
    MapRoutingModule,
    HttpClientJsonpModule,
    HttpClientModule,
    NgxsModule.forFeature(musicLocationStates)
  ],
  exports: [
  ],
})
export class MapModule {}

