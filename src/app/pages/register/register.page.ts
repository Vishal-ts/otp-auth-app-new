import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { IonicModule } from '@ionic/angular';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [IonicModule, FormsModule, CommonModule],
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
})
export class RegisterPage {
  selectedCountryCode: string = '+91';
  mobileNumber: string = '';
  validationError: string = '';
  showSuccessMessage: boolean = false;

  countryCodes: string[] = ['+91', '+1', '+44', '+61', '+81'];

  constructor(private router: Router) {}

  sendOtp() {
    if (!this.mobileNumber.trim()) {
      this.validationError = 'Mobile number is required.';
      this.showSuccessMessage = false;
      return;
    }

    const countryLengthMap: { [key: string]: number } = {
      '+91': 10,
      '+1': 10,
      '+44': 10,
      '+61': 9,
      '+81': 10
    };

    const expectedLength = countryLengthMap[this.selectedCountryCode] || 10;
    const numberRegex = new RegExp(`^[0-9]{${expectedLength}}$`);

    if (!numberRegex.test(this.mobileNumber)) {
      this.validationError = `Please enter a valid ${expectedLength}-digit mobile number for ${this.selectedCountryCode}.`;
      this.showSuccessMessage = false;
      return;
    }

    this.validationError = '';
    this.showSuccessMessage = true;
    console.log('Sending OTP to:', this.selectedCountryCode + this.mobileNumber);
  }

  goToOtpPage() {
    this.router.navigate(['/otp']);
  }

  onNumberInput(event: any) {
    const input = event.target.value.replace(/\D/g, ''); 
    this.mobileNumber = input;
  }

  blockNonNumbers(event: KeyboardEvent) {
    const charCode = event.key.charCodeAt(0);
    if (charCode < 48 || charCode > 57) {
      event.preventDefault();
    }
  }
}
