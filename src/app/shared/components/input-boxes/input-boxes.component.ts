import { AfterViewInit, Component, ElementRef, EventEmitter, Output, QueryList, ViewChildren } from '@angular/core';
import { CodeInputDirective } from "@shared/directives/class-directives/code-input.directive";

@Component({
  selector: 'app-input-boxes',
  templateUrl: './input-boxes.component.html',
  styleUrls: ['./input-boxes.component.scss']
})
export class InputBoxesComponent {
  @ViewChildren(CodeInputDirective, {read: ElementRef}) codeInputs: QueryList<ElementRef>;
  inputs: string[] = Array(9).fill('');
  numbers: number[] = Array(9);

  @Output() codeFilledEvent: EventEmitter<string> = new EventEmitter<string>();

  handleInput(index: number, event: any) {
    let value = event.currentTarget.value;
    if (value === '') {
      return;
    }
    if (value.length > 1) {
      value = value.slice(0, 1);
    }

    if (value === value.toLowerCase()) {
      value = value.toUpperCase();
      event.currentTarget.value = value;
    }

    this.inputs[index] = value;
    if (index < this.inputs.length - 1) {
      this.codeInputs.toArray()[index + 1].nativeElement.focus();
    } else {
      this.codeFilledEvent.emit(this.inputs.join(''));
    }
  }

  handleBackspace(index: number, event: any) {
    if (index > 0 && !event.currentTarget.value) {
      this.codeInputs.toArray()[index - 1].nativeElement.focus();
    }
  }
}
