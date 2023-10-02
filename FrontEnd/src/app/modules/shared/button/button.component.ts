import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-button',
  templateUrl: './button.component.html',
  styleUrls: ['./button.component.scss']
})
export class ButtonComponent {

  @Output() buttonEvent = new EventEmitter<boolean>();

  @Input() icon = "";
  @Input() text = "";
  
  displayText = false;
  displayIcon = false;

  assetsUrl = "../../../assets/";

  buttonAction(){
    this.buttonEvent.emit(true);
  }
  ngOnInit(): void {
    if (this.text != '' ){
      this.displayText = true;
    }
    if (this.icon != ""){
      this.displayIcon = true;
    }
  }


}
