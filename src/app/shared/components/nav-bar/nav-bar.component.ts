import { Component, OnInit } from '@angular/core';
import { BaseComponent } from "@shared/base/base.component";

@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.scss']
})
export class NavBarComponent extends BaseComponent implements OnInit{

  readonly redirectUrls = [
    {url: '/feed', name: 'Feed'},
    {url: '/friends', name: 'Friends'},
    {url: '/map', name: 'Map'},
  ]

  constructor() {
    super();
  }

  ngOnInit(): void {
  }
}
