import {
  Component,
  EventEmitter,
  Input,
  OnChanges,
  OnInit,
  Output
} from "@angular/core";
import {
  FormGroup,
  FormBuilder,
  Validators,
  FormControl
} from "@angular/forms";
import { FieldConfig, Validator } from "../../shared/interface/form-field";


@Component({
  
  exportAs: "dynamicForm",
  selector: 'dynamic-form',
  templateUrl: './dynamic-form.component.html',
  styleUrls: ['./dynamic-form.component.css']
})
export class DynamicFormComponent implements OnInit, OnChanges{

  
  @Input() fields: FieldConfig[] = [];

  @Input() type?: string = "Not Selected";

  @Input() uploading:boolean = false;

  @Output() submit: EventEmitter<any> = new EventEmitter<any>();

  document: File = null;

  form: FormGroup = new FormGroup({});

  get value() {
    return this.form.value;
  }
  constructor(private fb: FormBuilder) {
    
    console.log("Dynamic Form Constructor");
    console.log(this.form);
  }

  ngOnInit() {
    //this.form = this.createControl();
    console.log("Dynamic Form On Init");
    console.log(this.form);

  }

  ngOnChanges(){
    console.log("Dynamic On changes");
    this.form = this.createControl();
    this.document = null;

    // console.log(this.form.value);
    // console.log(this.document);
    this.form.reset();
    
  }

  onFilesAdded(event) {
    console.log(event);
    this.document = <File>event.target.files[0];
  }

  ngAfterViewInit() {
    console.log("Dynamic Form After View Init");
  }

  onSubmit(event: Event) {
    event.preventDefault();
    event.stopPropagation();
    if (this.form.valid && this.document) {
      let document = {
        formData : this.form.value,
        file: this.document
      }
      this.submit.emit(document);
    } else {
      this.validateAllFormFields(this.form);
      alert("Please select image to upload");
    }
  }

  createControl() {
    const group = this.fb.group({});
    
    this.fields.forEach(field => {
      //console.log(field);
      if (field.type === "button") return;
      const control = this.fb.control(
        field.value,
        this.bindValidations(field.validations || [])
      );
      group.addControl(field.name, control);
    });

    return group;
  }

  bindValidations(validations: any) {
    if (validations.length > 0) {
      const validList = [];
      validations.forEach(valid => {
        if(valid.validator == 'required'){
          validList.push(Validators.required);
        }
        //validList.push(valid.validator);
      });
      return Validators.compose(validList);
    }
    return null;
  }

  validateAllFormFields(formGroup: FormGroup) {
    Object.keys(formGroup.controls).forEach(field => {
      const control = formGroup.get(field);
      control.markAsTouched({ onlySelf: true });
    });
  }


}
