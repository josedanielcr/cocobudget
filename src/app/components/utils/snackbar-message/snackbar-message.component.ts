import {Component, Inject, inject, Input} from '@angular/core';
import {SnackbarHorizontalPosition, SnackbarType, SnackbarVerticalPosition} from './snackbar-message.enum';
import {
  MAT_SNACK_BAR_DATA,
  MatSnackBar, MatSnackBarAction, MatSnackBarActions,
  MatSnackBarHorizontalPosition, MatSnackBarLabel,
  MatSnackBarRef,
  MatSnackBarVerticalPosition
} from '@angular/material/snack-bar';
import {MatButton} from '@angular/material/button';
import {MatIcon} from '@angular/material/icon';
import {NgClass} from '@angular/common';

@Component({
  selector: 'app-snackbar-message',
  standalone: true,
  imports: [],
  templateUrl: './snackbar-message.component.html',
  styleUrl: './snackbar-message.component.css'
})
export class SnackbarMessageComponent {

  private _snackBar = inject(MatSnackBar);
  private readonly SNACK_BAR_DURATION_MS: number = 3000;

  openSnackBar(
    message: string,
    type: SnackbarType,
    verticalPosition: MatSnackBarVerticalPosition = SnackbarVerticalPosition.BOTTOM,
    horizontalPosition: MatSnackBarHorizontalPosition = SnackbarHorizontalPosition.END
  ) {
    this._snackBar.openFromComponent(SnackbarInternalComponent, {
      data: { message: message, type: type },
      duration: this.SNACK_BAR_DURATION_MS,
      verticalPosition: verticalPosition,
      horizontalPosition: horizontalPosition
    });
  }
}

@Component({
  selector: 'app-snackbar-internal',
  standalone: true,
  imports: [
    MatSnackBarLabel,
    MatSnackBarActions,
    MatButton,
    MatSnackBarAction,
    MatIcon,
    NgClass
  ],
  templateUrl: './internal-snackbar.html',
  styleUrl: './internal-snackbar.css'
})
export class SnackbarInternalComponent {
  snackBarRef = inject(MatSnackBarRef);

  //generate a Map with all the types and theri respective icons
  public _typeIconMap : Map<SnackbarType, string> = new Map([
    [SnackbarType.INFO, 'info'],
    [SnackbarType.SUCCESS, 'check_circle'],
    [SnackbarType.WARNING, 'warning'],
    [SnackbarType.ERROR, 'error']
  ]);

  constructor(@Inject(MAT_SNACK_BAR_DATA) public data: { message: string, type: SnackbarType }) {}

  getAssertedIcon() {
    return this._typeIconMap.get(this.data.type);
  }
}
