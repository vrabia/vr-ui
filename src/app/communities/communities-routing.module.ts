import { NgModule } from "@angular/core";
import { RouterModule } from "@angular/router";
import { AuthenticatedGuard } from "@shared/guards/authenticated.guard";
import { CommunitiesScreenComponent } from "@communities/components/communities-screen/communities-screen.component";

const routes = [
  {
    path: '',
    component: CommunitiesScreenComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
  providers: [AuthenticatedGuard]
})
export class CommunitiesRoutingModule {
}
