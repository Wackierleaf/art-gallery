import {Component, OnDestroy, OnInit} from '@angular/core';
import {MatDialogRef} from "@angular/material/dialog";
import {AbstractControl, FormBuilder, FormGroup, ValidationErrors, ValidatorFn, Validators} from "@angular/forms";
import {AuthService, IUser} from "../../services/auth.service";
import {MyErrorStateMatcher} from "../../../tools/ErrorStateMatcher";
import {Subscription} from "rxjs";

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.scss']
})
export class RegistrationComponent implements OnInit, OnDestroy {
  registrationForm: FormGroup;
  hide: boolean = true;
  hideRepeatedPassword: boolean = true;
  errorMatcher = new MyErrorStateMatcher();
  subListDestroy = new Subscription();

  constructor(
    private readonly dialogRef: MatDialogRef<RegistrationComponent>,
    private readonly formBuilder: FormBuilder,
    private readonly authService: AuthService,
  ) { }

  ngOnInit(): void {
    this.registrationForm = this.formBuilder.group({
      name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      city: [],
      password: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(30)]],
      repeatedPassword: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(30)]],
      isAdmin: [false]
    }, {validators: this.checkPasswords})
  }

  submitRegisterForm() {
    if (!this.registrationForm.invalid) {
      const {name, email, city, password, isAdmin} = this.registrationForm.value;
      const registrationData: IUser = {
        name,
        email,
        city,
        password,
        isAdmin
      }

     this.subListDestroy.add(this.authService.registerUser(registrationData).subscribe(() =>
       this.close()
     ));
    }
  }

  checkPasswords: ValidatorFn = (group: AbstractControl):  ValidationErrors | null => {
    let pass = group.get('password')?.value;
    let confirmPass = group.get('repeatedPassword')?.value
    return pass === confirmPass ? null : { notSame: true }
  }

  close() {
    this.dialogRef.close();
  }

  ngOnDestroy() {
    this.subListDestroy.unsubscribe();
  }
}
