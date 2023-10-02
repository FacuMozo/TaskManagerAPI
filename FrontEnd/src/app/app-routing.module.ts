import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { FeaturesModule } from './modules/features/features.module';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { loggedGuard } from './guards/logged.guard';



const routes: Routes = [
  // { path: '', component: MainComponent, children:[
    //   { path: '', component: HomeComponent  },
    // ]  },
    // { path: 'my-proyects', component: ProyectListComponent  },
    // { path: 'my-proyects/:proyectId', component: ProyectComponent  },
    // { path: 'my-proyects/:proyectId/:epicId', component: EpicComponent  },
    // { path: 'my-proyects/:proyectId/:epicId/:storieId', component: StorieComponent  },
    // { path: 'my-proyects/:proyectId/:epicId/:storieId/:taskId', component: TaskComponent  },
    
    { path: '',canActivate: [loggedGuard] , loadChildren: () => import('./modules/features/features.module').then(m => m.FeaturesModule)},
    { path: 'login', loadChildren: () => import('./modules/auth/auth.module').then(m => m.AuthModule)},
    { path: '**', component: PageNotFoundComponent }


];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
