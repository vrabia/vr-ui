import { Component, OnInit } from '@angular/core';
import { BaseComponent } from "@shared/base/base.component";
import { Store } from "@ngxs/store";
import { FormBuilder, FormControl, FormControlStatus, FormGroup, Validators } from "@angular/forms";
import { CustomValidators } from "@shared/validators/validators";
import {
  AddressFormControls,
  RegisterScreenFormControls
} from "@authentication/authentication-components/register-screen/register-screen.enums";
import { MusicGenres } from "@shared/models/music.enum";
import { Register } from "@authentication/shared-authentication/redux/authentication-state/authentication.actions";
import { RegisterCredentials } from "@authentication/shared-authentication/models/authentication.model";

@Component({
  selector: 'app-register-screen',
  templateUrl: './register-screen.component.html',
  styleUrls: ['./register-screen.component.scss']
})
export class RegisterScreenComponent extends BaseComponent implements OnInit {

  musicGenres: string[];
  registerScreenFormControls = RegisterScreenFormControls;
  addressFormControls = AddressFormControls;
  registerFormPart1: FormGroup;
  registerFormPart2: FormGroup;
  addressForm: FormGroup;

  stepNr = 1;

  constructor(private store: Store, private formBuilder: FormBuilder) {
    super();
  }

  ngOnInit(): void {
    this.musicGenres = Object.values(MusicGenres) as string[];
    this.registerFormPart1 = this.formBuilder.group({
        //ToDo add needed validation
        [RegisterScreenFormControls.NAME]: ['', { validators: [Validators.required, Validators.pattern('[a-z-A-Z]*')] }],
        [RegisterScreenFormControls.EMAIL]: ['', { validators: [Validators.required, Validators.email] }],
        [RegisterScreenFormControls.PASSWORD]: ['', { validators: [Validators.required] }],
        [RegisterScreenFormControls.PASSWORD_CONFIRMATION]: ['', { validators: [Validators.required] }],
        [RegisterScreenFormControls.ABOUT]: [''],
        [RegisterScreenFormControls.BIRTH_DATE]:
          ['', { validators: [Validators.required] }]
      },
      [CustomValidators.MatchValidator('password', 'passwordConfirmation')]
    );

    this.registerFormPart2 = this.formBuilder.group({
      [RegisterScreenFormControls.ABOUT]: [''],
      [RegisterScreenFormControls.GENRE]: [this.musicGenres[0]],
    });

    this.addressForm = this.formBuilder.group({
      [AddressFormControls.CITY]: [''],
      [AddressFormControls.COUNTRY]: [''],
      [AddressFormControls.ZIP]: [''],
    });
  }

  get musicGenreControl(): FormControl {
    return this.registerFormPart2.controls[RegisterScreenFormControls.GENRE] as FormControl;
  }

  register() {
    // if (this.registerFormPart1.status === 'INVALID' || this.registerFormPart2.status === 'INVALID') {
    //   return;
    // }

    const request: RegisterCredentials = {
      ...this.registerFormPart1.getRawValue(),
      ...this.registerFormPart2.getRawValue(),
      address: {
        ...this.addressForm.getRawValue(),
      }
    }

    this.store.dispatch(new Register(request));
  }
}
