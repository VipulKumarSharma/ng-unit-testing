import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { TestService } from './services/test.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'landrover-ui';
  form: FormGroup;

  constructor(private fb: FormBuilder, private  testService: TestService) {
    this.form = fb.group({
      name: ['', Validators.required],
      email: ['']
    });
  }

  compute(num: number): number {
    if (num < 0) {
      return 0;
    }
    return num + 1;
  }

  greet(name: string): string {
    return `Welcome ${name}`;
  }

  getCurrencies(): string[] {
    return ['INR', 'USD', 'AUD'];
  }

}
