import { Component, OnInit } from '@angular/core';
import { Console } from 'console';

@Component({
  selector: 'app-sintomas',
  templateUrl: './sintomas.component.html',
  styleUrls: ['./sintomas.component.css']
})
export class SintomasComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

  public openModal(){
    console.log("opa")    
  }

}
