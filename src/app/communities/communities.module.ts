import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CommunitiesScreenComponent } from "@communities/components/communities-screen/communities-screen.component";
import { CommunityPictureComponent } from './components/communities-screen/community-picture/community-picture.component';
import { CommunitiesRoutingModule } from "@communities/communities-routing.module";
import { NgxsModule } from "@ngxs/store";
import { communitiesStates } from "@communities/redux/communities-states";
import { SharedModule } from "@shared/shared.module";



@NgModule({
  declarations: [
    CommunitiesScreenComponent,
    CommunityPictureComponent
  ],
  imports: [
    CommonModule,
    CommunitiesRoutingModule,
    NgxsModule.forFeature(communitiesStates),
    SharedModule
  ]
})
export class CommunitiesModule { }
