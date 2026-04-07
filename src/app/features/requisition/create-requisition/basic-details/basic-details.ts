import { Component, ElementRef, inject, input, OnInit, output, signal, viewChild, ViewEncapsulation } from '@angular/core';
import { Field } from '@angular/forms/signals';
import { HelpersService } from '../../../../core/services/helpers.service';
import { AuthService } from '../../../../core/services/auth.service';
import { NgbTooltip } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-basic-details',
  imports: [Field, NgbTooltip],
  templateUrl: './basic-details.html',
  styleUrls: ['./basic-details.scss', '../shared/shared.scss']
})
export class BasicDetails implements OnInit {
  basicDetailsForm = input<any>();
  validationForm = input<any>();
  public submitted = signal(false);
  goForward = output<any>();
  setEmail = output<any>();
  userEmail = signal<string | undefined>('');
  public helperService = inject(HelpersService);
  private authService = inject(AuthService);
  emailCheckbox = viewChild<ElementRef<HTMLInputElement>>('emailCheckbox');
  
  ngOnInit(): void {
    this.userEmail.set(this.authService.getUser()?.email);
  }
  next() {
    this.submitted.set(true);
    if (!this.validationForm().invalid()) {
      this.goForward.emit(true);
    }
  }
  changeEmail(event: Event) {
    if ((event.target as HTMLInputElement).checked) {
      this.setEmail.emit(this.userEmail());
    } else {
      this.setEmail.emit('');
    }
  };
  uncheck() {
    const el = this.emailCheckbox();
    if (el) {
      el.nativeElement.checked = false;
    }
  }
}
