import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { map } from 'rxjs/operators';
import { Pet } from 'src/app/models/pet.model';
import { PetService } from 'src/app/shared/services/pet.service';
import { threadId } from 'worker_threads';

@Component({
  selector: 'app-pet-list',
  templateUrl: './pet-list.component.html',
  styleUrls: ['./pet-list.component.scss']
})
export class PetListComponent implements OnInit {

  pets?: Pet[];
  currentPet?: Pet;
  currentIndex = -1;
  message = '';

  constructor(public router: Router, private petService: PetService) {}

  ngOnInit(): void {
    this.retrievePets();
    this.message = '';
  }

  // retrievePets(): void {
  //   this.petService.getAll().snapshotChanges().pipe(
  //     map(changes =>
  //       changes.map(c =>
  //         ({ id: c.payload.doc.id, ...c.payload.doc.data() })
  //       )
  //     )
  //   ).subscribe(data => {
  //     this.pets = data;
  //   });
  // }

  retrievePets(): void {
    var user = localStorage.getItem('user');
    var parsedUser = JSON.parse(user);
    var usuario_uid = parsedUser.uid;
    this.petService.getPetsFromUser(usuario_uid).snapshotChanges().pipe(
      map(changes =>
        changes.map(c =>
          ({ id: c.payload.doc.id, ...c.payload.doc.data() })
        )
      )
    ).subscribe(data => {
      this.pets = data;
    });
  }

  deletePet(): void{
    this.petService.delete(this.currentPet.id)
      .then(() => {
        this.message = 'Pet was deleted successfully!';
      })
      .catch(err => console.log(err));    
}

  goToEditPet(){  
    this.router.navigate([`pet-edit/${this.currentPet.id}`]);
  }

  setActivePet(pet: Pet): void {
    this.currentPet = pet;
    localStorage.setItem("currentPet", JSON.stringify(pet))
  }

  public goToAddPet(){
    this.router.navigate(['pet-add']);

  }

  public goToPetDashboard(currentPetId: string){
    this.router.navigate([`dashboard/${currentPetId}`]);
  }

  public async handleActivePet(pet: Pet) {
    this.setActivePet(pet);
    await this.router.navigate([`dashboard/${pet.id}`]);
  }
}
