import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

import { FormBuilder, FormControl, FormGroup,Validators } from '@angular/forms';
import { ProyectComponent } from '../../features/proyect/proyect.component';


@Component({
  selector: 'app-epic-form',
  templateUrl: './epic-form.component.html',
  styleUrls: ['./epic-form.component.scss']
})
export class EpicFormComponent {

  epicForm! : FormGroup;

  constructor(
    public dialogRef: MatDialogRef<ProyectComponent>,
    @Inject(MAT_DIALOG_DATA) public data: epicaForm,
    private formBuilder : FormBuilder,

  ) { }



  ngOnInit(): void {
    this.epicForm = this.formBuilder.group({
      project : new FormControl(this.data.project),
      name : new FormControl(this.data.name,Validators.required),
      description : new FormControl(this.data.description, Validators.required),
      icon : new FormControl(this.data.icon, Validators.required)
    })
  }

  onSubmit(){
    if(this.epicForm.valid){
      this.dialogRef.close(this.epicForm);
    }else{
      console.log("this form is not valid");
    }
  }


}

export interface epicaForm {
  project: string;
  name: string;
  description: string;
  icon: string;
  option: string
}