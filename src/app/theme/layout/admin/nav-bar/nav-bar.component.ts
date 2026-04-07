// angular import
import { Component, output, signal, WritableSignal } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';

// project import
import { SharedModule } from '../../../shared/shared.module';
import { NavRightComponent } from './nav-right/nav-right.component';
import { NavLeft } from './nav-left/nav-left';

@Component({
  selector: 'app-nav-bar',
  imports: [SharedModule, NavRightComponent, NavLeft, RouterModule, CommonModule],
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.scss']
})
export class NavBarComponent {
  // public props
  menuClass: boolean;
  collapseStyle: string;
  windowWidth: number;

  NavCollapse = output();
  NavCollapsedMob = output();

  constructor() {
    this.menuClass = false;
    this.collapseStyle = 'none';
    this.windowWidth = window.innerWidth;
  }

  // public method
  toggleMobOption() {
    this.menuClass = !this.menuClass;
    this.collapseStyle = this.menuClass ? 'block' : 'none';
  }

  navCollapse() {
    if (this.windowWidth >= 992) {
      this.NavCollapse.emit();
    }
  }

  navCollapseMob() {
    if (this.windowWidth < 992) {
      this.NavCollapsedMob.emit();
    }
  }
}
