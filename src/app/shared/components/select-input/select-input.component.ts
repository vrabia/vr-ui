import { Component, Input, NgIterable } from '@angular/core';
import { BaseComponent } from "@shared/base/base.component";
import { FormControl } from "@angular/forms";

@Component({
  selector: 'app-select-input',
  templateUrl: './select-input.component.html',
  styleUrls: ['./select-input.component.scss']
})
export class SelectInputComponent extends BaseComponent {
  @Input() selectControl = new FormControl();
  @Input() options: (string[] & NgIterable<string>);
}
