import {Component, Inject, Input, OnDestroy, OnInit} from '@angular/core';
import {MenuOption} from '../../../models/menuOption';
import {MatIcon} from '@angular/material/icon';
import {NgClass} from '@angular/common';
import {NavigationEnd, Router} from '@angular/router';
import {filter, Subscription} from 'rxjs';
import {MSAL_GUARD_CONFIG, MsalBroadcastService, MsalGuardConfiguration, MsalService} from '@azure/msal-angular';

@Component({
  selector: 'app-option',
  standalone: true,
  imports: [MatIcon,NgClass ],
  templateUrl: './option.component.html',
  styleUrl: './option.component.css'
})
export class OptionComponent implements OnInit, OnDestroy{

  //constants
  private readonly LOGOUT_ROUTE = 'logout';

  @Input() option : MenuOption | null = null;
  isOptionHovered: boolean = false;
  fullUrlPath : string = '';
  routerSubscription: Subscription = new Subscription();

  constructor(private router : Router,
              @Inject(MSAL_GUARD_CONFIG) private msalGuardConfig: MsalGuardConfiguration,
              private authService: MsalService,
              private msalBroadcastService: MsalBroadcastService,) {}

  ngOnDestroy(): void {
    if (this.routerSubscription) {
      this.routerSubscription.unsubscribe();
    }
  }

  ngOnInit(): void {
    this.fullUrlPath = this.router.url;
    this.routerSubscription = this.router.events
    .pipe(
      filter(event => event instanceof NavigationEnd) // Filter only NavigationEnd events
    )
    .subscribe((event: NavigationEnd) => {
      this.fullUrlPath = event.urlAfterRedirects;
    });
  }

  getAssertedOptionIcon(option: MenuOption | null) {
    return option?.icon as string;
  }

  onOptionClick(option: MenuOption | null) {
    if(option?.route !== this.LOGOUT_ROUTE){
      this.router.navigate([option?.route as string]).then();
      return;
    }
    //Logout
    this.logout();
  }

  private logout() {
    this.authService.logoutPopup({
      mainWindowRedirectUri: '/landing',
    });
  }
}
