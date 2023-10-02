import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { StorieComponent } from '../storie/storie.component';

@Component({
  selector: 'app-task-form',
  templateUrl: './task-form.component.html',
  styleUrls: ['./task-form.component.scss']
})
export class TaskFormComponent implements OnInit {
  taskForm !: FormGroup;
  invalid : boolean = false;

  constructor(private fb: FormBuilder, public dialogRef : MatDialogRef<StorieComponent>,
    @Inject(MAT_DIALOG_DATA) 
    public data : { name : string, description : string, story : string,
    created : Date, due :Date, done : boolean}){}


  ngOnInit() : void {
    this.taskForm = this.fb.group({
      name : new FormControl(this.data.name, Validators.required),
      description: new FormControl(this.data.description, Validators.minLength(10)),
      story : new FormControl(this.data.story),
      created: new FormControl(this.data.created),
      due: new FormControl(this.data.due),
      done: new FormControl(this.data.done),
    })
  }


  onSubmit(){
    if(this.taskForm.valid){      
      this.dialogRef.close(this.taskForm)
    }else{
      this.invalid = true;
      
    }
  }
}


