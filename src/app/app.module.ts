import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';


import { AppComponent } from './app.component';
import { NotFoundComponent } from './shared/not-found/not-found.component';

import {MatButtonModule} from '@angular/material/button';
/* routing */
import { AppRoutingModule } from './app-routing.module';

import { from } from 'rxjs';
import { DocumentTypesService } from './document/document-types.service';
import { DashboardComponent } from './dashboard/dashboard.component';

@NgModule({
  declarations: [
    AppComponent,
    NotFoundComponent,
    DashboardComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    // routing
    AppRoutingModule,
    HttpClientModule,
    MatButtonModule
    
  ],
  providers: [
    DocumentTypesService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
