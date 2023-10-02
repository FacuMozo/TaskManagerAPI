import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FeaturesRoutingModule } from './features-routing.module';
import { EpicComponent } from './epic/epic.component';
import { HomeComponent } from './home/home.component';
import { MainComponent } from './main/main.component';
import { ProyectComponent } from './proyect/proyect.component';
import { ProyectListComponent } from './proyect-list/proyect-list.component';
import { SettingsComponent } from './settings/settings.component';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { MaterialModule } from '../material/material.module';
import { SharedModule } from '../shared/shared.module';
import { MyStoriesComponent } from './my-stories/my-stories.component';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { StoryFormComponent } from './story-form/story-form.component';
import { StorieComponent } from './storie/storie.component';
import { TaskFormComponent } from './task-form/task-form.component';

@NgModule({
  declarations: [
    EpicComponent,
    HomeComponent,
    MainComponent,
    ProyectComponent ,
    ProyectListComponent,
    SettingsComponent,
    HeaderComponent,
    FooterComponent,
    MyStoriesComponent,
    StoryFormComponent,
    StorieComponent,
    TaskFormComponent
  ],
  imports: [
    CommonModule,
    FeaturesRoutingModule,
    MaterialModule,
    SharedModule,
    FormsModule,
    ReactiveFormsModule
  ]
})
export class FeaturesModule { }
