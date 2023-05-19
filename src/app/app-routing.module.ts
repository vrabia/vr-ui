import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthenticatedGuard } from "@shared/guards/authenticated.guard";

const routes: Routes = [
  {
    path: 'auth',
    loadChildren: () => import('@authentication/authentication-components/authentication.module').then(m => m.AuthenticationModule)
  },
  {
    path: 'home',
    loadChildren: () => import('@public-dashboards/public-dashboards-components/public-dashboards.module').then(m => m.PublicDashboardsModule),
  },
  {
    path: 'feed',
    loadChildren: () => import('@feed/feed.module').then(m => m.FeedModule),
    canActivate: [AuthenticatedGuard]
  },
  {
    path: 'friends',
    loadChildren: () => import('@friends/friends.module').then(m => m.FriendsModule),
    canActivate: [AuthenticatedGuard]
  },
  {
    path: '',
    redirectTo: 'feed',
    pathMatch: 'full'
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
