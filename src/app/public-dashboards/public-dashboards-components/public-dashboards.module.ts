import { NgModule } from '@angular/core';
import { SharedModule } from "@shared/shared.module";
import { HomeScreenComponent } from "@public-dashboards/public-dashboards-components/home-screen/home-screen.component";
import {
  PublicDashboardsRoutingModule
} from "@public-dashboards/public-dashboards-components/public-dashboards-routing.module";

@NgModule({
  declarations: [
    HomeScreenComponent,
  ],
  imports: [
    SharedModule,
    PublicDashboardsRoutingModule
  ],
  providers: [],
  exports: [
  ],
})
export class PublicDashboardsModule {
}
