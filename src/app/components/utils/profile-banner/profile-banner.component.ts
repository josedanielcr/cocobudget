import { Component } from '@angular/core';
import {AccountService} from '../../../services/account.service';
import {NullProfileImagePipe} from '../../../pipes/null-profile-image.pipe';

@Component({
  selector: 'app-profile-banner',
  standalone: true,
  imports: [NullProfileImagePipe],
  templateUrl: './profile-banner.component.html',
  styleUrl: './profile-banner.component.css'
})
export class ProfileBannerComponent {

  // constants
  public readonly DEFAULT_IMAGE_HEIGHT = 60;
  public readonly DEFAULT_IMAGE_WIDTH = 60;

  constructor(public accountService : AccountService) {
  }

  getCurrentUserName() {
    return this.accountService.user()?.firstName === undefined
      ? this.accountService.userEmail()
      : this.accountService.user()?.firstName;
  }
}
