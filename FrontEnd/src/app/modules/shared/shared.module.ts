import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ButtonComponent } from './button/button.component';
import { LabelComponent } from './label/label.component';
import { GenericCardComponent } from './generic-card/generic-card.component';
import { ProyectCardComponent } from './proyect-card/proyect-card.component';
import { TaskCardComponent } from './task-card/task-card.component';
import { DividerComponent } from './divider/divider.component';

import { MaterialModule } from '../material/material.module';

import { MatDialogModule } from '@angular/material/dialog';
import { RouterModule } from '@angular/router';
import { DeleteDialogComponent } from './delete-dialog/delete-dialog.component';
import { EpicFormComponent } from './epic-form/epic-form.component';
import { ProjectDialogComponent } from './project-dialog/project-dialog.component';
import { ReactiveFormsModule } from '@angular/forms';
import { OwnerPComponent } from './owner-p/owner-p.component';
import { LoadingDialogComponent } from './loading-dialog/loading-dialog.component';
import { DialogNotificationComponent } from './dialog-notification/dialog-notification.component';
import { StoryCardComponent } from './story-card/story-card.component';
import { LoadBarComponent } from './load-bar/load-bar.component';


@NgModule({
  declarations: [
    ButtonComponent,
    LabelComponent,
    GenericCardComponent,
    ProyectCardComponent,
    TaskCardComponent,
    DividerComponent,
    EpicFormComponent,
    DeleteDialogComponent,
    ProjectDialogComponent,
    OwnerPComponent,
    LoadingDialogComponent,
    DialogNotificationComponent,
    StoryCardComponent,
    LoadBarComponent,
  ],
  imports: [
    CommonModule,
    MatDialogModule,
    MaterialModule,
    RouterModule,
    ReactiveFormsModule
  ],
  exports:[
    ButtonComponent,
    LabelComponent,
    GenericCardComponent,
    ProyectCardComponent,
    TaskCardComponent,
    DividerComponent,
    EpicFormComponent,
    DeleteDialogComponent,
    ProjectDialogComponent,
    OwnerPComponent,
    StoryCardComponent,
    LoadBarComponent
  ]
})
export class SharedModule { }
