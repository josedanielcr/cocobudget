import {Component, ViewChild} from '@angular/core';
import {RouterOutlet} from '@angular/router';
import {MatDrawer, MatSidenavModule} from '@angular/material/sidenav';
import {MatButtonModule} from '@angular/material/button';
import {MatIconModule} from '@angular/material/icon';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [RouterOutlet, MatSidenavModule, MatButtonModule, MatIconModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {

  @ViewChild('drawer') drawer : MatDrawer | undefined;

  isExpanded : boolean = true;

  toggleNav() {
    this.drawer?.toggle();
    this.isExpanded = !this.isExpanded;
  }
}
