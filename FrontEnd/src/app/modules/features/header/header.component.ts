import { TokenStorageService } from '../../auth/token-storage.service';
import { Component, EventEmitter, Input, Output, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { HeaderService } from '../../core/services/header.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit{
  @Output() toggle = new EventEmitter();
  rutaActual :string ="";
  firstLevelRoute : boolean=false;


  logout(){
    this.tokenService.signOut();    
  }
  constructor(private headerService: HeaderService, private router: Router,private tokenService : TokenStorageService ){
  }

  ngOnInit(): void {
    this.headerService.getRutaActual$().subscribe( resp=>{
      this.rutaActual = resp;
    })
    this.headerService.getFirstLevelRoute$().subscribe( resp=>{
      this.firstLevelRoute = resp;
    })
  }
  
  toggleNavBar(){
    this.toggle.emit();
  }

  previousLevel(){
    const currentUrl = this.router.url;
    const urlSegments = currentUrl.split('/').filter(segment => segment !== ''); // Remove empty segments

    if (urlSegments.length > 1) {
      urlSegments.pop();
      const newUrl = `/${urlSegments.join('/')}`;

      this.router.navigateByUrl(newUrl);
    } else {
    }
  }
  

}
