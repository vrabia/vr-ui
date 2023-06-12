import { NgModule } from "@angular/core";
import { RouterModule } from "@angular/router";
import { AuthenticatedGuard } from "@shared/guards/authenticated.guard";
import { MapScreenComponent } from "@map/map-screen/map-screen.component";

const routes = [
  {
    path: '',
    component: MapScreenComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
  providers: [AuthenticatedGuard]
})
export class MapRoutingModule {
}
