import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-pet-list',
  templateUrl: './pet-list.component.html',
  styleUrls: ['./pet-list.component.scss']
})
export class PetListComponent implements OnInit {

  constructor(public router: Router) {}

  ngOnInit(): void {
  }

  
  public goToAddPet(){
    this.router.navigate(['pet-add']);

  }
}
