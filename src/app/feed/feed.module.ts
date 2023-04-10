import { NgModule } from "@angular/core";
import { SharedModule } from "@shared/shared.module";
import { MainFeedScreenComponent } from './feed-components/main-feed-screen/main-feed-screen.component';
import { FeedRoutingModule } from "@feed/feed-routing.module";

@NgModule({
  declarations: [
    MainFeedScreenComponent
  ],
  imports: [
    FeedRoutingModule,
    // NgxsModule.forFeature(authenticationStates),
    SharedModule
  ],
  providers: [],
})
export class FeedModule {
}
