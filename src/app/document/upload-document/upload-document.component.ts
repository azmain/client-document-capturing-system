import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import {MatSnackBar,MatSnackBarConfig} from '@angular/material/snack-bar';
import { MatDialogRef,MAT_DIALOG_DATA } from '@angular/material/dialog';
import { DocumentService } from './document.service';
import {MomentDateAdapter} from '@angular/material-moment-adapter';
import {DateAdapter, MAT_DATE_FORMATS, MAT_DATE_LOCALE} from '@angular/material/core';

import * as _moment from 'moment';
// tslint:disable-next-line:no-duplicate-imports
import {default as _rollupMoment} from 'moment';
import { HttpResponse } from '@angular/common/http';

const moment = _rollupMoment || _moment;

// See the Moment.js docs for the meaning of these formats:
// https://momentjs.com/docs/#/displaying/format/
export const MY_FORMATS = {
  parse: {
    dateInput: 'LL',
  },
  display: {
    dateInput: 'LL',
    monthYearLabel: 'MMM YYYY',
    dateA11yLabel: 'LL',
    monthYearA11yLabel: 'MMMM YYYY',
  },
};

export interface Document {
  value: Number;
  viewValue: string;
}


@Component({
  selector: 'app-upload-document',
  templateUrl: './upload-document.component.html',
  styleUrls: ['./upload-document.component.css'],
  providers: [
    // `MomentDateAdapter` can be automatically provided by importing `MomentDateModule` in your
    // application's root module. We provide it at the component level here, due to limitations of
    // our example generation script.
    {provide: DateAdapter, useClass: MomentDateAdapter, deps: [MAT_DATE_LOCALE]},

    {provide: MAT_DATE_FORMATS, useValue: MY_FORMATS},

    { provide: MatDialogRef, useValue: {} },
    { provide: MAT_DIALOG_DATA, useValue: [] },
  ],
})
export class UploadDocumentComponent implements OnInit {

  selectedValue: Number = null;
  document: File = null;
  documents: Document[] = [
    {value: 1, viewValue: 'NID'},
    {value: 2, viewValue: 'Driving Licence'},
    {value: 3, viewValue: 'Trade Licence'}
  ];

  fullNameFormControl = new FormControl('', [
    Validators.required
  ]);
  dateOfBirth = new FormControl(moment(),[
    Validators.required
  ]);
  nidNoFormControl = new FormControl('',[
    Validators.required,
    Validators.maxLength(10),
  ]);
  licenceNameFormControl = new FormControl('', [
    Validators.required
  ]);
  licenceNoFormControl = new FormControl('',[
    Validators.required
  ]);
  issueDate = new FormControl(moment(),[
    Validators.required
  ]);
  expiaryDate = new FormControl(moment(),[
    Validators.required
  ]);
  issueAuthority = new FormControl('',[
    Validators.required
  ]);

  config: MatSnackBarConfig = {
    duration: 3000,
    horizontalPosition: 'right',
    verticalPosition: 'top',
    panelClass: 'success'
  }

  constructor(
    private _snackBar: MatSnackBar,
    public dialogRef: MatDialogRef<UploadDocumentComponent>,
    private docService: DocumentService) { }

  ngOnInit() {
  }

  setInitialState(){
    
  }

  onFilesAdded(event) {
    console.log(event);
    this.document = <File>event.target.files[0];
  }

  onSubmit(event){
    console.log("Upload");
    // this.config['panelClass'] = ['notification', 'success'];
    // this.openSnackBar();
    // this.onClose();
    console.log(event);
    event.preventDefault();
  }

  uploadDocument(){
    console.log("Upload");

    console.log(this.document);

    
    var data;
    if(this.selectedValue == 1){
      data = {
        documentType: this.selectedValue,
        userNID: {
          fullName: this.fullNameFormControl.value,
          dateOfBirth: this.dateOfBirth.value,
          nidNumber: this.nidNoFormControl.value,
        }
      }
    }
    else if(this.selectedValue == 2){
      data = {
        documentType: this.selectedValue,
        userDl: {
          name: this.licenceNameFormControl.value,
          dateOfBirth: this.dateOfBirth.value,
          issueDate: this.issueDate.value,
          expirayDate: this.expiaryDate.value,
          dlNumber: this.licenceNoFormControl.value,
          issueAuthority: this.issueAuthority.value
        }
      }
    }
    else if(this.selectedValue == 3){

    }

    var payload = new FormData();
    payload.append('file',this.document,this.document.name);
    payload.append('jsondata',JSON.stringify(data));

    console.log(payload);
    
    this.docService.uploadDocument(payload).subscribe((response: Response) => {

      console.log("Response");
      console.log(response);
      if(response && response.status == 500){
        this.config['panelClass'] = ['notification', 'error'];
        this.openSnackBar(Response.error.arguments('message'));
      }
      else{
        this.config['panelClass'] = ['notification', 'error'];
        this.openSnackBar("Document Succesfully Uploaded.");
      }
    });
  }

  openSnackBar(msg) {
    this._snackBar.open(msg, '', this.config);
  }

  onClose(){
    //this.setInitialState();
    //this.dialogRef.close();
  }

}
