import { Component, OnInit } from '@angular/core';
import { Pet } from 'src/app/models/pet.model';
import { PetService } from 'src/app/shared/services/pet.service';
import { ActivatedRoute } from '@angular/router';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-pet-add',
  templateUrl: './pet-add.component.html',
  styleUrls: ['./pet-add.component.scss']
})
export class PetAddComponent implements OnInit {

  pet: Pet = new Pet();
  submitted = false;
  isUpdated = false;

  constructor(private petService: PetService, public router: ActivatedRoute) { }

  ngOnInit(): void {
    this.router.params.subscribe( params => {
      if(params && params.id){
        this.getPet(params.id);
        this.isUpdated = true;
      } 
      
    });    
  }

  savePet(): void {
    if(!this.isUpdated){
      this.petService.create(this.pet).then(() => {
      console.log("Pet criado com sucesso")
      this.submitted = true;
    });
    }else{
      this.petService.update(this.pet.id, this.pet).then(()=> this.submitted = true)
    }    
  }

  newPet(): void{
    this.submitted = false;
    this.pet = new Pet();
  }

  async getPet(id: string){
    return await this.petService.getPetById(id).snapshotChanges().pipe(
      map(changes =>
        changes.map(c =>
          ({ id: c.payload.doc.id, ...c.payload.doc.data() })                         
        )
      )
    ).subscribe(data => {
      console.log(data)
      if(data.length > 0){
        this.pet = data.pop();
      }
    });    
  }
}
