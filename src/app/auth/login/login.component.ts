import { Subscription } from 'rxjs';
import { UIService } from '../../shared/ui.service';
import { AuthService } from '../../models/auth.service';
import { FormControl, FormGroup, NgForm, Validators } from '@angular/forms';
import { Component, OnInit, OnDestroy } from '@angular/core';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit, OnDestroy {
  loginForm: FormGroup;
  isLoading: boolean = false;
  private loadingSubs: Subscription;

  constructor(private authService: AuthService, private uiService: UIService) {}

  ngOnInit(): void {
    this.loadingSubs = this.uiService.loadingStateChanged.subscribe(
      (isLoading) => {
        this.isLoading = isLoading;
      }
    );
    this.loginForm = new FormGroup({
      email: new FormControl('', {
        validators: [Validators.required, Validators.email],
      }),
      password: new FormControl('', { validators: [Validators.required] }),
    });
  }

  ngOnDestroy(): void {
    //Called once, before the instance is destroyed.
    //Add 'implements OnDestroy' to the class.
    this.loadingSubs.unsubscribe();
  }

  onSubmit() {
    const { email, password } = this.loginForm.value;
    this.authService.login({
      email,
      password,
    });
  }
}
