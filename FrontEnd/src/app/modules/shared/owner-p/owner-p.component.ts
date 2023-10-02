import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-owner-p',
  templateUrl: './owner-p.component.html',
  styleUrls: ['./owner-p.component.scss']
})
export class OwnerPComponent {
@Input() user!:any;
 
}
