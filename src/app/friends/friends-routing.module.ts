import { NgModule } from "@angular/core";
import { RouterModule } from "@angular/router";
import { AuthenticatedGuard } from "@shared/guards/authenticated.guard";
import { FriendsScreenComponent } from "@friends/friends-components/friends-screen/friends-screen.component";
import {
  ReceivedRequestsScreenComponent
} from "@friends/friends-components/friends-screen/received-requests-screen/received-requests-screen.component";
import {
  SentRequestsScreenComponent
} from "@friends/friends-components/friends-screen/sent-requests-screen/sent-requests-screen.component";
import {
  SearchPeopleScreenComponent
} from "@friends/friends-components/friends-screen/search-people-screen/search-people-screen.component";
import {
  ActualFriendsScreenComponent
} from "@friends/friends-components/friends-screen/actual-friends-screen/actual-friends-screen.component";

const routes = [
  {
    path: '',
    component: FriendsScreenComponent,
    children: [
      {
        path: '',
        component: ActualFriendsScreenComponent,
      },
      {
        path: 'received-requests',
        component: ReceivedRequestsScreenComponent,
        active: true
      },
      {
        path: 'sent-requests',
        component: SentRequestsScreenComponent,
      },
      {
        path: 'search-people',
        component: SearchPeopleScreenComponent,
      },
    ]
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
  providers: [AuthenticatedGuard]
})
export class FriendsRoutingModule {
}
