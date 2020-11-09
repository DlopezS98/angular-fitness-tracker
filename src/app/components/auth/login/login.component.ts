import { Store } from '@ngrx/store';
import { Subscription, Observable } from 'rxjs';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Component, OnInit } from '@angular/core';

import { AuthService } from '../../../services/auth.service';
import * as RootReducerStore from '../../../reducers/app.reducer';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;
  isLoading$: Observable<boolean>;
  private loadingSubs: Subscription;

  constructor(
    private authService: AuthService,
    private store: Store<RootReducerStore.State>
  ) {}

  ngOnInit(): void {
    this.isLoading$ = this.store.select(RootReducerStore.getIsLoading);
    this.loginForm = new FormGroup({
      email: new FormControl('', {
        validators: [Validators.required, Validators.email],
      }),
      password: new FormControl('', { validators: [Validators.required] }),
    });
  }

  onSubmit() {
    const { email, password } = this.loginForm.value;
    this.authService.login({
      email,
      password,
    });
  }
}
