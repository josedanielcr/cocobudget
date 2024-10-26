import {AfterViewInit, Component, effect, inject, OnInit} from '@angular/core';
import {MatTooltipModule} from '@angular/material/tooltip';
import {MatIcon} from '@angular/material/icon';
import {MatButton} from '@angular/material/button';
import {CreateFolderDialogComponent} from '../../components/budget/create-folder-dialog/create-folder-dialog.component';
import {MatDialog} from '@angular/material/dialog';
import {BudgetService} from '../../services/budget.service';
import {AccountService} from '../../services/account.service';
import {Folder} from '../../models/business/Folder';
import {Result} from '../../models/Result';
import {HttpErrorResponse} from '@angular/common/http';

@Component({
  selector: 'app-budget',
  standalone: true,
  imports: [MatTooltipModule, MatIcon, MatButton, CreateFolderDialogComponent],
  templateUrl: './budget.component.html',
  styleUrl: './budget.component.css'
})
export class BudgetComponent {

  readonly dialog = inject(MatDialog);
  folders : Folder[] = [];

  private userFoldersEffect = effect(() => {
    const user = this.accountService.user();
    if (user) {
      this.budgetService.getUserFolders(user.id).subscribe({
        next : (response : Result<Folder[]>) => {
          console.log(response)
        },
        error : (response :  HttpErrorResponse) => {
        }
      });
    }
  });

  constructor(private budgetService : BudgetService,
              private accountService : AccountService) { }


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
