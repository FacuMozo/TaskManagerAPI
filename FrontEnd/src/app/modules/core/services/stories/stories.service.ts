import { HttpClient } from '@angular/common/http';
import { Injectable} from '@angular/core';
import { BehaviorSubject, Observable, Subject, map } from 'rxjs';
import { TokenStorageService } from 'src/app/modules/auth/token-storage.service';
import { Story, GetStoriesResponse, PostStoriesResponse, GetStoryResponse } from 'src/app/modules/models/cstory.model';

@Injectable({
  providedIn: 'root'
})
export class StoriesService{
  

  lorem = "Lorem ipsum dolor sit amet consectetur adipisicing elit. Odio natus, nam consequatur perspiciatis repellat voluptates eum. Eum quae minima dolore fugit temporibus. Quasi, nulla dignissimos qui ut suscipit totam! Deserunt!"

  stories : Story[] = [];
  private  baseUrl: string = " https://lamansysfaketaskmanagerapi.onrender.com/api";

  constructor(private http: HttpClient, private tokenStorageService :TokenStorageService){}

  public getStories(epicId : string){
    return this.http.get<GetStoriesResponse>(this.baseUrl+ '/epics/'+ epicId +'/stories', {headers:{'auth': this.tokenStorageService.getToken()||""}
      }).pipe(
        map( resp => {
          if (resp.status == "success"){
            resp.data = resp.data.map(stories => {
              return Story.storyFromJson(stories);
            });
          }
          return resp;
          
        })
    );
  }

  public getAllStories(){
    return this.http.get<GetStoriesResponse>(this.baseUrl + "/stories", {headers: {'auth' : this.tokenStorageService.getToken() || ""}
  }).pipe(
    map( response =>{
      if(response.status == "success"){
        response.data = response.data.map(stories =>{
          return Story.storyFromJson(stories);
        })
      }
      return response;
    })
  )
  }

  public getStoryById(storyId : string){
    return this.http.get<GetStoryResponse>
    (this.baseUrl + '/stories/' + storyId, {headers: {'auth': this.tokenStorageService.getToken()||""}
  }).pipe(
    map(response =>{
      if(response.status = "success"){
        response.data = Story.storyFromJson(response.data)
      }
      return response;
    })
  )
  }

  public addStory(newStory: Story):Observable<any> {
    return this.http.post<PostStoriesResponse>(this.baseUrl+'/stories', newStory, {headers: {'auth': this.tokenStorageService.getToken()||""}}).pipe( result =>{
      console.log("result: ", result);
      return result;
    });
  }


  public deleteStory(id : string): Observable<any>{
    return this.http.delete(this.baseUrl+'/stories/'+id, {headers: {'auth': this.tokenStorageService.getToken()||""}}).pipe( result =>{
      console.log("result of delete: ", result);
      return result;
    });
  }

  public editStory(story : any, id:string) {
    return this.http.put<PostStoriesResponse>(this.baseUrl+'/stories/'+id, story, {headers: {'auth': this.tokenStorageService.getToken()||""}}).pipe( result =>{
      console.log("result: ", result);
      return result;
    });  
  }

}
