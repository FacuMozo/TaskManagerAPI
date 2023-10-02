import { Component, OnInit, Inject, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { MatDialog, MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Subscription } from 'rxjs';

import { EpicService } from '../../core/services/epic.service';
import { Project } from '../../models/cproject.model';
import { Epica } from '../../models/epic.modle';
import { EpicFormComponent } from '../../shared/epic-form/epic-form.component';
import { DeleteDialogComponent } from '../../shared/delete-dialog/delete-dialog.component';
import { ProjectDialogComponent } from '../../shared/project-dialog/project-dialog.component';
import { ProjectsService } from '../../core/services/projects/projects.service';
import { StoriesService } from '../../core/services/stories/stories.service';
import { LoadingDialogComponent } from '../../shared/loading-dialog/loading-dialog.component';
import { DialogNotificationComponent } from '../../shared/dialog-notification/dialog-notification.component';

@Component({
  selector: 'app-proyect',
  templateUrl: './proyect.component.html',
  styleUrls: ['./proyect.component.scss']
})
export class ProyectComponent implements OnInit {

  project!: Project;
  epics: Epica[] = []
  projectId: string = "";
  errorGetEpics: boolean = false;
  cantEpicsIsZero: boolean = false;
  projectServiceSubscription!: Subscription;

  constructor(private route: ActivatedRoute,
    private dialog: MatDialog,
    private epicService: EpicService,
    private projectsService: ProjectsService,
    private storiesService: StoriesService) { }

  ngOnInit(): void {
    const projectId = this.route.snapshot.paramMap.get('projectId')


    if (projectId != null) {
      this.projectId = projectId;
      this.getEpics();
      this.getProject();
    }
  }
  getProject() {
    this.projectsService.getProjectById(this.projectId).subscribe(resp => {
      this.project = resp.data;
    })
  }

  getEpics() {
    this.epicService.getEpics(this.projectId).subscribe(resp => {

      if (resp.status == "success") {
        this.epics = resp.data;
        this.errorGetEpics = false;
        if (this.epics.length == 0) {
          this.cantEpicsIsZero = true;
        } else {
          this.cantEpicsIsZero = false;
        }
      } else {
        this.errorGetEpics = true;
      }
    });
  }

  newEpicDialog(): void {
    const dialogRef = this.dialog.open(EpicFormComponent, {
      data: { project: this.projectId, name: "", description: "", icon: "", option: " Add new" },
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result.value != undefined) {
        const loading = this.dialog.open(LoadingDialogComponent);
        this.epicService.saveEpic(result.value).subscribe(resp => {
          loading.close();
          if (resp.status == "success") {
            this.dialog.open(DialogNotificationComponent, {
              data: { title: "Success adding Epic: " + result.value.name, mensaje: "The epic has been added" }
            });
            this.getEpics();

          } else {
            this.dialog.open(DialogNotificationComponent, {
              data: { title: "Error adding Epic: " + result.value.name, mensaje: "Error in comunication with Database." }
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
          loading.close();
          if (resp.status == "success") {
            this.dialog.open(DialogNotificationComponent, {
              data: { title: "Success editing Epic: " + result.value.name, mensaje: "The epic has been edited." }
            })
            this.getEpics();
          } else {
            this.dialog.open(DialogNotificationComponent, {
              data: { title: "Error editing Epic: " + result.value.name, mensaje: "Error in comunication with Database." }
            })

          }
        })
      }
    });
  }

  deleteDialog(epica: Epica): void {

    const dialogRef = this.dialog.open(DeleteDialogComponent, {
      data: { type: " Epica", name: epica.name },
    });

    dialogRef.afterClosed().subscribe(result => {

      if (result === true) {
        const loading = this.dialog.open(LoadingDialogComponent);

        let existsStories: boolean = false;
        this.storiesService.getStories(epica._id).subscribe(resp => {
          existsStories = (resp.data.length > 0)
          if (!existsStories) {
            this.epicService.deleteEpic(epica._id).subscribe(resp => {
              loading.close();
              if (resp.status == "success") {
                this.getEpics();
                this.dialog.open(DialogNotificationComponent, {
                  data: { title: "Success deleting Epic", mensaje: "This epic has been deleted" }
                });
              } else {
                this.dialog.open(DialogNotificationComponent, {
                  data: { title: "Error deleting Epic", mensaje: "Error in comunication with Database" }
                }
                );
              }
            })
          } else {
            loading.close();
            this.dialog.open(DialogNotificationComponent, {
              data: { title: "Error deleting Epic", mensaje: "You can't delete it, this epic contains storie/s" }
            }
            );
          }
        })

      }
    });
  }


  editProjectDialog(project: Project): void {
    let dialogRef = this.dialog.open(ProjectDialogComponent, {
      data: {
        option: " Editar", name: project.getName(),
        members: project.getMembers(), description: project.getDescription(),
        icon: project.icon
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result.value != undefined) {
        const loading = this.dialog.open(LoadingDialogComponent);
        this.projectsService.editProject(result.value, project.getId()).subscribe(resp => {
          loading.close()
          if (resp.success = "success") {
            this.getProject();
            this.dialog.open(DialogNotificationComponent, {
              data: { title: "Success editing Project: " + project.name, mensaje: "This Project has been edited" }
            })
          } else {
            this.dialog.open(DialogNotificationComponent, {
              data: { title: "Error editing Project : " + project.name, mensaje: "Error in comunication with Database." }
            })

          }
        });
      }
    })
    
  }
}

interface epica {

  project: string;
  name: string;
  description: string;
  icon: string;
}

