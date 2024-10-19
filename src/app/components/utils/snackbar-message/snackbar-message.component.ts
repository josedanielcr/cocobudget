import {Component, inject, Input} from '@angular/core';
import {SnackbarHorizontalPosition, SnackbarType, SnackbarVerticalPosition} from './snackbar-message.enum';
import {
  MatSnackBar,
  MatSnackBarHorizontalPosition,
  MatSnackBarRef,
  MatSnackBarVerticalPosition
} from '@angular/material/snack-bar';

@Component({
  selector: 'app-snackbar-message',
  standalone: true,
  imports: [],
  templateUrl: './snackbar-message.component.html',
  styleUrl: './snackbar-message.component.css'
})
export class SnackbarMessageComponent {

  @Input() message: string = '';
  @Input() type: SnackbarType = SnackbarType.INFO;
  @Input() verticalPosition : MatSnackBarVerticalPosition = SnackbarVerticalPosition.BOTTOM;
  @Input() horizontalPosition : MatSnackBarHorizontalPosition = SnackbarHorizontalPosition.END;

  private _snackBar = inject(MatSnackBar);

  openSnackBar() {
    //this._snackBar.open()
  }
}

@Component({
  selector: 'app-snackbar-internal',
  standalone: true,
  imports: [],
  templateUrl: './snackbar-message.component.html',
  styleUrl: './snackbar-message.component.css'
})
export class SnackbarInternalComponent {
  snackBarRef = inject(MatSnackBarRef);
}
