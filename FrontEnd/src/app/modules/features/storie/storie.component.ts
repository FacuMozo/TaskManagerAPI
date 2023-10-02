import { Component, Input } from '@angular/core';
import { Story } from '../../models/cstory.model';
import { Task } from '../../models/ctask.model';
import { Observable, Subscription } from 'rxjs';
import { MatDialog } from '@angular/material/dialog';
import { TasksService } from '../../core/services/tasks/tasks.service';
import { TaskFormComponent } from '../task-form/task-form.component';
import { DeleteDialogComponent } from '../../shared/delete-dialog/delete-dialog.component';
import { ActivatedRoute } from '@angular/router';
import { StoriesService } from '../../core/services/stories/stories.service';
import { StoryFormComponent } from '../story-form/story-form.component';
import { LoadingDialogComponent } from '../../shared/loading-dialog/loading-dialog.component';
import { DialogNotificationComponent } from '../../shared/dialog-notification/dialog-notification.component';

@Component({
  selector: 'app-storie',
  templateUrl: './storie.component.html',
  styleUrls: ['./storie.component.scss'],
})
export class StorieComponent {
  projectId: string;
  epicId: string;
  storyId: string;

  errorGetStory: boolean = false;

  story !: Story;

  tasks: Task[] = [];
  tasksSubscription: Subscription = new Subscription();
  errorGetTasks: boolean = false;
  errorNoTasks: boolean = false;

  constructor(
    private route: ActivatedRoute,
    private ts: TasksService,
    public dialog: MatDialog,
    public storiesService: StoriesService
  ) {
    this.projectId = this.route.snapshot.params['projectId'];
    this.epicId = this.route.snapshot.params['epicId'];
    this.storyId = this.route.snapshot.params['storieId'];


  }

  ngOnInit(): void {
    this.getStory();
    this.getTasks();
  }

  getStory() {
    this.storiesService.getStoryById(this.storyId).subscribe(response => {
      if (response.status == "success") {
        this.story = response.data
      } else {
        this.errorGetStory = true

      }
    })
  }

  getTasks() {
    this.ts.getTasksApi(this.storyId).subscribe((response) => {
      if (response.status == 'success') {
        this.tasks = response.data;
        if (this.tasks.length == 0) {
          this.errorNoTasks = true;
        } else {
          this.errorNoTasks = false
        }
      } else {
        this.errorGetTasks = true;
      }
    });
  }

  addTask() {
    let dialogRef = this.dialog.open(TaskFormComponent, {
      data: {
        name: '',
        description: '',
        story: this.storyId,
        created: new Date(),
        due: new Date(),
        done: false,
      },
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result.value != undefined) {
        const loadingDialog = this.dialog.open(LoadingDialogComponent)
        // this.newTask(result.value);
        this.ts.newTask(result.value).subscribe((response) => {
          loadingDialog.close();
          if ((response.succes = 'succes')) {
            this.getTasks();
            this.dialog.open(DialogNotificationComponent, {
              data: { title: "Success adding Task: " + result.value.name, mensaje: "The task has been added" }
            })
          } else {
            this.dialog.open(DialogNotificationComponent, {
              data: { title: "Error adding Task: " + result.value.name, mensaje: "Error in comunication with Database." }
            })

          }
        });
      }
    });
  }


  updateTask(task: Task): void {

    let dialogRef = this.dialog.open(TaskFormComponent, {
      data: {
        name: task.name,
        description: task.description,
        story: task.story,
        created: task.created,
        due: task.due,
        done: task.done,
      },
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result.value != undefined) {
        const loadingDialog = this.dialog.open(LoadingDialogComponent)
        this.ts.editTask(result.value, task._id).subscribe((response) => {
          loadingDialog.close();
          if ((response.success = 'success')) {
            this.getTasks();
            this.dialog.open(DialogNotificationComponent, {
              data: { title: "Success editing task: " + result.value.name, mensaje: "The task has been edited" }
            })
          } else {
            this.dialog.open(DialogNotificationComponent, {
              data: { title: "Error adding Task: " + result.value.name, mensaje: "Error in comunication with Database." }
            })

          }
        });
      }
    });
  }

  deleteTask(task: Task, type: string) {
    let dialogRef = this.dialog.open(DeleteDialogComponent, {
      data: { type: "Task", name: task.name },
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result === true) {
        const loadingDialog = this.dialog.open(LoadingDialogComponent);
        this.ts.deleteTask(task._id).subscribe(response => {
          loadingDialog.close()
          if (response.success = "success") {
            this.getTasks();
            this.dialog.open(DialogNotificationComponent, {
              data: { title: "Success deleting Task: " + task.name, mensaje: "The task has been deleted" }
            })
          } else {
            this.dialog.open(DialogNotificationComponent, {
              data: { title: "Error deleting Task: " + task.name, mensaje: "Error in comunication with Database." }
            })

          }
        })
      }
    });
  }

  updateStory() {


    let dialogRef = this.dialog.open(StoryFormComponent, {
      data: {
        name: this.story.name, description: this.story.description,
        epic: this.story.epic, sprint: this.story.sprint, owner: this.story.owner,
        assignedTo: this.story.assignedTo, points: this.story.points,
        created: this.story.created, due: this.story.due, start: this.story.started,
        end: this.story.finished, status: this.story.status, option: 'Edit'
      }
    })

    dialogRef.afterClosed().subscribe((result) => {
      if (result.value != undefined) {

        const loadingDialog = this.dialog.open(LoadingDialogComponent)
        this.storiesService.editStory(result.value, this.storyId).subscribe((response) => {
          loadingDialog.close()
          if ((response.status = 'success')) {
            this.getStory();
            this.dialog.open(DialogNotificationComponent, {
              data: { title: "Success editing Story: " + this.story.name, mensaje: "The task has been edited" }
            })
          } else {
            this.dialog.open(DialogNotificationComponent, {
              data: { title: "Error editing Story: " + this.story.name, mensaje: "Error in comunication with Database." }
            })
          }
        });
      }
    });
  }

}

export interface formTask {
  name: string;
  description: string;
  due: Date;
}
