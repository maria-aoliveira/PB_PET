import { Component, OnInit } from '@angular/core';
import { Pet } from 'src/app/models/pet.model';
import { PetService } from 'src/app/shared/services/pet.service';
import { ActivatedRoute } from '@angular/router';
import { map } from 'rxjs/operators';
import { throws } from 'assert';
import { Arquivo } from 'src/app/models/arquivo.model';
import { threadId } from 'worker_threads';

@Component({
  selector: 'app-pet-add',
  templateUrl: './pet-add.component.html',
  styleUrls: ['./pet-add.component.scss']
})
export class PetAddComponent implements OnInit {

  pet: Pet = new Pet();
  submitted = false;
  isUpdated = false;
  selectedFiles: FileList;
  currentFileUpload: Arquivo;

  constructor(private petService: PetService, public router: ActivatedRoute) { }

  ngOnInit(): void {
    this.router.params.subscribe( params => {
      if(params && params.id){
        this.getPet(params.id);
        this.isUpdated = true;
      } 
      
    });    
  }

  selectFile(event): void {
    this.selectedFiles = event.target.files;
  }

  delay(ms: number) {
    return new Promise( resolve => setTimeout(resolve, ms) );
}

  savePet(): void {
    if(!this.isUpdated){
      const file = this.selectedFiles.item(0);
      this.selectedFiles = undefined;
      
      this.currentFileUpload = new Arquivo(file);
      this.petService.pushFileToStorage(this.currentFileUpload)
      this.petService.create(this.pet)
    //   .then(() => {
    //   console.log("Pet criado com sucesso")
    //   this.submitted = true;
    // });
    }else{
      console.log(this.pet)
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
      // console.log(data)
      if(data.length > 0){
        this.pet = data.pop();
        console.log(this.pet)
      }
    });    
  }
}
