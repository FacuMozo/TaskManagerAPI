import { Component, OnInit, Inject } from '@angular/core';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import { EpicComponent } from '../epic/epic.component';
import { User } from '../../models/user.model';
import { UserService } from '../../core/services/user.service';

@Component({
  selector: 'app-story-form',
  templateUrl: './story-form.component.html',
  styleUrls: ['./story-form.component.scss']
})
export class StoryFormComponent implements OnInit{

  storyForm !: FormGroup;
  users?:User[];

  constructor(private fb: FormBuilder, public dialogRef : MatDialogRef<EpicComponent>, private userService : UserService,
     @Inject(MAT_DIALOG_DATA) 
     public data : storyForms){}

  ngOnInit(): void {
    this.userService.getUsers().subscribe( resp => {
      this.users = resp;
    });

    this.storyForm = this.fb.group({
      epic : new FormControl(this.data.epic),
      name: new FormControl(this.data.name, Validators.required),
      description: new FormControl(this.data.description, Validators.required),
      points: new FormControl(this.data.points, Validators.required),
      assignedTo: new FormControl(this.data.assignedTo, Validators.required),
      created : new FormControl(this.data.created),
      due: new FormControl(this.data.due),
      started: new FormControl(this.data.start),
      finished: new FormControl(this.data.end),
      status: new FormControl(this.data.status,  Validators.required),
      owner: new FormControl(this.data.owner, Validators.required),

    });

   
  }

  onSubmit(){
    if(this.storyForm.valid){
      this.dialogRef.close(this.storyForm)
    }else{      
    }
  }
}

export interface storyForms{
  epic : string;
  name : string;
  description : string;
  points : number;
  assignedTo: string[];
  created : Date; 
  due :Date;
  start :Date;
  end : Date;
  status : String; 
  option : string;
  owner : string;

}
