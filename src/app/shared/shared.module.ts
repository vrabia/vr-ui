import { NgModule } from '@angular/core';
import { HeaderComponent } from "@shared/components/header/header.component";
import { SelectInputComponent } from "@shared/components/select-input/select-input.component";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { AsyncPipe, NgForOf, NgIf } from "@angular/common";
import { InputBoxesComponent } from './components/input-boxes/input-boxes.component';
import { CodeInputDirective } from './directives/class-directives/code-input.directive';
import { DropdownMenuComponent } from "@shared/components/dropdown-menu/dropdown-menu.component";
import { ClickOutsideDirective } from "@shared/directives/click-outside.directive";
import { NavBarComponent } from './components/nav-bar/nav-bar.component';
import { SearchInputComponent } from './components/search-input/search-input.component';

@NgModule({
  declarations: [
    HeaderComponent,
    SelectInputComponent,
    InputBoxesComponent,
    CodeInputDirective,
    DropdownMenuComponent,
    ClickOutsideDirective,
    NavBarComponent,
    SearchInputComponent,
  ],
  imports: [
    ReactiveFormsModule,
    NgForOf,
    NgIf,
    AsyncPipe,
    FormsModule
  ],
  providers: [],
  exports: [
    SelectInputComponent,
    HeaderComponent,
    InputBoxesComponent,
    ClickOutsideDirective,
    SearchInputComponent,
  ],
})
export class SharedModule {
}
