import { Component, OnInit } from '@angular/core';
import { Peso } from 'src/app/models/peso.model';
import { PesoService } from 'src/app/shared/services/peso.service';
import { DatePipe } from "@angular/common";
import { first, map } from 'rxjs/operators';
import { ActivatedRoute, Route, Router } from '@angular/router';
import { FormGroup } from '@angular/forms';

@Component({
  selector: 'app-controle-peso',
  templateUrl: './controle-peso.component.html',
  styleUrls: ['./controle-peso.component.css']
})
export class ControlePesoComponent implements OnInit {

  peso: Peso = new Peso();
  pesos?: Peso[];
  currentPeso?: Peso;
  storagedPet = localStorage.getItem('currentPet');
  parsedPet = JSON.parse(this.storagedPet);
  isUpdated = false;
  id: string;
  // isAddMode: boolean;
  // form: FormGroup;


  constructor(private pesoService: PesoService, public router: ActivatedRoute, public route: Router) { }

  ngOnInit(): void {
    this.listPesos()
    this.router.params.subscribe(params => {
      if (params && params.id) {
        this.getPeso(params.id);
        // this.getPeso();
        // console.log(this.getPeso())
        this.isUpdated = true;
      }
    });
  }

  savePeso(): void {
    if (!this.isUpdated) {
      console.log(this.peso)
      this.pesoService.create(this.peso).then(() => {
        console.log("Peso criado com sucesso")
        this.peso.data = null,
          this.peso.peso = null,
          this.peso.observacoes = ''
      })
    } else {
      // console.log(this.peso.id)
      // console.log(this.peso)
      // console.log(this.currentPeso.peso)
      this.pesoService.update(this.peso.id, this.peso).then(() =>
        this.route.navigate(['controle-peso'])
      )
    }
  }

  listPesos(): void {
    this.pesoService.getPesosFromPet().snapshotChanges().pipe(
      map(changes =>
        changes.map(c =>
          ({ id: c.payload.doc.id, ...c.payload.doc.data() })
        )
      )
    ).subscribe(data => {
      this.pesos = data;
      // console.log(this.pesos)
    });
  }

  deletePeso(id: string) {
    this.pesoService.delete(id)
  }

  handleActivePet(peso: Peso) {
    this.currentPeso = peso;
    console.log("peso" + this.currentPeso)
    localStorage.setItem("currentPeso", JSON.stringify(this.currentPeso))
    this.route.navigate([`edit-peso/${this.currentPeso.id}`]);
  }

  updatedate(event) {
    this.peso.data = new Date(event);
}

  // getPeso() {
  //   // console.log(localStorage.getItem("currentPeso"))
  //   return localStorage.getItem("currentPeso");
  // }

  async getPeso(id: string) {
    console.log(id)
    return this.pesoService.getPesoById(id).snapshotChanges().pipe(
      map(changes =>
        changes.map(c =>
          ({ id: c.payload.doc.id, ...c.payload.doc.data() })
        )
      )
    ).subscribe(data => {
      if (data.length > 0) {
        this.peso = data.pop();

        console.log(this.peso)
      }
    });
  }
}
