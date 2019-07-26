import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { map, catchError, timeout } from 'rxjs/operators';
import { throwError } from 'rxjs';
import { Validators } from '@angular/forms';
import { FieldConfig } from "../document/shared/interface/form-field";
import { Properties } from './shared/interface/form-field-properties';

@Injectable({
  providedIn: 'root'
})
export class DocumentTypesService {

  constructor(private http: HttpClient) { }

  private url: string = "http://localhost:5000/api";

  documentTypes: Array<Object> = [
    {oid: 1, type_name: 'NID'},
    {oid: 2, type_name: 'DL'}
  ];

  docTypes: Array<Object> = [];

  nID: FieldConfig[] = [
    {
      type: "input",
      label: "Username",
      inputType: "text",
      name: "name",
      validations: [
        {
          name: "required",
          validator: Validators.required,
          message: "Name Required"
        },
        {
          name: "pattern",
          validator: Validators.pattern("^[a-zA-Z]+$"),
          message: "Accept only text"
        }
      ]
    },
    {
      type: "input",
      label: "Email Address",
      inputType: "email",
      name: "email",
      validations: [
        {
          name: "required",
          validator: Validators.required,
          message: "Email Required"
        },
        {
          name: "pattern",
          validator: Validators.pattern(
            "^[a-z0-9._%+-]+@[a-z0-9.-]+.[a-z]{2,4}$"
          ),
          message: "Invalid email"
        }
      ]
    },
    {
      type: "date",
      label: "DOB",
      name: "dob",
      validations: [
        {
          name: "required",
          validator: Validators.required,
          message: "Date of Birth Required"
        }
      ]
    }
  ];

  dL: FieldConfig[] = [
    {
      type: "input",
      label: "Password",
      inputType: "password",
      name: "password",
      validations: [
        {
          name: "required",
          validator: Validators.required,
          message: "Password Required"
        }
      ]
    },
    {
      type: "date",
      label: "Expiary Date",
      name: "Expiary Date",
      validations: [
        {
          name: "required",
          validator: Validators.required,
          message: "Expiary Date Required"
        }
      ]
    }
  ]

  /**
   * get all document types from server
   */
  getDocumentTypes(){
    
    return this.http.get(this.url+"/document-types")
              .pipe(
                map(response => response),
                timeout(6000),
                catchError(this.handleError)
              );
    
  }

  /**
   * get all the properties related to the document type
   * @param docId 
   */
  getDocumentProperties(docId){

    return this.http.get(this.url+"/document-types/"+ docId +"/properties")
              .pipe(
                map((response) => response),
                timeout(6000),
                catchError(this.handleError)
              );

  }


  /**
   * upload the document
   * @param docId 
   * @param payload 
   */
  uploadDocument(docId, payload){

    return this.http.post(this.url+"/document-types/"+ docId +"/documents", payload)
              .pipe(
                map(response => {
                  return response;
                }),
                timeout(6000),
                catchError(this.handleError)
              );

  }


  getAllDocuments(){
    return this.http.get(this.url+"/documents")
      .pipe(
        map(response => response),
        timeout(3000),
        catchError(this.handleError)
      );
  }

  deleteDocument(id){
    return this.http.delete(this.url+"/documents/"+id)
      .pipe(
        map(response => response),
        timeout(3000),
        catchError(this.handleError)
      );
  }

  private handleError(error: HttpErrorResponse){
    console.log(error);
    return throwError("Error in Http Service");
  }

}
