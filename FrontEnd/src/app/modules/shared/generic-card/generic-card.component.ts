import { Component, Input, Output, EventEmitter } from '@angular/core';
import { Epica } from '../../models/epic.modle';
import { ActivatedRoute, Route, Router } from '@angular/router';

@Component({
  selector: 'app-generic-card',
  templateUrl: './generic-card.component.html',
  styleUrls: ['./generic-card.component.scss']
})
export class GenericCardComponent {
  @Input() epica!: Epica;
  @Input() type!:string;
  @Output() editOutPut = new EventEmitter();
  @Output() deleteOutPut = new EventEmitter();
  projectId: string="";

  constructor(private route: ActivatedRoute,
              private router: Router,
     ){}

  ngOnInit(): void {
    //Called after the constructor, initializing input properties, and the first call to ngOnChanges.
    //Add 'implements OnInit' to the class.
    const projectId = this.route.snapshot.paramMap.get('projectId')
    if (projectId != null){
      this.projectId =projectId;
    }

  }
  editEvent(){
    console.log("editEvent");
    
    this.editOutPut.emit()
  }
  
  deleteEvent(){
    console.log("deleteEvent");
    
    this.deleteOutPut.emit()

  }

}
