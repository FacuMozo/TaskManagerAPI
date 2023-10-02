import { Component } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../../api-rest/services/auth.service';
import { TokenStorageService } from '../token-storage.service';
import { Router } from '@angular/router';
import { catchError } from 'rxjs';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {
  loginForm! : FormGroup;
  hide = true;
  respuesta: any;
  wrongLogin =false;
  errorMessage : string = "";

  constructor(  private formBuilder : FormBuilder, 
                private authService: AuthService, 
                private tokenService : TokenStorageService,
                private router : Router,
                ) {}

  ngOnInit(): void {
    this.loginForm = this.formBuilder.group({
      username : new FormControl("",Validators.minLength(4)),
      password : new FormControl("",Validators.minLength(4)),
    })
  }

  onSubmit(){
    if(this.loginForm.valid){
      this.authService.postLogin(this.loginForm.value).pipe(
        catchError((error) => {
          
          this.handleError(error.error.message)

          return [];
        })
      ).subscribe(
        (response)=>{
          this.respuesta = response; 
          
          if(this.respuesta.success){
            this.tokenService.saveToken(this.respuesta.token);//guarda el token
            this.tokenService.saveUser(this.respuesta.user._id);//guarda id del user
            this.router.navigateByUrl('/');
           }else{
              
              this.handleError("Invalid username or password")
           }
        }
     ); 
    }else{     
    }
  }

  handleError(error : string){
    this.wrongLogin = true;
    this.errorMessage = error;
  }

  getpasswordInput() { 
    return this.loginForm.get('password');
  }  

}

export interface epicaForm {
  project: string;
  name: string;
  description: string;
  icon: string;
  option: string
}

export interface User{
  username: string;
  password: string;
}



