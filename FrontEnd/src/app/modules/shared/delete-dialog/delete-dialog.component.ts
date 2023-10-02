import { Component, Inject } from '@angular/core';

import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { ProyectComponent } from '../../features/proyect/proyect.component';

@Component({
  selector: 'app-delete-dialog',
  templateUrl: './delete-dialog.component.html',
  styleUrls: ['./delete-dialog.component.scss']
})
export class DeleteDialogComponent {

  constructor(
    public dialogRef: MatDialogRef<ProyectComponent>,
    @Inject(MAT_DIALOG_DATA) public data: deleteData,


  ) { }

}

export interface deleteData{
  type: string;
  name: string;
}
