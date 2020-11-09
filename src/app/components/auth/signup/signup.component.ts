import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Observable } from 'rxjs';
import { Store } from '@ngrx/store';

import { AuthService } from '../../../services/auth.service';
import * as RootReducerStore from '../../../reducers/app.reducer';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css'],
})
export class SignupComponent implements OnInit {
  maxDate;
  isLoading$: Observable<boolean>;

  constructor(
    private authService: AuthService,
    private store: Store<RootReducerStore.State>
  ) {}

  ngOnInit(): void {
    this.isLoading$ = this.store.select(RootReducerStore.getIsLoading);
    this.maxDate = new Date();
    this.maxDate.setFullYear(this.maxDate.getFullYear() - 18);
  }

  onSubmit(form: NgForm) {
    const { email, password } = form.value;
    this.authService.registerUser({
      email,
      password,
    });
  }
}
