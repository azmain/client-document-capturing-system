import { NgModule } from '@angular/core';
import { DocumentRoutingModule } from './document-routing.module';

import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import {MatSelectModule} from '@angular/material/select';
import {MatDatepickerModule} from '@angular/material/datepicker';
import {MatGridListModule} from '@angular/material/grid-list';
import {MatButtonModule} from '@angular/material/button';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import {MatDialogModule} from '@angular/material';
import {MatNativeDateModule} from '@angular/material';
import {MatCardModule} from '@angular/material/card';

import { IndexComponent } from './index/index.component';
import { UploadComponent } from './upload/upload.component';
import { InputComponent } from './form-fields/input/input.component';
import { DateComponent } from './form-fields/date/date.component';
import { DynamicFormComponent } from './form-fields/dynamic-form/dynamic-form.component';
import { DynamicFieldDirective } from "../document/form-fields/dynamic-fields/dynamic-field.directive";

@NgModule({
  imports: [
    CommonModule,
    DocumentRoutingModule,
    ReactiveFormsModule,
    FormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatSnackBarModule,
    MatDialogModule,
    MatDatepickerModule,
    MatGridListModule,
    MatButtonModule,
    MatNativeDateModule,
    MatCardModule
  ],
  declarations: [
    IndexComponent,
    UploadComponent,
    InputComponent,
    DateComponent,
    DynamicFormComponent,
    DynamicFieldDirective
  ],
  entryComponents: [
    InputComponent,
    DateComponent,
  ]
})
export class DocumentModule { }
