import {Component, Input} from '@angular/core';
import {MenuOption} from '../../../models/menuOption';
import {OptionComponent} from '../option/option.component';

@Component({
  selector: 'app-options-grid',
  standalone: true,
  imports: [OptionComponent],
  templateUrl: './options-grid.component.html',
  styleUrl: './options-grid.component.css'
})
export class OptionsGridComponent {

  @Input() options : MenuOption[] = [];
}
