import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Console } from 'console';
import { map } from 'rxjs/operators';
import { Sintoma } from 'src/app/models/sintoma.model';
import { SintomaService } from 'src/app/shared/services/sintoma.service';
import firebase from "firebase/compat/app";
import Timestamp = firebase.firestore.Timestamp;
import * as moment from 'moment';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-sintomas',
  templateUrl: './sintomas.component.html',
  styleUrls: ['./sintomas.component.css']
})
export class SintomasComponent implements OnInit {

  sintoma: Sintoma = new Sintoma();
  sintomas?: Sintoma[];
  currentSintoma?: Sintoma;
  storagedPet = localStorage.getItem('currentPet');
  parsedPet = JSON.parse(this.storagedPet);
  isUpdated = false;


  constructor(private sintomaService: SintomaService, public router: ActivatedRoute, public route: Router, public datePipe: DatePipe) { }

  ngOnInit(): void {
    this.listSintomas()
    this.router.params.subscribe(params => {
      if (params && params.id) {
        this.getSintoma(params.id);
        this.isUpdated = true;
      }
    });
  }

  saveSintoma(): void {
    if (!this.isUpdated) {
      this.sintomaService.create(this.sintoma).then(() => {
        console.log("Sintoma criado com sucesso")
        this.sintoma.data = null,
        this.sintoma.observacoes = ''
      })
    } else {
      this.sintoma.data = moment(this.sintoma.data, 'DD/MM/YYYY').toDate()
      this.sintomaService.update(this.sintoma.id, this.sintoma).then(() =>
        this.route.navigate(['sintomas'])
      )
    }
  }

  listSintomas(): void {
    this.sintomaService.getSintomaFromPet().snapshotChanges().pipe(
      map(changes =>
        changes.map(c => {
          const data = c.payload.doc.data()
          const id = c.payload.doc.id
          // Object.keys(data).filter(key => data[key])
          //         .forEach(key => {console.log(data[key] = data[key].toString())})
          return { id, ...data}
        })
      )
    ).subscribe(data => {
      this.sintomas = data;
    });
  }

  deleteSintoma(id: string) {
    this.sintomaService.delete(id)
  }

  editSintoma(id: string, peso: Sintoma) {
    this.sintomaService.update(id, peso)
  }

  handleActiveSintoma(sintoma: Sintoma) {
    this.currentSintoma = sintoma;
    this.route.navigate([`edit-sintoma/${this.currentSintoma.id}`]);
  }

  async getSintoma(id: string) {
    return await this.sintomaService.getSintomaById(id).snapshotChanges().pipe(
      map(changes =>
        changes.map(c => {
          const data = c.payload.doc.data()
          const id = c.payload.doc.id
          Object.keys(data).filter(key => data[key] instanceof Timestamp)
                  .forEach(key => {
                    data[key] = this.datePipe.transform(data[key].toDate(), 'dd/MM/yyyy').toString()})
          return { id, ...data}
        })
      )
    ).subscribe(data => {
      if (data.length > 0) {
        this.sintoma = data.pop();
      }
    });
  }

}
