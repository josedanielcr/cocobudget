import {Component, ViewChild} from '@angular/core';
import {RouterOutlet} from '@angular/router';
import {MatDrawer, MatSidenavModule} from '@angular/material/sidenav';
import {MatButtonModule} from '@angular/material/button';
import {MatIconModule} from '@angular/material/icon';
import {NgClass} from '@angular/common';
import {MenuOption} from '../../models/menuOption';
import {OptionsGridComponent} from '../../components/menu/options-grid/options-grid.component';
import {ProfileBannerComponent} from '../../components/utils/profile-banner/profile-banner.component';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [RouterOutlet, MatSidenavModule, MatButtonModule, MatIconModule, NgClass, OptionsGridComponent, ProfileBannerComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {

  menuOptions : MenuOption[] = [
    {icon: 'wallet', name: 'Budget', route: '/home/budget'},
    {icon: 'account_balance', name: 'Accounts', route: '/home/accounts'},
    {icon: 'receipt_long', name: 'Transactions', route: '/home/transactions'},
  ];

  bottomMenuOptions : MenuOption[] = [
    {icon: 'settings', name: 'Settings', route: '/home/settings'},
    {icon: 'logout', name: 'Logout', route: 'logout'},
  ];

  @ViewChild('drawer') drawer : MatDrawer | undefined;
  isOptionHovered : boolean = false;
  isExpanded : boolean = true;

  toggleNav() {
    this.drawer?.toggle();
    this.isExpanded = !this.isExpanded;
  }
}
