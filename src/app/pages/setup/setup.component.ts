import {ChangeDetectionStrategy, Component, Injector, OnInit, signal, WritableSignal} from '@angular/core';
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
import {MessagesService} from '../../services/messages.service';
import {SnackbarType} from '../../components/utils/snackbar-message/snackbar-message.enum';
import {Router} from '@angular/router';
import {MatStepperModule} from '@angular/material/stepper';
import {MatSelectModule} from '@angular/material/select';
import {PeriodLength} from '../../models/PeriodLength';
import {PeriodsLengthEnum} from '../../models/business/Enums/PeriodsLength.enum';
import {
  MatDatepickerModule,
} from '@angular/material/datepicker';
import {provideNativeDateAdapter} from '@angular/material/core';
import {CreatePeriodRequest} from '../../shared/models/period/CreatePeriodRequest';
import {BudgetService} from '../../services/budget.service';

@Component({
  selector: 'app-setup',
  standalone: true,
  imports: [MatFormFieldModule, MatInputModule, FormsModule, ReactiveFormsModule, MatButtonModule, MatStepperModule, MatSelectModule, MatDatepickerModule],
  templateUrl: './setup.component.html',
  styleUrl: './setup.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [provideNativeDateAdapter()]
})
export class SetupComponent {

  public periodLengths: PeriodLength[] = [];
  protected readonly PeriodLength = PeriodLength;
  protected readonly PeriodsLengthEnum = PeriodsLengthEnum;

  readonly firstName: FormControl<string | null> = new FormControl('', [Validators.required]);
  readonly lastName: FormControl<string | null> = new FormControl('', [Validators.required]);
  readonly startDate: FormControl<Date | null> = new FormControl(new Date(), [Validators.required]);
  readonly dayLength: FormControl<number | null> = new FormControl(30);
  readonly length: FormControl<number | null> = new FormControl(0);

  firstNameErrorMessage: WritableSignal<string> = signal('');
  lastNameErrorMessage: WritableSignal<string> = signal('');
  startDateErrorMessage: WritableSignal<string> = signal('');
  dayLengthErrorMessage: WritableSignal<string> = signal('');
  lengthErrorMessage: WritableSignal<string> = signal('');

  constructor(private accountService: AccountService,
              private messageService: MessagesService,
              private router: Router,
              private budgetService: BudgetService) {
    this.setFormControls();
    this.setPeriodLengthsToSelect();
  }

  private setFormControls() {
    merge(
      this.firstName.statusChanges,
      this.firstName.valueChanges,
      this.lastName.statusChanges,
      this.lastName.valueChanges,
      this.startDate.statusChanges,
      this.startDate.valueChanges,
      this.dayLength.statusChanges,
      this.dayLength.valueChanges,
      this.length.statusChanges,
      this.length.valueChanges
    )
      .pipe(takeUntilDestroyed())
      .subscribe(() => {
        this.updateErrorMessages();
      });
  }

  private setPeriodLengthsToSelect() {
    this.periodLengths = [
      new PeriodLength(PeriodsLengthEnum.Weekly, 0, 7),
      new PeriodLength(PeriodsLengthEnum.BiWeekly, 1, 14),
      new PeriodLength(PeriodsLengthEnum.Monthly, 2, new Date((this.startDate.value as Date).getFullYear(), (this.startDate.value as Date).getMonth() + 1, 0).getDate()),
      new PeriodLength(PeriodsLengthEnum.Custom, 3, this.dayLength.value!)
    ]
  }

  public updateErrorMessages(): void {
    this.firstNameErrorMessage.set(this.getErrorMessage(this.firstName, 'first name'));
    this.lastNameErrorMessage.set(this.getErrorMessage(this.lastName, 'last name'));
    this.startDateErrorMessage.set(this.getErrorMessage(this.startDate, 'start date'));
    this.dayLengthErrorMessage.set(this.getErrorMessage(this.dayLength, 'day length'));
    this.lengthErrorMessage.set(this.getErrorMessage(this.length, 'length'));
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
    if (this.firstName.invalid || this.lastName.invalid || this.startDate.invalid || this.dayLength.invalid || this.length.invalid) {
      return;
    }
    const [createUserRequest, createPeriodRequest] = this.getCreateUserAndPeriodRequests();
    this.executeUserAndPeriodSetup(createUserRequest, createPeriodRequest);
  }

  private getCreateUserAndPeriodRequests(): [CreateUserRequest, CreatePeriodRequest] {
    const createUserRequest = new CreateUserRequest(this.firstName.value!, this.lastName.value!, this.accountService.userEmail(), '');
    const createPeriodRequest = new CreatePeriodRequest(this.startDate.value as Date, this.length.value as number, this.dayLength.value!,'');
    return [createUserRequest, createPeriodRequest];
  }

  private executeUserAndPeriodSetup(createUserRequest: CreateUserRequest, createPeriodRequest: CreatePeriodRequest) {
    this.accountService.setupUser(createUserRequest).subscribe({
      next: (result: Result<User>) => {
        createPeriodRequest.userId = result.value?.id!;
        this.setupPeriod(createPeriodRequest);
      },
      error: (result: Result<User>) => {
        this.messageService.showSnackbarMessage(result.error.message, SnackbarType.ERROR);
      }
    });
  }

  isCustomPeriodChecked(): boolean {
    return this.length.value === this.periodLengths.find(periodLength => periodLength.name === PeriodsLengthEnum.Custom)?.value;
  }

  getDateRange() {
    const daysToAdd = this.getDaysToAddToHint();
    const startDate = this.startDate.value;
    const endDate = new Date(startDate as Date);
    endDate.setDate(endDate.getDate() + (daysToAdd as number));
    const formattedStartDate = startDate?.toLocaleDateString('en-US', {
      month: '2-digit',
      day: '2-digit',
      year: 'numeric'
    });
    const formattedEndDate = endDate.toLocaleDateString('en-US', {month: '2-digit', day: '2-digit', year: 'numeric'});
    return `Your period will start on ${formattedStartDate} and will finish on ${formattedEndDate}`;
  }

  private getDaysToAddToHint() {
    if (this.length.value === this.periodLengths.find(periodLength => periodLength.name === PeriodsLengthEnum.Custom)?.value) {
      return this.dayLength.value;
    }
    return this.periodLengths.find(periodLength => periodLength.value === this.length.value)?.numberOfDays;
  }

  private setupPeriod(createPeriodRequest: CreatePeriodRequest) {
    this.budgetService.createPeriod(createPeriodRequest).subscribe({
      next: (result: Result<any>) => {
        this.messageService.showSnackbarMessage('Information updated successfully', SnackbarType.SUCCESS);
        this.router.navigate(['/home/budget']).then();
      },
      error: (result: Result<any>) => {
        this.messageService.showSnackbarMessage(result.error.message, SnackbarType.ERROR);
      }
    });
  }
}
