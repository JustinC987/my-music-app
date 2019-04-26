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
	MatOptionModule,
	MatMenuModule
} from '@angular/material';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { SignInComponent } from './sign-in/sign-in.component';
import { SignUpComponent } from './sign-up/sign-up.component';
import { PasswordResetComponent } from './password-reset/password-reset.component';

@NgModule({
	declarations: [
		AppComponent,
		HomeComponent,
		HeaderComponent,
		FooterComponent,
		SignInComponent,
		SignUpComponent,
		PasswordResetComponent
	],
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
		MatOptionModule,
		MatMenuModule
	],
	providers: [],
	bootstrap: [ AppComponent ]
})
export class AppModule {}
