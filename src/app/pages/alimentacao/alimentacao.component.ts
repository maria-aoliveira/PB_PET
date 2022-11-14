import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { map } from 'rxjs/operators';
import { Alimentacao } from 'src/app/models/alimentacao.model';
import { AlimentacaoService } from 'src/app/shared/services/alimentacao.service';
import firebase from "firebase/compat/app";
import Timestamp = firebase.firestore.Timestamp;
import * as moment from 'moment';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-alimentacao',
  templateUrl: './alimentacao.component.html',
  styleUrls: ['./alimentacao.component.css']
})
export class AlimentacaoComponent implements OnInit {

  alimentacao: Alimentacao = new Alimentacao();
  alimentacoes?: Alimentacao[];
  currentAlimentacao?: Alimentacao;
  storagedPet = localStorage.getItem('currentPet');
  parsedPet = JSON.parse(this.storagedPet);  
  isUpdated = false;

  constructor(private alimentacaoService: AlimentacaoService, public router: ActivatedRoute, public route: Router, public datePipe: DatePipe) { }

  ngOnInit(): void {
    this.listAlimentacoes()
    this.router.params.subscribe(params => {
      if (params && params.id) {
        this.getAlimentacao(params.id);
        this.isUpdated = true;
      }
    });
  }

  saveAlimentacao(): void{
    if (!this.isUpdated) {
      this.alimentacaoService.create(this.alimentacao).then(() => {
      console.log("Alimentação criada com sucesso")
      this.alimentacao.data = null,
      this.alimentacao.racao = ''
      this.alimentacao.quantidade = null
    })
    }else{
      this.alimentacao.data = moment(this.alimentacao.data, 'DD/MM/YYYY').toDate()
      this.alimentacaoService.update(this.alimentacao.id, this.alimentacao).then(() =>
        this.route.navigate(['alimentacao'])
      )
    }
    
  }

  listAlimentacoes(): void{  
    this.alimentacaoService.getAlimentacaoFromPet().snapshotChanges().pipe(
      map(changes =>
        changes.map(c =>
          ({ id: c.payload.doc.id, ...c.payload.doc.data() })
        )
      )
    ).subscribe(data => {
      this.alimentacoes = data;
    });
  }

  deleteAlimentacao(id: string){
    this.alimentacaoService.delete(id)
  }

  handleActiveAlimentacao(alimentacao: Alimentacao) {
    this.currentAlimentacao = alimentacao;
    this.route.navigate([`edit-alimentacao/${this.currentAlimentacao.id}`]);
  }

  async getAlimentacao(id: string){
    return await this.alimentacaoService.getAlimentacaoById(id).snapshotChanges().pipe(
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
      console.log(data)
      if(data.length > 0){
        this.alimentacao = data.pop();
      }
    });    
  }

}
