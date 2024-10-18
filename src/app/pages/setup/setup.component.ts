import {Component, signal, WritableSignal} from '@angular/core';
import {AccountService} from '../../services/account.service';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';
import {FormControl, FormsModule, ReactiveFormsModule, Validators} from '@angular/forms';
import {merge} from 'rxjs';
import {takeUntilDestroyed} from '@angular/core/rxjs-interop';
import {MatButtonModule} from '@angular/material/button';
import {CreateUserRequest} from '../../shared/models/account/CreateUserRequest';
import {Result} from '../../models/Result';
import {User} from '../../models/business/User';

@Component({
  selector: 'app-setup',
  standalone: true,
  imports: [MatFormFieldModule, MatInputModule, FormsModule, ReactiveFormsModule, MatButtonModule],
  templateUrl: './setup.component.html',
  styleUrl: './setup.component.css'
})
export class SetupComponent {

  readonly firstName: FormControl<string | null> = new FormControl('', [Validators.required]);
  readonly lastName: FormControl<string | null> = new FormControl('', [Validators.required]);
  firstNameErrorMessage: WritableSignal<string> = signal('');
  lastNameErrorMessage: WritableSignal<string> = signal('');

  constructor(private accountService: AccountService) {
    merge(
      this.firstName.statusChanges,
      this.firstName.valueChanges,
      this.lastName.statusChanges,
      this.lastName.valueChanges
    )
    .pipe(takeUntilDestroyed())
    .subscribe(() => {
      this.updateErrorMessages();
    });
  }

  public updateErrorMessages(): void {
    this.firstNameErrorMessage.set(this.getErrorMessage(this.firstName, 'first name'));
    this.lastNameErrorMessage.set(this.getErrorMessage(this.lastName, 'last name'));
  }

  public getErrorMessage(control: FormControl, fieldName: string): string {
    if (control.hasError('required')) {
      return `You must enter a ${fieldName}`;
    } else if (control.hasError('email')) {
      return `Not a valid email for ${fieldName}`;
    }
    return '';
  }

  setupUser() {
    if(this.firstName.invalid || this.lastName.invalid){
      return;
    }

    const createUserRequest = new CreateUserRequest(this.firstName.value!, this.lastName.value!, this.accountService.userEmail());
    this.accountService.setupUser(createUserRequest).subscribe({
      next : (result : Result<User>) => {
        console.log(result);
      },
      error : (result : Result<User>) => {
        console.error(result);
      }
    });
  }
}
