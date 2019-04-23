import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {
	MatDialogModule,
	MatDividerModule,
	MatCardModule,
	MatSlideToggleModule,
	MatProgressSpinnerModule,
	MatProgressBarModule,
	MatFormFieldModule,
	MatInputModule,
	MatTooltipModule,
	MatIconModule,
	MatTableModule,
	MatPaginatorModule,
	MatSortModule,
	MatCheckboxModule,
	MatSelectModule,
	MatOptionModule
} from '@angular/material';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { HeaderComponent } from './header/header.component';

@NgModule({
	declarations: [ AppComponent, HomeComponent, HeaderComponent ],
	imports: [
		BrowserModule,
		AppRoutingModule,
		HttpClientModule,
		BrowserAnimationsModule,
		MatDividerModule,
		MatCardModule,
		MatSlideToggleModule,
		MatDialogModule,
		FormsModule,
		ReactiveFormsModule,
		MatProgressSpinnerModule,
		MatProgressBarModule,
		MatFormFieldModule,
		MatInputModule,
		MatIconModule,
		MatTooltipModule,
		MatTableModule,
		MatPaginatorModule,
		MatSortModule,
		MatCheckboxModule,
		MatSelectModule,
		MatOptionModule
	],
	providers: [],
	bootstrap: [ AppComponent ]
})
export class AppModule {}
