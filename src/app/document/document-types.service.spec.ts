import { TestBed, async, inject } from '@angular/core/testing';

import { DocumentTypesService } from './document-types.service';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { Properties } from './shared/interface/form-field-properties';


describe('DocumentTypesService', () => {

  let service: DocumentTypesService;
  let httpMock: HttpTestingController;

  beforeEach(() => {

    TestBed.configureTestingModule({
      imports: [ HttpClientTestingModule ],
      providers: [
        DocumentTypesService,
      ]
    });

    service = TestBed.get(DocumentTypesService);
    
    httpMock = TestBed.get(HttpTestingController);

  });
  

  it('1. Created the document type service', () => {
    expect(service).toBeTruthy();
  });

  it('2. Get document types', () => {

    const docTypes = [
      {
          "createdAt": "2019-07-23T23:24:51Z",
          "updatedAt": "2019-07-23T23:24:58Z",
          "id": 1,
          "typeName": "National ID"
      }
    ];
    service.getDocumentTypes().subscribe((res) => {
      expect(res).toEqual(docTypes);
    });
    
    const req = httpMock.expectOne('http://localhost:5000/api/document-types');
    expect(req.request.method).toEqual("GET");
    req.flush(docTypes);

  });


  it('2. Get document type properties', () => {

    const docTypeProperties = [
      {
          "properties": "{\"name\": \"name\", \"type\": \"input\", \"label\": \"name\", \"value\": null, \"inputType\": \"text\", \"validations\": [{\"name\": \"required\", \"message\": \"Name Required\", \"validator\": \"required\"}]}",
      }
    ];
    service.getDocumentProperties(1).subscribe((result) => {
      
      expect(result).toEqual(docTypeProperties);
    });
    
    const req = httpMock.expectOne('http://localhost:5000/api/document-types/1/properties');
    expect(req.request.method).toEqual("GET");
    req.flush(docTypeProperties);

  });


  it('3. Upload document', () => {

    let payload = new FormData();
    let formData = {
      "name": "Test",
      "dob": new Date()
    };
    let image = {
      "size": "132"
    };
    payload.append('file',null);
    payload.append('formData',JSON.stringify(formData));

    service.uploadDocument(1, payload).subscribe((response) => {
      
      expect(response).toEqual({});
    });
    
    const req = httpMock.expectOne('http://localhost:5000/api/document-types/1/documents');
    expect(req.request.method).toEqual("POST");
    req.flush(payload);

  });







});
