import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UploadComponent } from './upload.component';
import { DocumentTypesService } from '../document-types.service';
import { Observable } from 'rxjs/internal/Observable';

describe('UploadComponent', () => {
  let component: UploadComponent;
  let fixture: ComponentFixture<UploadComponent>;
  let service: DocumentTypesService;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UploadComponent ]
    })
    .compileComponents();

    service = new DocumentTypesService(null);
    //component = new UploadComponent(service);

  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UploadComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  xit('should set document types property', () => {


    spyOn(service, "getDocumentTypes").and.callFake(() => {
      return Response;
    });

    component.ngOnInit();

    expect(component.document_types.length).toBeGreaterThan(0);

  });
});
