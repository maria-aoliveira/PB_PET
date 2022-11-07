import { Component, OnInit } from '@angular/core';
import { Peso } from 'src/app/models/peso.model';
import { PesoService } from 'src/app/shared/services/peso.service';
import { DatePipe } from "@angular/common";
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-controle-peso',
  templateUrl: './controle-peso.component.html',
  styleUrls: ['./controle-peso.component.css']
})
export class ControlePesoComponent implements OnInit {

  peso: Peso = new Peso();
  pesos?: Peso[];
  storagedPet = localStorage.getItem('currentPet');
  parsedPet = JSON.parse(this.storagedPet);  
  modalVisible = false;
  isUpdated = false;


  constructor(private pesoService: PesoService) { }

  ngOnInit(): void {
    this.listPesos()
  }

  savePeso(): void{
    if(!this.isUpdated){
      this.pesoService.create(this.peso).then(() => {
        console.log("Peso criado com sucesso")
        this.peso.data = null,
        this.peso.peso = null,
        this.peso.observacoes = ''
      })
    }
  }

  listPesos(): void{  
    this.pesoService.getPesosFromPet(this.parsedPet.id).snapshotChanges().pipe(
      map(changes =>
        changes.map(c =>
          ({ id: c.payload.doc.id, ...c.payload.doc.data() })
        )
      )
    ).subscribe(data => {
      this.pesos = data;
      console.log(this.pesos)
    });
  }

  mostrarModal(){
    this.modalVisible = true;
  }

  deletePeso(id: string){
    this.pesoService.delete(id)
  }

  editPeso(id: string, peso: Peso){
    this.pesoService.update(id, peso)
  }

//   deletePet(id: string): void{
//     this.petService.delete(this.currentPet.id)
//       .then(() => {
//         this.message = 'The tutorial was deleted successfully!';
//       })
//       .catch(err => console.log(err));    
// }
}
