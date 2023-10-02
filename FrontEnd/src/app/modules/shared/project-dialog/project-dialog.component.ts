import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { FormBuilder, FormControl, FormGroup,Validators } from '@angular/forms';
import { ProyectListComponent } from '../../features/proyect-list/proyect-list.component';
import { UserService } from '../../core/services/user.service';
import { map } from 'rxjs/operators';
import { User } from 'src/app/modules/models/user.model';

@Component({
  selector: 'app-project-dialog',
  templateUrl: './project-dialog.component.html',
  styleUrls: ['./project-dialog.component.scss']
})
export class ProjectDialogComponent implements OnInit{

  projectForm!: FormGroup;
  users?:User[]; 

  constructor(
    public dialogRef: MatDialogRef<ProyectListComponent>,
    @Inject(MAT_DIALOG_DATA) public data: proyectoForm,
    private formBuilder : FormBuilder,
    private userService : UserService
  )
  {}

  ngOnInit(): void {
    this.projectForm = this.formBuilder.group({
      name : new FormControl(this.data.name,Validators.required),
      members : new FormControl(this.data.members, Validators.required),
      description : new FormControl(this.data.description, Validators.required),
      icon : new FormControl(this.data.icon, Validators.required)
    })
    
    this.userService.getUsers().subscribe( resp => {
  
      this.users = resp;
      
    })
  }

  onSubmit(){
    if(this.projectForm.valid){
      console.log("this form is valid ", this.projectForm);
      this.dialogRef.close(this.projectForm);
    }else{
      console.log("this form is not valid", this.projectForm);
    }
  }


}


export interface proyectoForm {
  name: string;
  members: string[];
  description: string;
  icon: string;
  option: string;
}
