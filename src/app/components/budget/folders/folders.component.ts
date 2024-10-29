import {ChangeDetectionStrategy, Component, signal, viewChild} from '@angular/core';
import {BudgetService} from '../../../services/budget.service';
import {MessagesService} from '../../../services/messages.service';
import {MatCardModule} from '@angular/material/card';
import {MatAccordion, MatExpansionModule} from '@angular/material/expansion';
import {NgStyle} from '@angular/common';
import {MatIcon} from '@angular/material/icon';
import {MatButtonModule} from '@angular/material/button';

@Component({
  selector: 'app-folders',
  standalone: true,
  imports: [MatExpansionModule, NgStyle, MatIcon, MatButtonModule],
  templateUrl: './folders.component.html',
  styleUrl: './folders.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class FoldersComponent {
  accordion = viewChild.required(MatAccordion);
  readonly panelOpenState = signal(false);

  constructor(public budgetService : BudgetService,
              private messageService : MessagesService) {
  }
}
