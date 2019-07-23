import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { map, catchError, timeout } from 'rxjs/operators';
import { throwError } from 'rxjs';
import { Validators } from '@angular/forms';
import { FieldConfig } from "../document/shared/interface/form-field";

@Injectable({
  providedIn: 'root'
})
export class DocumentTypesService {

  constructor(private http: HttpClient) { }

  private url: string = "http://localhost:5000/api/document-types";

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

  /* get all document types from server */
  getDocumentTypes(){
    
    return this.http.get(this.url)
              .pipe(
                map(response => response),
                timeout(6000),
                catchError(this.handleError)
              );
    
  }


  getDocumentProperties(docId){

    return this.http.get(this.url+"/"+ docId +"/properties")
              .pipe(
                map((response: Array<Object>) => {
                  // console.log(response);
                  let props = [];
                  let res = response;
                  res.forEach(e => {
                    props.push(JSON.parse(e.properties));
                  });
                  console.log("Doc Type");
                  console.log(props);
                  // return this.dL;
                  return props;
                }),
                timeout(6000),
                catchError(this.handleError)
              );

    /* if(docId == 1){
       
    }
    else{
      return this.http.get("https://jsonplaceholder.typicode.com/todos")
              .pipe(
                map(response => this.dL),
                timeout(6000),
                catchError(this.handleError)
              ); 
    } */
    

  }


  private handleError(error: HttpErrorResponse){
    console.log(error);
    return throwError("Error in Http Service");
  }

}
