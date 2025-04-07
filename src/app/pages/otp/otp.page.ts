import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { IonicModule } from '@ionic/angular';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-otp',
  standalone: true,
  imports: [IonicModule, FormsModule, CommonModule],
  templateUrl: './otp.page.html',
  styleUrls: ['./otp.page.scss'],
})
export class OtpPage {
  otp: string = '';
  validationError: string = '';
  isOtpVerified: boolean = false;

  constructor(private router: Router) {}

  onOtpInput(event: any) {
    const input = event.target.value.replace(/\D/g, ''); // Keep only digits
    this.otp = input;
  }

  blockNonNumbers(event: KeyboardEvent) {
    const charCode = event.key.charCodeAt(0);
    // Allow only digits (0–9)
    if (charCode < 48 || charCode > 57) {
      event.preventDefault();
    }
  }

  verifyOtp() {
    const correctOtp = '123456'; // Mock OTP for validation
    if (this.otp === correctOtp) {
      this.isOtpVerified = true;
      this.validationError = '';
      
      // Display success message and then navigate to dashboard after a delay
      setTimeout(() => {
        this.router.navigate(['/dashboard']);
      }, 1500); 
    } else {
      this.validationError = 'Incorrect OTP. Please try again.';
      this.isOtpVerified = false;
    }
  }
}
