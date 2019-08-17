import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AppStateService {

  constructor() { }
  data:any
  putData(data:any){
    this.data=data;
  }
  fetchData(){
    return this.data
  }
}
