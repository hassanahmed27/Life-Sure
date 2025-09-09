
import { Component } from '@angular/core';
import { RouterLink, Router } from '@angular/router';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    RouterLink,
    ReactiveFormsModule,
    HttpClientModule,
    CommonModule
  ],
  templateUrl: './login.html',
  styleUrls: ['./login.css']
})
export class Login {
  loginForm: FormGroup;
  isSubmitting = false;
  errorMessage = '';

  constructor(
    private fb: FormBuilder,
    private http: HttpClient,
    private router: Router
  ) {
    this.loginForm = this.fb.group({
      username: ['', [Validators.required]],
      password: ['', Validators.required],
      remember: [false]
    });
  }

  onSubmit() {
    if (this.loginForm.invalid) {
      this.loginForm.markAllAsTouched();
      return;
    }

    this.isSubmitting = true;
    this.errorMessage = '';


    const payload = {
      username: this.loginForm.value.username,
      password: this.loginForm.value.password
    };

    console.log('Sending login request:', payload);

    this.http.post('/api/Token/login', payload)
      .subscribe({
        next: (res: any) => {
          this.isSubmitting = false;
          console.log('Login successful', res);

          if (res.token) {
            localStorage.setItem('authToken', res.token);

            if (res.user) {
              localStorage.setItem('userData', JSON.stringify(res.user));
            }
          }

          this.router.navigate(['/']);
        },
        error: (err) => {
          console.error('Login failed', err);
          this.isSubmitting = false;

          if (err.status === 401) {
            this.errorMessage = 'Invalid username or password';
          } else if (err.status === 404) {
            this.errorMessage = 'API endpoint not found. Please contact support.';
          } else if (err.status === 0) {
            this.errorMessage = 'Network error. Please check your connection.';
          } else {
            this.errorMessage = 'Something went wrong. Please try again.';
          }
        }
      });
  }
}
