import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MainComponent } from './main/main.component';
import { HomeComponent } from './home/home.component';
import { ProyectListComponent } from './proyect-list/proyect-list.component';
import { ProyectComponent } from './proyect/proyect.component';
import { EpicComponent } from './epic/epic.component';
import { StorieComponent } from './storie/storie.component';
import { SettingsComponent } from './settings/settings.component';
import { MyStoriesComponent } from './my-stories/my-stories.component';

const routes: Routes = [
  {
    path: '', component: MainComponent, children: [
      { path: '', component: HomeComponent },
      { path: 'my-projects', component: ProyectListComponent },
      { path: 'my-projects/:projectId', component: ProyectComponent },
      { path: 'my-projects/:projectId/:epicId', component: EpicComponent },
      { path: 'my-projects/:projectId/:epicId/:storieId', component: StorieComponent },
      { path: 'settings', component: SettingsComponent },
      { path: 'my-stories', component: MyStoriesComponent },
      { path: 'my-stories/:storieId', component: StorieComponent },


    ]
  } 
  ,];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class FeaturesRoutingModule { }
