import { Component } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';

const DEFAULT_LANG = 'es-AR';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  currentYear = new Date().getFullYear()

  constructor(translate: TranslateService) {
    translate.setDefaultLang(DEFAULT_LANG);
  }
}
