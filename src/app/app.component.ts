import { Component, ViewChild, ElementRef } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ObjectiveComponent } from './components/objective/objective.component';
import { AppStateService } from './app-state.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'dockable';
  isLinear = false;
  group1: FormGroup;
  group2: FormGroup;
  group3: FormGroup;
  outputData: any
  selectedForm: number = 0;

  // @ViewChild('objective') objective:ObjectiveComponent

  @ViewChild('objective', { static: false }) objective: ObjectiveComponent;

  constructor(private _formBuilder: FormBuilder, private appService: AppStateService) { }

  ngOnInit() {
    this.group1 = this._formBuilder.group({
      title: '',
      description: ''
    })
    this.group2 = this._formBuilder.group({
      title: '',
      description: ''
    })
    this.group3 = this._formBuilder.group({
      title: '',
      description: ''
    })
  }

  openedExp(event) {
    console.log(event);
    this.selectedForm = event;
  }

  clearForm() {
    if (this.selectedForm == 0) {
      this.objective.clearForm();
    } else if (this.selectedForm == 1) {
      this.group1.reset();
    } else if (this.selectedForm == 2) {
      this.group2.reset();
    } else if (this.selectedForm == 3) {
      this.group3.reset();
    }

  }

  submitForm() {
    this.objective.submitForm();
    this.outputData = this.appService.fetchData();
    this.outputData.title1 = this.group1.get('title').value;
    this.outputData.description1 = this.group1.get('description').value;
    this.appService.putData(this.outputData);
    this.outputData.title2 = this.group2.get('title').value;
    this.outputData.description2 = this.group2.get('description').value;
    this.appService.putData(this.outputData);
    this.outputData.title3 = this.group3.get('title').value;
    this.outputData.description3 = this.group3.get('description').value;
    this.appService.putData(this.outputData);
    this.outputData = this.appService.fetchData();
  }
}
