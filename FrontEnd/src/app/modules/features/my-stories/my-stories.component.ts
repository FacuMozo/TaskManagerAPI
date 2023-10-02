import { Component } from '@angular/core';
import { StoriesService } from '../../core/services/stories/stories.service';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute } from '@angular/router';
import { Story } from '../../models/cstory.model';
import { StoryFormComponent } from '../story-form/story-form.component';
import { DeleteDialogComponent } from '../../shared/delete-dialog/delete-dialog.component';
import { UserService } from '../../core/services/user.service';
import { User } from '../../models/user.model';
import { LoadingDialogComponent } from '../../shared/loading-dialog/loading-dialog.component';
import { DialogNotificationComponent } from '../../shared/dialog-notification/dialog-notification.component';

@Component({
  selector: 'app-my-stories',
  templateUrl: './my-stories.component.html',
  styleUrls: ['./my-stories.component.scss']
})
export class MyStoriesComponent {

  constructor(private ss: StoriesService, public dialog: MatDialog,
     private userService: UserService,) {}

  stories !: Story[];
  cantStoriesIsZero: boolean = false;
  errorGetStories : boolean = false;
  users : User[] = [];

  ngOnInit(){
    this.getStories();
    this.getUsers();
  }

  getStories(){
    
    this.ss.getAllStories().subscribe(response => {
      if(response.status == "success"){
        this.stories = response.data;
        if(this.stories.length == 0){
          this.cantStoriesIsZero = true;
        }
      }else{
        this.errorGetStories = true;
      }
    })
  }

  updateStory(story : Story){
    let dialogRef = this.dialog.open(StoryFormComponent,{
      data : {name : story.name,
         description : story.description,
          epic : story.epic, 
          sprint: story.sprint, 
          owner : story.owner,
          assignedTo : story.assignedTo, 
          points : story.points,created: 
          story.created, due :story.due, 
          start :story.started, 
          end :story.finished, status : story.status, option : 'Edit'}
    })

    dialogRef.afterClosed().subscribe(result =>{
      
      if (result.value != undefined){
        this.ss.editStory(result.value, story.getId()).subscribe(resp =>{
          if (resp.status == "success"){
            this.getStories();
          }
        })
      }
  })
  }


  deleteStory(story: Story, type: string) {
    let dialogRef = this.dialog.open(DeleteDialogComponent, {
      data: { type: "Story", name: story.name },
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result === true) {
        const loadingDialog = this.dialog.open(LoadingDialogComponent);
        this.ss.deleteStory(story._id).subscribe(response => {
          loadingDialog.close()
          if (response.success = "success") {
            this.getStories();
            this.dialog.open(DialogNotificationComponent, {
              data: { title: "Success deleting story: " + story.name, mensaje: "The task has been deleted" }
            })
          } else {
            this.dialog.open(DialogNotificationComponent, {
              data: { title: "Error deleting story: " + story.name, mensaje: "Error in comunication with Database." }
            })

          }
        })
      }
    });
  }

  getUsers() {
    this.userService.getUsers().subscribe(
      users => {
        this.users = users;
      })
  }

  getUsersOfStory(ids: string[]): User[] {
    return this.users.filter(user => ids.includes(user._id));
  }

  getOwner(id: string) {
    return this.users.find(user => id === user._id)?.getName();

  }

  
}
