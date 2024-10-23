import {Component, inject} from '@angular/core';
import {MatTooltipModule} from '@angular/material/tooltip';
import {MatIcon} from '@angular/material/icon';
import {MatButton} from '@angular/material/button';
import {CreateFolderDialogComponent} from '../../components/budget/create-folder-dialog/create-folder-dialog.component';
import {MatDialog} from '@angular/material/dialog';

@Component({
  selector: 'app-budget',
  standalone: true,
  imports: [MatTooltipModule, MatIcon, MatButton, CreateFolderDialogComponent],
  templateUrl: './budget.component.html',
  styleUrl: './budget.component.css'
})
export class BudgetComponent {

  readonly dialog = inject(MatDialog);

  constructor() { }

  openDialog() {
    const dialogRef = this.dialog.open(CreateFolderDialogComponent, {
      width: '60rem',
      maxWidth: 'none'
    });
    dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog result: ${result}`);
    });
  }
}
