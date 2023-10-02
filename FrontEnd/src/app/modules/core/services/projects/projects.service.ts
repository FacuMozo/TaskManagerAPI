import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable, OnInit } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { map, catchError } from 'rxjs/operators';
import { GetProjectsResponse, PostProjectsResponse, Project } from 'src/app/modules/models/cproject.model';
import { TokenStorageService } from '../../../auth/token-storage.service';
import { EpicService } from '../epic.service';


@Injectable({
  providedIn: 'root'
})
export class ProjectsService {
 
  private projects : Project[]= [];
  private  baseUrl: string = " https://lamansysfaketaskmanagerapi.onrender.com/api";
  

  constructor(private http: HttpClient, 
              private tokenStorageService :TokenStorageService,
              private epicService: EpicService ) {  }
 

  
  
  public getProjectApi(){
    return this.http.get<GetProjectsResponse>
    (this.baseUrl+'/projects',{ headers: {'auth': this.tokenStorageService.getToken()||""}
  }).pipe(
    map( resp => {
      if (resp.status == "success"){
        resp.data = resp.data.map(projects => {
          return Project.projectFromJson(projects)
        });
      }
      return resp
      
    })
    );
    
  }
  public getProjectById( proyectId: string){
    return this.http.get<PostProjectsResponse>
      (this.baseUrl+'/projects/'+proyectId,{ headers: {'auth': this.tokenStorageService.getToken()||""}
      }).pipe(
      map( resp => {
        if (resp.status == "success"){
          resp.data =  Project.projectFromJson(resp.data) 
        }
        return resp
      
      })
    );
    
  }

  public newProject(newProject: any): Observable<any> {

    console.log("Project Service, newProject:", newProject);
    
    return this.http.post<PostProjectsResponse>(this.baseUrl+'/projects', newProject, {headers: {'auth': this.tokenStorageService.getToken()||""}}).pipe( result =>{
      console.log("result: ", result);
      return result;
    }
    
    );
  }
  public editProject(editProject: any, idToEdit: string): Observable<any> {
    
    console.log("Project Service, EDIT project JSON",JSON.stringify(editProject), " sin json: ", editProject);
    return this.http.put<PostProjectsResponse>(this.baseUrl+'/projects/'+idToEdit, editProject, {headers: {'auth': this.tokenStorageService.getToken()||""}}).pipe( result =>{
      console.log("result: ", result);
      return result;
    });
  }
  
  public deleteProject(projectId:string): Observable<any> {
    console.log("Project Service, delete Project id: ", projectId);
    //Comprobar que no posea epicas
    /* if ( this.epicService.existsEpics(projectId) ){ */
      return this.http.delete(this.baseUrl+'/projects/'+projectId, {headers: {'auth': this.tokenStorageService.getToken()||""}}).pipe( result =>{
        console.log("result of delete: ", result);
        return result;
      });

       
  }

}
