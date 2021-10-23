import {ChangeDetectionStrategy, Component, OnDestroy, OnInit} from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import {AuthService} from "../../services/auth.service";
import {Subscription} from "rxjs";
import {IAuthData} from "../../services/auth-api.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class LoginComponent implements OnInit, OnDestroy {
  hide: boolean = true;

  private readonly subListDestroy: Subscription = new Subscription();
  constructor(
    private readonly formBuilder: FormBuilder,
    private readonly authService: AuthService,
    private readonly router: Router,
  ) { }

  loginForm: FormGroup;

  ngOnInit(): void {
    this.loginForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(3)]]
    })
  }

  public login() {
    this.subListDestroy.add(
      this.authService.login(this.loginForm.value as IAuthData)
        .subscribe( success => {
          if (success) {
            this.router.navigate(['/main']);
          }
        })
    );
  }

  ngOnDestroy() {
    this.subListDestroy.unsubscribe();
  }
}
