import { HttpClient } from '@angular/common/http';
import { Injectable, EventEmitter } from '@angular/core';
import { TokenStorageService } from '../../auth/token-storage.service';
import { Epica, GetEpicsResponse, PostEpicsResponse } from '../../models/epic.modle';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class EpicService {



  private  baseUrl: string = " https://lamansysfaketaskmanagerapi.onrender.com/api";
  
  constructor(private http: HttpClient, private tokenStorageService :TokenStorageService) { }

  ngOnInit(): void {
    //Called after the constructor, initializing input properties, and the first call to ngOnChanges.
    //Add 'implements OnInit' to the class.
  }

  getEpics(proyectId:string){
    // this.epics$.emit(
    //   this.epics.filter(function(value){
    //     return value.project === proyectId
    //   })
    // )
    return this.http.get<GetEpicsResponse>
      (this.baseUrl+'/projects/'+proyectId+"/epics",{ headers: {'auth': this.tokenStorageService.getToken()||""}
      }).pipe(
      map( resp => {
        if (resp.status == "success"){
          // resp.data = resp.data.map(projects => {
          //   return Project.projectFromJson(projects)
          // });
        }
        return resp    
      })
      );
  }

  getEpicById(id : string){
    return this.http.get<PostEpicsResponse>(this.baseUrl + '/epics/' + id, { headers: {'auth': this.tokenStorageService.getToken()||""}
      }).pipe(
        map( resp =>{
            if(resp.status == "success"){
              //resp.data= Epic.epicFromJson
            }
            return resp;
          } 
        ));
  }

  saveEpic(newEpic : Epica){
    console.log("Epic Service, newEpic:", newEpic);
    
    return this.http.post<PostEpicsResponse>(this.baseUrl+'/epics', newEpic, {headers: {'auth': this.tokenStorageService.getToken()||""}})
      .pipe( result =>{
        console.log("result: ", result);
        return result;
      }
    );
  }

  editEpic(editEpic : any,epicId: string){
    return this.http.put<PostEpicsResponse>(this.baseUrl+'/epics/'+epicId, editEpic, {headers: {'auth': this.tokenStorageService.getToken()||""}})
      .pipe( result =>{
        console.log("result: ", result);
        return result;
      }
    );
  }
  
  
  deleteEpic(epicId: string):Observable<any>{
    return this.http.delete(this.baseUrl+'/epics/'+epicId, {headers: {'auth': this.tokenStorageService.getToken()||""}}).pipe( result =>{
      console.log("result of delete epic: ", result);
      return result;
    }); 
  }
}

