import { Component, OnInit } from '@angular/core';
import { Story } from 'src/app/modules/models/cstory.model';
import { StoriesService } from '../../core/services/stories/stories.service';
import { MatDialog } from '@angular/material/dialog';
import { StoryFormComponent } from '../story-form/story-form.component';
import { ActivatedRoute } from '@angular/router';
import { DeleteDialogComponent } from '../../shared/delete-dialog/delete-dialog.component';
import { Epica } from '../../models/epic.modle';
import { EpicService } from '../../core/services/epic.service';
import { EpicFormComponent } from '../../shared/epic-form/epic-form.component';
import { UserService } from '../../core/services/user.service';
import { TokenStorageService } from '../../auth/token-storage.service';
import { User } from '../../models/user.model';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { LoadingDialogComponent } from '../../shared/loading-dialog/loading-dialog.component';
import { DialogNotificationComponent } from '../../shared/dialog-notification/dialog-notification.component';
import { TasksService } from '../../core/services/tasks/tasks.service';



@Component({
  selector: 'app-epic',
  templateUrl: './epic.component.html',
  styleUrls: ['./epic.component.scss'],
})
export class EpicComponent implements OnInit {
  epic!: Epica;
  projectId: string | null = "";
  epicId: string = "";
  stories: Story[] = [];
  errorGetStories: boolean = false;
  cantStoriesIsZero: boolean = false;

  constructor(private ss: StoriesService, private tasksService: TasksService, private epicService: EpicService, public dialog: MatDialog, private route: ActivatedRoute, private userService: UserService, private tokenService: TokenStorageService) { }

  ngOnInit(): void {
    this.projectId = this.route.snapshot.paramMap.get('projectId');
    const epicId = this.route.snapshot.paramMap.get('epicId');
    //let storiesSubscription = this.stories$.subscribe((stories) => (this.stories = stories));

    if (epicId != null) {
      this.epicId = epicId;
      this.getStories();
      this.getEpic();
    }
  }

  getEpic() {
    this.epicService.getEpicById(this.epicId).subscribe(resp => {
      this.epic = resp.data;
    })
  }

  getStories() {
    this.ss.getStories(this.epicId).subscribe(resp => {
      if (resp.status == "success") {
        this.stories = resp.data;
        this.errorGetStories = false;
        if (this.stories.length == 0) {
          this.cantStoriesIsZero = true;
        } else {
          this.cantStoriesIsZero = false;
        }
      } else {
        this.errorGetStories = true;
      }
    });
  }

  addStory() {
    let dialogRef = this.dialog.open(StoryFormComponent, {
      data: { name: '', description: '', epic: this.epicId, sprint: '', owner: '', assignedTo: [""], points: '', created: new Date(), due: '', start: '', end: '', status: '', option: 'Add new story' }
    })

    dialogRef.afterClosed().subscribe(result => {
      if (result.value != undefined) {
        const loading = this.dialog.open(LoadingDialogComponent)
        this.ss.addStory(result.value).subscribe(resp => {
          loading.close()
          if (resp.status == "success") {
            this.getStories();
            this.dialog.open(DialogNotificationComponent, {
              data: { title: "Success adding Storie: " + result.value.name, mensaje: "The storie has been added" }
            })
          } else {
            this.dialog.open(DialogNotificationComponent, {
              data: { title: "Error adding Storie: " + result.value.name, mensaje: "Error in comunication with Database." }
            })
          }
        })
      }
    })
  }

  updateStory(story: Story) {
    let dialogRef = this.dialog.open(StoryFormComponent, {
      data: { name: story.name, description: story.description, epic: story.epic, sprint: story.sprint, owner: story.owner, assignedTo: story.assignedTo, points: story.points, created: story.created, due: story.due, start: story.started, end: story.finished, status: story.status, option: 'Edit' }
    })

    dialogRef.afterClosed().subscribe(result => {

      if (result.value != undefined) {
        const loading = this.dialog.open(LoadingDialogComponent)
        this.ss.editStory(result.value, story.getId()).subscribe(resp => {
          loading.close()
          if (resp.status == "success") {
            this.getStories();
            this.dialog.open(DialogNotificationComponent, {
              data: { title: "Success editing Storie: " + result.value.name, mensaje: "The storie has been edited" }
            })
          } else {
            this.dialog.open(DialogNotificationComponent, {
              data: { title: "Error editing Storie: " + result.value.name, mensaje: "Error in comunication with Database." }
            })

          }
        })
      }
    })
  }
  //TODO ver si se elimina este metodo
  deleteStory(story: Story) {
    let dialogRef = this.dialog.open(DeleteDialogComponent, {
      data: { type: "Story ", name: story.name },
    });

    dialogRef.afterClosed().subscribe((result) => {

      if (result === true) {
        const loading = this.dialog.open(LoadingDialogComponent)
        let existsTask: boolean = false;
        this.tasksService.getTasksApi(story._id).subscribe(resp => {
          existsTask = (resp.data.length > 0)
          if (!existsTask) {
            this.ss.deleteStory(story.getId()).subscribe(resp => {
              loading.close()
              if (resp.status == "success") {
                this.getStories();
                this.dialog.open(DialogNotificationComponent, {
                  data: { title: "Success deleting Storie: " + story.name, mensaje: "The storie has been deleted" }
                })
              } else {
                this.dialog.open(DialogNotificationComponent, {
                  data: { title: "Error deleting Storie: " + story.name, mensaje: "Error in comunication with Database." }
                })

              }
            });
          } else {
            loading.close()
            this.dialog.open(DialogNotificationComponent, {
              data: { title: "Error deleting Storie: " + story.name, mensaje: "You can't delete it, this storie contains task/s." }
            })
          }
        });
      }
    });
  }

  editDialog(epica: Epica): void {
    const dialogRef = this.dialog.open(EpicFormComponent, {
      data: { project: epica.project, name: epica.name, description: epica.description, icon: epica.icon, option: "Edit" },
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result.value != undefined) {
        const loading = this.dialog.open(LoadingDialogComponent);

        this.epicService.editEpic(result.value, epica._id).subscribe(resp => {
          loading.close()
          if (resp.status == "success") {
            this.getEpic();
            this.dialog.open(DialogNotificationComponent, {
              data: { title: "Success editing Epic: " + epica.name, mensaje: "The Epic has been edited" }
            })
          } else {
            this.dialog.open(DialogNotificationComponent, {
              data: { title: "Error editing Epic: " + epica.name, mensaje: "Error in comunication with Database." }
            })
          }
         })
      }
    });
  }






}