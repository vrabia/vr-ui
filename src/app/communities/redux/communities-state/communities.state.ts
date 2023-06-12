import { ImageModel } from "@communities/model/images.model";
import { Action, Selector, State, StateContext } from "@ngxs/store";
import { Injectable } from "@angular/core";
import { MediaService } from "@communities/services/media.service";
import { GetCommunitiesNames } from "@communities/redux/communities-state/communities.actions";
import { tap } from "rxjs";
import { environment } from "@environments/environment";


export interface CommunitiesStateModel {
  images: ImageModel[];
}

@State<CommunitiesStateModel>({
  name: 'communitiesState',
  defaults: {
    images: []
  },
})
@Injectable()
export class CommunitiesState {

  constructor(private mediaService: MediaService) {
  }

  @Selector()
  static images(state: CommunitiesStateModel) {
    return state.images;
  }


  @Action(GetCommunitiesNames)
  getCommunitiesNames({ getState, patchState }: StateContext<CommunitiesStateModel>, { forceReset }: GetCommunitiesNames) {
    // if forceReset is true, we need to reset the history
    if (forceReset) {
      patchState({
        images: []
      });
    }
    if (getState().images.length > 0) {
      return;
    }

    // if we don't have the history, get it from the server
    return this.mediaService.getCommunityPicturesNames().pipe(
      tap((imageNames) => {
        const newImages = imageNames.map((imageName) => {
          return {
            name: imageName,
            url: `${environment.mediaServiceUrl}/image/communities/${imageName}`
          }});

          patchState({
            images: newImages,
          });
      })
    );
  }
}

