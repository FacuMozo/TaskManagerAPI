import { Component, OnDestroy, OnInit } from '@angular/core';

import { Observable, Subscription } from 'rxjs';
import { ProjectsService } from '../../core/services/projects/projects.service';
import { MatDialog } from '@angular/material/dialog';
import { ProjectDialogComponent } from '../../shared/project-dialog/project-dialog.component';
import { Project } from '../../models/cproject.model';
import { DeleteDialogComponent } from '../../shared/delete-dialog/delete-dialog.component';
import { EpicService } from '../../core/services/epic.service';
import { LoadingDialogComponent } from '../../shared/loading-dialog/loading-dialog.component';
import { DialogNotificationComponent } from '../../shared/dialog-notification/dialog-notification.component';
import { User } from '../../models/user.model';
import { UserService } from '../../core/services/user.service';


@Component({
  selector: 'app-proyect-list',
  templateUrl: './proyect-list.component.html',
  styleUrls: ['./proyect-list.component.scss']
})  
export class ProyectListComponent implements OnInit{
  projects : Project[]=[];
  projects$: Observable<Project[]> = new Observable<Project[]>();
  projectsServiceSubscription: Subscription = new Subscription();
  errorGetProjects: boolean = false;
  cantProjectsIsZero: boolean = false;


  constructor(public projectsService: ProjectsService, public dialog: MatDialog, private epicService: EpicService) {

  }

  ngOnInit(): void {
    this.getProjects();
    //this.projects$ = this.projectsService.getProjects$(); // se accede al observable
    //this.projectsServiceSubscription=this.projects$.subscribe(projects => this.projects = projects);// nos suscribimos a los cambios
  }

  getProjects() {
    this.projectsService.getProjectApi().subscribe(resp => {
      if (resp.status == "success") {
        this.projects = resp.data;
        this.errorGetProjects = false;
        if (this.projects.length == 0) {
          this.cantProjectsIsZero = true;
        } else {
          this.cantProjectsIsZero = false;
        }
      } else {
        this.errorGetProjects = true;
      }
    });
  }

  newProjectDialog(): void {
    let dialogRef = this.dialog.open(ProjectDialogComponent, {
      data: { option: " Agregar nuevo", name: "", members: [""], description: "", }
    });

    dialogRef.afterClosed().subscribe(result => {
      //loading
      if(result.value != undefined){
        
        const loading = this.dialog.open(LoadingDialogComponent);
        this.projectsService.newProject(result.value).subscribe(resp => {
          loading.close()
          if (resp.success = "success") {
            this.getProjects();
            this.dialog.open(DialogNotificationComponent,{
              data: { title: "Success adding Project: "+result.value.name, mensaje: "The project has been added" }});
          }else{
            this.dialog.open(DialogNotificationComponent,{
              data: { title: "Error adding Project:"+result.value.name, mensaje: "Error in comunication with Database" }});
          }
        });
      }

      // this.newProject(result.value);
    })
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
      if (result.value != undefined){

        const loading = this.dialog.open(LoadingDialogComponent)
        //loading true
        this.projectsService.editProject(result.value, project.getId()).subscribe(resp => {
          loading.close()
          if (resp.success = "success") {
            this.getProjects();
            //loading false
            this.dialog.open(DialogNotificationComponent,{
              data: { title: "Success editing Project", mensaje: "This project has been edited" }});
          }else{
            this.dialog.open(DialogNotificationComponent,{
              data: { title: "Error editing Project", mensaje: "Error in comunication with Database" }});
          }
        });
      }
      
    })
  }

  deleteProject(project: Project) {
    const dialogRef = this.dialog.open(DeleteDialogComponent, {
      data: { type: "Proyecto ", name: project.getName() },
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log("result:",result);
      
      if (result == true){
      
        let existEpicas: boolean = false;
        const loading = this.dialog.open(LoadingDialogComponent);
        this.epicService.getEpics(project.getId()).subscribe(resp => {
          const epics = resp.data;
          existEpicas = (epics.length > 0);        
          if ( !existEpicas){
            this.projectsService.deleteProject(project.getId()).subscribe(resp => {
              loading.close();
              if (resp.success = "success") {
                this.dialog.open(DialogNotificationComponent,{
                  data: { title: "Success deleting Project: "+project.getName(), mensaje: "This project has been deleted" }});
                this.getProjects();
              } else {
                this.dialog.open(DialogNotificationComponent,{
                  data: { title: "Error deleting Project", mensaje: "Error in comunication with Database" }}
                  );
                  
                }
              });
            }else{
              loading.close();
              this.dialog.open(DialogNotificationComponent,{
              data: { title: "Error deleting Project", mensaje: "You can't delete it, this project contains epic/s" }}
            );
          }
        })
      }
    });
  }

  newProject(newProject: formProject) {
    
    this.projectsService.newProject(newProject).subscribe(resp => {
      if (resp.success = "success") {
        this.getProjects();
      }
    });
  }
}


export interface formProject {
  name: string;
  members: string[];
  description: string;
  icon: string;
}
