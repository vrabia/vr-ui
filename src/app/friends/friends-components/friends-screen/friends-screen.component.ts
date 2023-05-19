import { Component, OnInit } from '@angular/core';
import { BaseComponent } from "@shared/base/base.component";

@Component({
  selector: 'app-friends-screen',
  templateUrl: './friends-screen.component.html',
  styleUrls: ['./friends-screen.component.scss']
})
export class FriendsScreenComponent extends BaseComponent implements OnInit {

  readonly tabs = [
    { name: "Actual friends", link: "./" },
    { name: "Received requests", link: "./received-requests" },
    { name: "Sent requests", link: "./sent-requests" },
    { name: "Search people", link: "./search-people" },
  ];

  constructor() {
    super();
  }

  ngOnInit(): void {
  }
}
