import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, FormArray, Validators } from '@angular/forms';
import { Observable } from 'rxjs';
import { startWith ,map } from 'rxjs/operators';
import { AppStateService } from 'src/app/app-state.service';

@Component({
  selector: 'app-objective',
  templateUrl: './objective.component.html',
  styleUrls: ['./objective.component.scss']
})
export class ObjectiveComponent implements OnInit {

  constructor(
    private fb: FormBuilder,
    private appService:AppStateService
  ) { }
  
  savedClick:boolean
  url: string
  /* When we select file */
  Name: string;
  myFile: File; /* property of File type */
  startDate = new Date();
  formGroupDocable: FormGroup
  owners: Array<any> = [
    { value: '1', viewValue: 'Multiple' },
    { value: '2', viewValue: 'Individual' },
    { value: '3', viewValue: 'Shared' }
  ];

  alignments: Array<any> = [
    { value: '1', viewValue: 'Functional Skill' },
    { value: '2', viewValue: 'BSC category' },
  ]

  options: Array<any> = [
    {name: 'Alia'},
    {name: 'Bunny'},
    {name: 'Catalina'},
    {name: 'Dinesh'},
    {name: 'Franklin'},
    {name: 'Harry'},
    {name: 'Jos Butler'},
    {name: 'Karan'},
    {name: 'Yogesh'},
    {name: 'Anmol'},
    {name: 'Ritika'},
    {name: 'Sam'},
    {name: 'Manish'},
    {name: 'Natalie'},
    {name: 'Amit'},
    {name: 'Vipul'},
    {name: 'Gaurav'},
  ];
  filteredOptions:  Array<any> = [];

  functional: Array<any> = [
    { value: "1", label: "Engineering" },
    { value: "2", label: "Design" },
    { value: "3", label: "Sales" }
  ]

  bscCategory: Array<any> = [
    { value: "1", label: "Bussiness" },
    { value: "2", label: "People" },
    { value: "3", label: "Process" },
    { value: "4", label: "Customer" }
  ]

  ngOnInit() {
    this.filteredOptions=JSON.parse(JSON.stringify(this.options));
    this.formGroupDocable = this.fb.group({
      title: ['',[Validators.required]],
      description: [''],
      startDate: [''],
      endDate: [''],
      owner: [this.owners[0].value],
      peopleDetails: this.fb.array([this.createPeople()]),
      alignment: [this.alignments[0].value],
      selectedCategory: [this.bscCategory[0].value],
      selectedFn: [this.functional[0].value]
    })
  }

  maxDate(){
    let date=new Date(this.formGroupDocable.get('startDate').value);
    return new Date(date.setFullYear(date.getFullYear() + 1))
  }

  displayFn(user?: any): string | undefined {
    return user ? user.name : undefined;
  }

  setArray(event,i,isClick:boolean){
    if(!event.target.value){
      this.filteredOptions=JSON.parse(JSON.stringify(this.options));
    }else{
      this.filteredOptions=this._filter(event.target.value)
    }
    console.log(event.target.value)
  }

  clearForm(){
    this.formGroupDocable.reset();
  }

  submitForm(){
    this.savedClick=true;
    if(!this.formGroupDocable.valid)
    return
    let data=this.formGroupDocable.value;
    this.appService.putData(data);
  }

  _filter(name: string): any[] {
    const filterValue = name.toLowerCase();
    return this.options.filter(option => option.name.toLowerCase().indexOf(filterValue) === 0);
  }


  get peopleDetailsRef() {
    return this.formGroupDocable.get('peopleDetails') as FormArray;
  }

  addPeople() {
    this.peopleDetailsRef.push(this.createPeople())
  }

  createPeople(data?: any) {
    return this.fb.group({
      file: '',
      name: ['',Validators.required],
      fileUrl:''
    })
  }

  deleteRow(i:number){
    this.peopleDetailsRef.removeAt(i)
  }

  fileChange(files: any) {
    console.log(files);
    this.myFile = files[0].nativeElement;
  }

  fileUploader(event,i:number) {
    if (event.target.files && event.target.files[0]) {
      var reader = new FileReader();
      reader.readAsDataURL(event.target.files[0]); // read file as data url
      reader.onload = (event: any) => { // called once readAsDataURL is completed
        this.url = event.target.result;
        let obj=this.peopleDetailsRef.controls[i].value;
        obj.fileUrl=this.url
        this.peopleDetailsRef.controls[i].patchValue({fileUrl:this.url})
      }

    }
  }


}






