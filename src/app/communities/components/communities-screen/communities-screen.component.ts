import { Component, OnInit } from '@angular/core';
import { BaseComponent } from "@shared/base/base.component";
import { ImageModel } from "@communities/model/images.model";
import { Select, Store } from "@ngxs/store";
import { CommunitiesState } from "@communities/redux/communities-state/communities.state";
import { Observable } from "rxjs";
import { GetCommunitiesNames } from "@communities/redux/communities-state/communities.actions";

@Component({
  selector: 'app-communities-screen',
  templateUrl: './communities-screen.component.html',
  styleUrls: ['./communities-screen.component.scss']
})
export class CommunitiesScreenComponent extends BaseComponent implements OnInit {

  @Select(CommunitiesState.images)
  images$!: Observable<ImageModel[]>;
  images: ImageModel[] = []

  constructor(private store: Store) {
    super();
  }

  ngOnInit(): void {
    this.store.dispatch(new GetCommunitiesNames());
    this.subscribeToDefined(this.images$, (images) => {
      this.images = images;
    });
  }
}
