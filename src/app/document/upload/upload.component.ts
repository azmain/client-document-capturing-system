import { Component, OnInit, ViewChild, ViewChildren } from '@angular/core';
import { Validators, FormGroup, FormControl } from "@angular/forms";
import { FieldConfig } from "../shared/interface/form-field";
import { DocumentType } from "../shared/interface/doc-types";
import { DynamicFormComponent } from "../form-fields/dynamic-form/dynamic-form.component";
import { DocumentTypesService } from '../document-types.service';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';


export interface DocProperties{
  properties
}


@Component({
  selector: 'app-upload',
  templateUrl: './upload.component.html',
  styleUrls: ['./upload.component.css']
})
export class UploadComponent implements OnInit {

  document_types: DocumentType[];

  document_properties: FieldConfig[] = [];

  selectedValue:Number = null;

  selectedType: string = '';

  uploading: boolean = false;
 
  @ViewChild(DynamicFormComponent) form: any;

  constructor(
    private docTypeService: DocumentTypesService,
    private router: Router){
    
      
  }


  ngOnInit(){
    this.docTypeService.getDocumentTypes()
      .subscribe((response:DocumentType[]) => {
        console.log(response);
        this.document_types = response;
      });
  }

  
  /**
   * document type selection
   * @param value 
   */
  eventSelection(value){

    this.docTypeService.getDocumentProperties(this.selectedValue)
      .subscribe((response:DocProperties[]) => {
        console.log(response);
        let docProps = response;
        let allProps = [];
        docProps.forEach(x => {
          allProps.push(JSON.parse(x.properties));
        });
        this.selectedType = this.document_types.find(x => x.id == this.selectedValue).typeName;
        this.document_properties = allProps;
        this.form = DynamicFormComponent;
      });
    

  }


  submit(value: any) {
    console.log(value);
    this.uploading = true;
    console.log(this.form.value);
    const payload = new FormData();
    payload.append('file',value.file);
    payload.append('formData',JSON.stringify(value.formData));
    this.docTypeService.uploadDocument(this.selectedValue,payload).subscribe((response: any) => {
      console.log(response);
      this.uploading = false;
      
      alert(response.message);

      this.router.navigate(["/documents"]);     
    });
  }

}
