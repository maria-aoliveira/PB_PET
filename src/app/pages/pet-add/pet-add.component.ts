import { Component, OnInit } from '@angular/core';
import { Pet } from 'src/app/models/pet.model';
import { PetService } from 'src/app/shared/services/pet.service';

@Component({
  selector: 'app-pet-add',
  templateUrl: './pet-add.component.html',
  styleUrls: ['./pet-add.component.scss']
})
export class PetAddComponent implements OnInit {

  pet: Pet = new Pet();
  submitted = false;

  constructor(private petService: PetService) { }

  ngOnInit(): void {
  }

  savePet(): void {
    this.petService.create(this.pet).then(() => {
      console.log("Pet criado com sucesso")
      this.submitted = true;
    })
  }

  newPet(): void{
    this.submitted = false;
    this.pet = new Pet();
    console.log('oi');
  }

}
