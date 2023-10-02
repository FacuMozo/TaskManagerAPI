import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FlexLayoutModule } from '@angular/flex-layout';
import { LabelComponent } from './components/label/label.component';
import { RouterModule } from '@angular/router';
import { AppRoutingModule } from 'src/app/app-routing.module';


@NgModule({
	declarations: [
	LabelComponent],
	imports: [
		CommonModule,
		FlexLayoutModule,
		AppRoutingModule,
		RouterModule
	],
	exports: [
		FlexLayoutModule,
		RouterModule
	]
})
export class PresentationModule {
}
