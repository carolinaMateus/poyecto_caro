import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatTableModule } from "@angular/material/table";
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSortModule } from '@angular/material/sort';
import { MatInputModule } from "@angular/material/input";
import { HttpClientModule } from '@angular/common/http';
import { PersonaListComponent } from './components/persona/persona-list/persona-list.component';
import { PersonaFormComponent } from './components/persona/persona-form/persona-form.component';
import {MatIconModule} from '@angular/material/icon'
import {MatSnackBarModule} from '@angular/material/snack-bar';
import {MatDialogModule} from '@angular/material/dialog';
import {MatCardModule} from '@angular/material/card';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import {MatTabsModule} from '@angular/material/tabs';

@NgModule({
  declarations: [
    AppComponent,
    PersonaListComponent,
    PersonaFormComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    MatTableModule, 
    MatPaginatorModule,
    MatSortModule,
    MatInputModule,
    HttpClientModule,
    MatIconModule,
    MatSnackBarModule,
    MatDialogModule,
    MatCardModule,
    FormsModule,
    ReactiveFormsModule,
    MatTabsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
