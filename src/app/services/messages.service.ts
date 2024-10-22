import { Injectable } from '@angular/core';
import {SnackbarMessageComponent} from '../components/utils/snackbar-message/snackbar-message.component';
import {
  SnackbarHorizontalPosition,
  SnackbarType,
  SnackbarVerticalPosition
} from '../components/utils/snackbar-message/snackbar-message.enum';
import {MatSnackBarHorizontalPosition, MatSnackBarVerticalPosition} from '@angular/material/snack-bar';

@Injectable({
  providedIn: 'root'
})
export class MessagesService {

  private snackbarComponent : SnackbarMessageComponent | undefined;

  constructor() { }

  setSnackbarComponent(snackbarComponent : SnackbarMessageComponent) {
    this.snackbarComponent = snackbarComponent;
  }
  showSnackbarMessage(
    message: string,
    type: SnackbarType = SnackbarType.INFO,
    verticalPosition: MatSnackBarVerticalPosition = SnackbarVerticalPosition.BOTTOM,
    horizontalPosition: MatSnackBarHorizontalPosition = SnackbarHorizontalPosition.END
  ) {
    if (this.snackbarComponent) {
      this.snackbarComponent.openSnackBar(
        message,
        type,
        verticalPosition,
        horizontalPosition
      );
    }
  }
}
