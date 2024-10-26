import {ChangeDetectionStrategy, Component, signal, ViewChild, WritableSignal} from '@angular/core';
import {MatDialogModule} from '@angular/material/dialog';
import {MatButtonModule} from '@angular/material/button';
import {FormControl, FormsModule, ReactiveFormsModule, Validators} from '@angular/forms';
import {MatError, MatFormField, MatLabel} from '@angular/material/form-field';
import {MatInput} from '@angular/material/input';
import {takeUntilDestroyed} from '@angular/core/rxjs-interop';
import {merge} from 'rxjs';
import {NgxColorsComponent, NgxColorsModule} from 'ngx-colors';
import {MatIcon} from '@angular/material/icon';
import {MatExpansionModule} from '@angular/material/expansion';
import {MatChip, MatChipOption, MatChipSelectionChange, MatChipsModule} from '@angular/material/chips';
import {ChipOption} from '../../../models/chipOption';
import {NgForOf} from '@angular/common';
import {MessagesService} from '../../../services/messages.service';
import {SnackbarType} from '../../utils/snackbar-message/snackbar-message.enum';
import {CreateFolderRequest} from '../../../shared/models/account/CreateFolderRequest';
import {AccountService} from '../../../services/account.service';
import {BudgetService} from '../../../services/budget.service';
import {Result} from '../../../models/Result';
import {Folder} from '../../../models/business/Folder';

@Component({
  selector: 'app-create-folder-dialog',
  standalone: true,
  imports: [MatDialogModule, MatButtonModule, FormsModule, MatError,
    MatFormField, MatInput, MatLabel, ReactiveFormsModule, NgxColorsModule, MatIcon, MatExpansionModule, MatChipsModule, NgForOf],
  templateUrl: './create-folder-dialog.component.html',
  styleUrl: './create-folder-dialog.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CreateFolderDialogComponent {
  @ViewChild('colorPicker') colorPicker!: NgxColorsComponent;
  chipOptions: ChipOption[] = [
    { name: 'Folder', icon: 'folder', value: 'folder' },
    { name: 'Wallet', icon: 'account_balance_wallet', value: 'wallet' },
    { name: 'Shopping Cart', icon: 'shopping_cart', value: 'shopping_cart' },
    { name: 'Home', icon: 'home', value: 'home' },
    { name: 'Car', icon: 'directions_car', value: 'car' },
    { name: 'Dining', icon: 'local_dining', value: 'dining' },
    { name: 'Money', icon: 'attach_money', value: 'money' },
    { name: 'Credit Card', icon: 'credit_card', value: 'credit_card' },
    { name: 'Work', icon: 'work', value: 'work' },
    { name: 'Offer', icon: 'local_offer', value: 'offer' },
    { name: 'Subscriptions', icon: 'subscriptions', value: 'subscriptions' },
    { name: 'Build', icon: 'build', value: 'build' },
    { name: 'Health & Safety', icon: 'health_and_safety', value: 'health' },
    { name: 'Travel', icon: 'travel_explore', value: 'travel' },
    { name: 'Event', icon: 'event', value: 'event' },
  ];

  readonly name: FormControl<string | null> = new FormControl('', [Validators.required]);
  selectedChip : MatChipOption | undefined;
  // Error message signals
  nameErrorMessage: WritableSignal<string> = signal('');

  constructor(private messageService : MessagesService,
              private accountService : AccountService,
              private budgetService : BudgetService) {
    merge(
      this.name.statusChanges,
      this.name.valueChanges
    )
      .pipe(takeUntilDestroyed())
      .subscribe(() => {
        this.updateErrorMessages();
      });
  }

  updateErrorMessages(): void {
    this.nameErrorMessage.set(this.getErrorMessage(this.name, 'name'));
  }

  getErrorMessage(control: FormControl, fieldName: string): string {
    if (control.hasError('required')) {
      return `You must enter a ${fieldName}`;
    }
    return '';
  }

  onChipSelectionChange(event: MatChipSelectionChange): void {
    this.selectedChip = event.source;
  }

  createFolder() {
    if(this.name.invalid || this.selectedChip === undefined || this.colorPicker.color === undefined){
      this.messageService.showSnackbarMessage('Please fill out all fields', SnackbarType.ERROR);
      return;
    }

    const createFolderRequest = new CreateFolderRequest(this.name.value as string, this.selectedChip.value, this.colorPicker.color, this.accountService.user()?.id as string);

    this.budgetService.createFolder(createFolderRequest).subscribe(({
      next : (response : Result<Folder>) => {
        console.log(response);
      },
      error : (response : Result<Folder>) => {
        this.messageService.showSnackbarMessage(response.error.message, SnackbarType.ERROR);
      }
    }))
  }
}
