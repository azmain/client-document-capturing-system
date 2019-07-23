import { Component, OnInit, ViewChild, ViewChildren } from '@angular/core';
import { Validators, FormGroup, FormControl } from "@angular/forms";
import { FieldConfig } from "../shared/interface/form-field";
import { DynamicFormComponent } from "../form-fields/dynamic-form/dynamic-form.component";
import { DocumentTypesService } from '../document-types.service';
import { Observable } from 'rxjs';


export interface DocumentType {
  oid: number;
  type_name: string;
}


@Component({
  selector: 'app-upload',
  templateUrl: './upload.component.html',
  styleUrls: ['./upload.component.css']
})
export class UploadComponent implements OnInit {

  document_types: DocumentType[];

  document_properties: FieldConfig[] = [];

  selectedValue = null;

  selectedType: string = '';
 
  @ViewChild(DynamicFormComponent) form: any;

  constructor(private docTypeService: DocumentTypesService){
    
      
  }

  ngOnInit(){
    this.docTypeService.getDocumentTypes()
      .subscribe((response:DocumentType[]) => {
        console.log(response);
        this.document_types = response;
      });
  }

  
  eventSelection(value){

    console.log(value);
    console.log("Try");
    console.log(this.selectedValue);

    this.docTypeService.getDocumentProperties(this.selectedValue)
      .subscribe((response:FieldConfig[]) => {
        console.log(response);
        this.selectedType = this.selectedValue + " For";
        this.document_properties = response;
        this.form = DynamicFormComponent;
      });
    

  }


  submit(value: any) {
    console.log(value);
    console.log(this.form.value);
  }

}
