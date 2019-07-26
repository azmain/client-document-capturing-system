import { Component, OnInit } from '@angular/core';
import { DocumentTypesService } from '../document-types.service';

@Component({
  selector: 'app-index',
  templateUrl: './index.component.html',
  styleUrls: ['./index.component.css']
})
export class IndexComponent implements OnInit {

  documents: any = [];

  Object = Object;

  constructor(private service: DocumentTypesService) { }

  ngOnInit() {
    this.service.getAllDocuments().subscribe((response:any) => {
      //console.log(response);
      //this.documents = response;
      this.createDocumentList(response);
    });
  }


  deleteDocument(doc){
    console.log(doc);
    this.service.deleteDocument(doc).subscribe((response: any) => {

      alert(response.message);
      if(response.success){
        this.documents = this.documents.filter(x => x.id != doc);
      }
      
    })
  }


  createDocumentList(docList:Array<any>){
    docList.forEach(x => {
      let doc = {
        type: x.documentType.typeName,
        createdAt: x.createdAt,
        data: JSON.parse(x.documentData),
        imagePath: x.imageFile,
        id: x.id
      }
      this.documents.push(doc);
    });
    console.log(this.documents);
  }

}
