import { Component, OnInit } from '@angular/core';
import { Pet } from 'src/app/models/pet.model';
import { PetService } from 'src/app/shared/services/pet.service';
import { ActivatedRoute, Router } from '@angular/router';
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

  constructor(private petService: PetService, public router: ActivatedRoute, public rout: Router) { }

  ngOnInit(): void {
    this.router.params.subscribe(params => {
      if (params && params.id) {
        this.getPet(params.id);
        this.isUpdated = true;
      }

    });
  }

  selectFile(event): void {
    this.selectedFiles = event.target.files;
  }

  delay(ms: number) {
    return new Promise(resolve => setTimeout(resolve, ms));
  }

  async savePet(): Promise<void> {

    const wait5s = () => {
      return new Promise<void>(resolve => {
        setTimeout(() => resolve(), 10000)
      })
    }

    if (!this.isUpdated) {
      const file = this.selectedFiles?.item(0);

      if (file) {
        this.selectedFiles = undefined;
        this.currentFileUpload = new Arquivo(file);
        this.petService.pushFileToStorage(this.currentFileUpload)

        await wait5s()

        this.pet.imagem = JSON.parse(localStorage.getItem('imageUrl'))
      }else{
        this.pet.imagem = ''
      }


      this.petService.create(this.pet, this.pet.imagem)
        .then(() => {
          console.log("Pet criado com sucesso")
          this.submitted = true;
        });
    } else {
      // console.log(this.pet)
      const file = this.selectedFiles?.item(0);

      if (file) {
        this.selectedFiles = undefined;
        this.currentFileUpload = new Arquivo(file);
        this.petService.pushFileToStorage(this.currentFileUpload)
      }

      await wait5s()

      this.pet.imagem = JSON.parse(localStorage.getItem('imageUrl'))
      console.log('1' + JSON.parse(localStorage.getItem('imageUrl')))
      this.petService.update(this.pet.id, this.pet).then(() => this.submitted = true)
      this.submitted = true

    }
  }

  // async edit() {
  //   const wait5s = () => {
  //     return new Promise<void>(resolve => {
  //       setTimeout(() => resolve(), 10000)
  //     })
  //   }

  //   this.pet.imagem = JSON.parse(localStorage.getItem('imageUrl'))

  //   console.log('1' + JSON.parse(localStorage.getItem('imageUrl')))

  //   this.petService.update(this.pet.id, this.pet).then(() => this.submitted = true)

  //   await wait5s()

  //   this.rout.navigate(['pet-list']);

  // }

  newPet(): void {
    this.submitted = false;
    this.pet = new Pet();
  }

  async getPet(id: string) {
    return await this.petService.getPetById(id).snapshotChanges().pipe(
      map(changes =>
        changes.map(c =>
          ({ id: c.payload.doc.id, ...c.payload.doc.data() })
        )
      )
    ).subscribe(data => {
      // console.log(data)
      if (data.length > 0) {
        this.pet = data.pop();
        console.log(this.pet)
      }
    });
  }
}
