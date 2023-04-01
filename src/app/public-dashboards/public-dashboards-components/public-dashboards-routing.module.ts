import { NgModule } from "@angular/core";
import { RouterModule } from "@angular/router";
import { HomeScreenComponent } from "@public-dashboards/public-dashboards-components/home-screen/home-screen.component";

const routes = [
  {
    path: '',
    component: HomeScreenComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PublicDashboardsRoutingModule {
}
