import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, Subject, map } from 'rxjs';
import { TokenStorageService } from 'src/app/modules/auth/token-storage.service';
import { GetTasksResponse, PostTasksResponse, Task } from 'src/app/modules/models/ctask.model';

@Injectable({
  providedIn: 'root'
})
export class TasksService {

  private tasks : Task[] = [];
  private  baseUrl: string = " https://lamansysfaketaskmanagerapi.onrender.com/api";


  tasksData : BehaviorSubject<Task[]> = new BehaviorSubject<Task[]>(this.tasks);

  constructor(private http: HttpClient, private tokenStorageService :TokenStorageService) {}


  public getTasksApi(id : string){
    return this.http.get<GetTasksResponse>
    (this.baseUrl + '/stories/'+ id +'/tasks', {headers : {'auth' : this.tokenStorageService.getToken() || ""}
  }).pipe(
    map(response => {
      if(response.status == "succes"){
        response.data = response.data.map(tasks =>{
          return Task.taskFromJson(tasks)
        });
      }
      return response;
    })
  )
  }

 
  public newTask(newTask : any) : Observable<any>{
    return this.http.post<PostTasksResponse>(this.baseUrl + '/tasks', newTask, {
      headers : {'auth' : this.tokenStorageService.getToken() || ""}
    }).pipe(result =>{
      return result
    })
  }

  public deleteTask(id : string) : Observable<any>{
    return this.http.delete(this.baseUrl + '/tasks/' + id, {headers : {'auth': this.tokenStorageService.getToken() || ""}
  }).pipe(result =>{
    return result
  }
    
  )
  }

  public editTask(task : Task, id : string): Observable<any>{
    return this.http.put<PostTasksResponse>(
      this.baseUrl+'/tasks/' + id, task, {headers: {'auth': this.tokenStorageService.getToken()||""}}
    ).pipe(result =>{
      return result
    })
  }

  public doneToggle(task: Task, id : string) : Observable<any>{
    return this.http.put<PostTasksResponse>(
      this.baseUrl+'/tasks/' + id, task, {headers: {'auth': this.tokenStorageService.getToken()||""}}
    ).pipe(result =>{
      return result
    })
  }

}
