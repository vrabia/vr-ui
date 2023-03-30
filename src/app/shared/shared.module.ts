import { NgModule } from '@angular/core';
import { HeaderComponent } from "@shared/components/header/header.component";
import { SelectInputComponent } from "@shared/components/select-input/select-input.component";
import { ReactiveFormsModule } from "@angular/forms";
import { NgForOf } from "@angular/common";

@NgModule({
  declarations: [
    HeaderComponent,
    SelectInputComponent
  ],
  imports: [
    ReactiveFormsModule,
    NgForOf
  ],
  providers: [],
  exports: [
    SelectInputComponent,
    HeaderComponent
  ],
})
export class SharedModule {
}
