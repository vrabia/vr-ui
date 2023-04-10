import { NgModule } from '@angular/core';
import { HeaderComponent } from "@shared/components/header/header.component";
import { SelectInputComponent } from "@shared/components/select-input/select-input.component";
import { ReactiveFormsModule } from "@angular/forms";
import { NgForOf } from "@angular/common";
import { InputBoxesComponent } from './components/input-boxes/input-boxes.component';
import { CodeInputDirective } from './directives/class-directives/code-input.directive';

@NgModule({
  declarations: [
    HeaderComponent,
    SelectInputComponent,
    InputBoxesComponent,
    CodeInputDirective
  ],
  imports: [
    ReactiveFormsModule,
    NgForOf
  ],
  providers: [],
  exports: [
    SelectInputComponent,
    HeaderComponent,
    InputBoxesComponent
  ],
})
export class SharedModule {
}
