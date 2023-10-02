import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-dialog-notification',
  templateUrl: './dialog-notification.component.html',
  styleUrls: ['./dialog-notification.component.scss']
})
export class DialogNotificationComponent {
  constructor(
    @Inject(MAT_DIALOG_DATA) public data: NotificationData,
  ) { }

}

export interface NotificationData{
  title: string;
  mensaje: string;
}

