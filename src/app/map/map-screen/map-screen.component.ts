import { Component, OnInit, Renderer2, ViewChild } from '@angular/core';
import { Observable, of } from "rxjs";
import { HttpClient } from "@angular/common/http";
import { BaseComponent } from "@shared/base/base.component";
import { Select, Store } from "@ngxs/store";
import { MusicAtLocationState } from "@map/shared-map/redux/music-state/music-at-location.state";
import { MusicLocation } from "@map/shared-map/model/music-location.model";
import { GetMapsApi, GetMusicAtLocation } from "@map/shared-map/redux/music-state/music.actions";
import { UserState } from "@shared/redux/user-state/user.state";
import { MapInfoWindow } from "@angular/google-maps";

@Component({
  selector: 'app-map-screen',
  templateUrl: './map-screen.component.html',
  styleUrls: ['./map-screen.component.scss']
})
export class MapScreenComponent extends BaseComponent implements OnInit {
  @ViewChild(MapInfoWindow) infoWindow: MapInfoWindow;

  @Select(MusicAtLocationState.musicLocation)
  musicLocation$: Observable<MusicLocation[]>;
  musicLocation: MusicLocation[];

  @Select(UserState.userId)
  userId$: Observable<string>;
  userId: string;

  @Select(MusicAtLocationState.mapsApi)
  mapsApi$: Observable<any>;
  mapsApi: any;

  loggedInUserMusicLocation: MusicLocation | undefined

  center: google.maps.LatLngLiteral;
  zoom = 13;
  markerOptions: google.maps.MarkerOptions;

  apiLoaded: Observable<boolean>;
  selectedMarker?: MusicLocation;

  constructor(private httpClient: HttpClient, private store: Store, private renderer: Renderer2) {
    super();
  }

  ngOnInit(): void {
    this.loadMapApi();
    this.getUsersMusicLocation();
  }

  loadMapApi() {
    this.store.dispatch(new GetMapsApi());

    this.subscribeToDefined(this.mapsApi$, (mapsApi) => {
        this.renderer.addClass(document.body, 'map-page');
        this.mapsApi = mapsApi;
        const scriptElement = this.renderer.createElement('script');
        scriptElement.text = mapsApi;
        this.renderer.appendChild(document.body, scriptElement);
        this.markerOptions = {
          draggable: false,
          icon: {
            url: 'assets/pictures/map-pin.png',
            scaledSize: new google.maps.Size(32, 44)
          }
        }
        this.apiLoaded = of(true);
      }
    );
  }

  getUsersMusicLocation() {
    this.store.dispatch(new GetMusicAtLocation(true));


    this.subscribeToDefined(this.musicLocation$, (musicLocation) => {
      this.musicLocation = musicLocation;

      this.subscribeToDefined(this.userId$, (userId) => {
        this.userId = userId;
        this.loggedInUserMusicLocation = this.musicLocation.find((musicLocation) => musicLocation.userId === this.userId);

        this.center = {
          lat: this.loggedInUserMusicLocation?.latitude ?? 46,
          lng: this.loggedInUserMusicLocation?.longitude ?? 23
        }
        console.log(this.center)
      });
    });
  }

  override ngOnDestroy() {
    super.ngOnDestroy();
    this.renderer.removeClass(document.body, 'map-page');
  }

  openInfoWindow(infoWindow: MapInfoWindow, event: google.maps.MapMouseEvent, music: MusicLocation): void {
    if (event.latLng) {
      this.selectedMarker = music; // Assign the selected music data
      infoWindow.position = event.latLng.toJSON(); // Set the info window position
      infoWindow.open(); // Open the info window
    }
  }

  closeInfoWindow(infoWindow: MapInfoWindow) {
    infoWindow.close(); // Close the info window
  }
}
