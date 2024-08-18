import {
  ChangeDetectionStrategy,
  Component,
  DestroyRef,
  inject,
  signal,
} from '@angular/core';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { LoginService } from '../../core/services/login.service';
import { catchError, EMPTY, finalize, tap } from 'rxjs';
import { AUTH_TOKEN } from '../../core/constants/token';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    class: 'flex-1',
  },
})
export class LoginComponent {
  loginForm = new FormGroup({
    username: new FormControl(null, Validators.required),
    password: new FormControl(null, Validators.required),
  });
  loginService = inject(LoginService);
  destroyRef = inject(DestroyRef);
  loading = signal<boolean>(false);
  router = inject(Router);
  submit() {
    if (this.loginForm.invalid) {
      this.loginForm.markAllAsTouched();
      return;
    }
    this.loading.set(true);
    this.loginService
      .login(this.loginForm.value)
      .pipe(
        tap((res) => {
          localStorage.setItem(AUTH_TOKEN, res.token);
          this.router.navigate(['/home']);
          this.loginService.authToken.set(res.token);
        }),
        catchError((error) => {
          this.loginService.authToken.set(null);
          return EMPTY;
        }),
        takeUntilDestroyed(this.destroyRef),
        finalize(() => this.loading.set(false))
      )
      .subscribe();
  }
}
