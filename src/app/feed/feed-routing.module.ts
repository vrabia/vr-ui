import { NgModule } from "@angular/core";
import { RouterModule } from "@angular/router";
import { MainFeedScreenComponent } from "@feed/feed-components/main-feed-screen/main-feed-screen.component";

const routes = [
  {
    path: '',
    component: MainFeedScreenComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class FeedRoutingModule{
}
