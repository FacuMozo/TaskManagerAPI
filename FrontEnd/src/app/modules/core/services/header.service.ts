import { Injectable, EventEmitter } from '@angular/core';
import { ActivatedRoute, NavigationEnd, Router, Event } from '@angular/router';
import { BehaviorSubject, Observable, Subject, filter } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class HeaderService {

  rutaActual: string = ''; // Variable para almacenar la ruta actual
  rutaActual$ = new BehaviorSubject<string>("");
  firstLevelRoute: boolean = true;
  firstLevelRoute$ = new BehaviorSubject<boolean>(true);

  constructor(private router: Router, private route: ActivatedRoute) {
    this.router.events
      .pipe(filter((event: Event): event is NavigationEnd => event instanceof NavigationEnd))
      .subscribe((events: NavigationEnd) => {
        const urlSegments = events.url.split('/').filter(segment => segment !== '');
        const lastSegmentIndex = urlSegments.length - 1;

        if (lastSegmentIndex === 0) {
          this.firstLevelRoute = true;
          switch (urlSegments[0]) {
            case 'settings':
              this.rutaActual = 'Settings';
              break;
            case 'my-projects':
              this.rutaActual = 'My Projects';
              break;
            case 'my-stories':
              this.rutaActual = 'My Stories';
              break;
            default:
              this.rutaActual = 'Home';
              break;
          }
        } else if (lastSegmentIndex > 0) {
          this.firstLevelRoute = false;
          switch (lastSegmentIndex) {
            case 1:
              if (urlSegments[0] === 'my-projects') {
                this.rutaActual = 'Proyecto';
              }
              break;
            case 2:
              if (urlSegments[0] === 'my-projects') {
                this.rutaActual = 'Épica';
              }
              break;
            case 3:
              if (urlSegments[0] === 'my-projects') {
                this.rutaActual = 'Historia';
              }
              break;
            case 4:
              if (urlSegments[0] === 'my-projects') {
                this.rutaActual = 'Tarea';
              }
              break;
            default:
              this.rutaActual = 'Desconocida';
              break;
          }
        } else {
          this.rutaActual = 'Home';
        }
        this.firstLevelRoute$.next(this.firstLevelRoute);
        this.rutaActual$.next(this.rutaActual);
        console.log("RUTA ACTUAL HEADER SERVICE: ", this.rutaActual);

      });
  }

  getRutaActual$(): Observable<string> {
    return this.rutaActual$.asObservable();
  }
  getFirstLevelRoute$(): Observable<boolean> {
    return this.firstLevelRoute$.asObservable();
  }
}
