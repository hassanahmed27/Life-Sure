
import { Component } from '@angular/core';
import { RouterLink, Router } from "@angular/router";
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';

@Component({
  selector: 'app-registration',
  imports: [RouterLink, ReactiveFormsModule, CommonModule, HttpClientModule],
  templateUrl: './registration.html',
  styleUrl: './registration.css'
})
export class Registration {
  registerForm: FormGroup;
  isLoading = false;
  errorMessage = '';

  constructor(
    private fb: FormBuilder,
    private router: Router
  ) {
    this.registerForm = this.fb.group({
      firstName: ['', [Validators.required]],
      lastName: ['', [Validators.required]],
      identityNumber: ['', [Validators.required, Validators.pattern('^[0-9]{13}$')]],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(8)]],
      confirmPassword: ['', [Validators.required]],
      terms: [false, [Validators.requiredTrue]]
    });
  }

  onSubmit() {
    console.log('Form submitted', this.registerForm.value);
    if (this.registerForm.valid) {
      this.isLoading = true;
      console.log('Form is valid, would call API here');
      // Simulate API call
      setTimeout(() => {
        this.isLoading = false;
        alert('Registration would be successful here');
        this.router.navigate(['/login']);
      }, 2000);
    } else {
      console.log('Form is invalid');

      Object.keys(this.registerForm.controls).forEach(key => {
        this.registerForm.get(key)?.markAsTouched();
      });
    }
  }
}
