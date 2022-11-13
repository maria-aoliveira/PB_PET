import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Console } from 'console';
import { map } from 'rxjs/operators';
import { Sintoma } from 'src/app/models/sintoma.model';
import { SintomaService } from 'src/app/shared/services/sintoma.service';

@Component({
  selector: 'app-sintomas',
  templateUrl: './sintomas.component.html',
  styleUrls: ['./sintomas.component.css']
})
export class SintomasComponent implements OnInit {
  
  sintoma: Sintoma = new Sintoma();
  sintomas?: Sintoma[];
  storagedPet = localStorage.getItem('currentPet');
  parsedPet = JSON.parse(this.storagedPet);  
  isUpdated = false;


  constructor(private sintomaService: SintomaService, public router: ActivatedRoute) { }

  ngOnInit(): void {
    this.listSintomas()

  }

  saveSintoma(): void{
    this.sintomaService.create(this.sintoma).then(() => {
      console.log("Sintoma criado com sucesso")
      this.sintoma.data = null,
      this.sintoma.observacoes = ''
    })
  }

  listSintomas(): void{  
    this.sintomaService.getSintomaFromPet(this.parsedPet.id).snapshotChanges().pipe(
      map(changes =>
        changes.map(c =>
          ({ id: c.payload.doc.id, ...c.payload.doc.data() })
        )
      )
    ).subscribe(data => {
      this.sintomas = data;
    });
  }

  deleteSintoma(id: string){
    this.sintomaService.delete(id)
  }

  editSintoma(id: string, peso: Sintoma){
    this.sintomaService.update(id, peso)
  }

  async getSintoma(id: string){
    return await this.sintomaService.getSintomaById(id).snapshotChanges().pipe(
      map(changes =>
        changes.map(c =>
          ({ id: c.payload.doc.id, ...c.payload.doc.data() })                         
        )
      )
    ).subscribe(data => {
      console.log(data)
      if(data.length > 0){
        this.sintoma = data.pop();
      }
    });    
  }

}
