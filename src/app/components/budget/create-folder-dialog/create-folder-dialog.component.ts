import {ChangeDetectionStrategy, Component, signal, WritableSignal} from '@angular/core';
import {MatDialogModule} from '@angular/material/dialog';
import {MatButtonModule} from '@angular/material/button';
import {FormControl, FormsModule, ReactiveFormsModule, Validators} from '@angular/forms';
import {MatError, MatFormField, MatLabel} from '@angular/material/form-field';
import {MatInput} from '@angular/material/input';
import {takeUntilDestroyed} from '@angular/core/rxjs-interop';
import {merge} from 'rxjs';
import {NgxColorsModule} from 'ngx-colors';
import {MatIcon} from '@angular/material/icon';
import {MatExpansionModule} from '@angular/material/expansion';
import {MatChipsModule} from '@angular/material/chips';

@Component({
  selector: 'app-create-folder-dialog',
  standalone: true,
  imports: [MatDialogModule, MatButtonModule, FormsModule, MatError,
    MatFormField, MatInput, MatLabel, ReactiveFormsModule, NgxColorsModule, MatIcon, MatExpansionModule, MatChipsModule],
  templateUrl: './create-folder-dialog.component.html',
  styleUrl: './create-folder-dialog.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CreateFolderDialogComponent {

  readonly name: FormControl<string | null> = new FormControl('', [Validators.required]);
  color :string | undefined;

  // Error message signals
  nameErrorMessage: WritableSignal<string> = signal('');

  constructor() {
    merge(
      this.name.statusChanges,
      this.name.valueChanges
    )
      .pipe(takeUntilDestroyed())
      .subscribe(() => {
        this.updateErrorMessages();
      });
  }

  public updateErrorMessages(): void {
    this.nameErrorMessage.set(this.getErrorMessage(this.name, 'name'));
  }

  public getErrorMessage(control: FormControl, fieldName: string): string {
    if (control.hasError('required')) {
      return `You must enter a ${fieldName}`;
    }
    return '';
  }
}
