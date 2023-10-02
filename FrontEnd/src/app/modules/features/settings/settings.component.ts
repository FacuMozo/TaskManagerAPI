import { Component, OnInit } from '@angular/core';
import { User } from '../../models/user.model';
import { UserService } from '../../core/services/user.service';
import { TokenStorageService } from '../../auth/token-storage.service';
import { Token } from '@angular/compiler';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.scss']
})
export class SettingsComponent implements OnInit {

  user !: User;
  token : any = "";

  errorGetUser : boolean = false;

  constructor(private userService : UserService, private tokenService : TokenStorageService){}

  ngOnInit(){
    this.getUser();
    this.getToken();
  }

  getUser(){
    this.userService.getUser(this.tokenService.getUser()).subscribe(response =>{

      if(response.status == "success"){
        this.user = response.data        
      }else{
        this.errorGetUser = false;
      }
      
    })
    
  }

  getToken(){
    this.token = this.tokenService.getToken()
  }

}
