import { Component, Input, OnInit } from '@angular/core';
import { Pet } from 'src/app/models/pet.model';
import calcIdade from 'src/app/utils/calcIdade';

@Component({
  selector: 'app-pet-card-header',
  templateUrl: './pet-card-header.component.html',
  styleUrls: ['./pet-card-header.component.scss']
})
export class PetCardHeaderComponent implements OnInit {

  @Input("pet")
  public pet: Pet = null;

  constructor() { }

  ngOnInit(): void {
  }

  public idade() {
    return calcIdade(this.pet.data_nascimento.toString());
  }

}
