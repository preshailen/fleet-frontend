// angular import
import { Component, inject } from '@angular/core';
import { animate, style, transition, trigger } from '@angular/animations';

// bootstrap import
import { NgbDropdownConfig } from '@ng-bootstrap/ng-bootstrap';

// project import
import { SharedModule } from '../../../../shared/shared.module';
import { AuthService } from '../../../../../core/services/auth.service';
import { Router } from '@angular/router';
import { AlertService } from '../../../../../core/services/alert.service';

@Component({
  selector: 'app-nav-right',
  imports: [SharedModule],
  templateUrl: './nav-right.component.html',
  styleUrls: ['./nav-right.component.scss'],
  providers: [NgbDropdownConfig]
})
export class NavRightComponent {
  private authService = inject(AuthService);
  private alertService = inject(AlertService);
  public name: string | undefined = '';
  private router = inject(Router);

  ngOnInit(): void {
    this.name = this.authService.getUser()?.email;
  }
  logout() {
    this.authService.logout().subscribe({
      next: () => this.alertService.success('Successfully logged out!'),
      error: (err) => this.alertService.error(err.error.message),
      complete: () => this.router.navigate(['/auth/login'])
    })
  }
}
