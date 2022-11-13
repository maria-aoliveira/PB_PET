import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { map } from 'rxjs/operators';
import { Alimentacao } from 'src/app/models/alimentacao.model';
import { AlimentacaoService } from 'src/app/shared/services/alimentacao.service';

@Component({
  selector: 'app-alimentacao',
  templateUrl: './alimentacao.component.html',
  styleUrls: ['./alimentacao.component.css']
})
export class AlimentacaoComponent implements OnInit {

  alimentacao: Alimentacao = new Alimentacao();
  alimentacoes?: Alimentacao[];
  storagedPet = localStorage.getItem('currentPet');
  parsedPet = JSON.parse(this.storagedPet);  
  isUpdated = false;

  constructor(private alimentacaoService: AlimentacaoService, public router: ActivatedRoute) { }

  ngOnInit(): void {
    this.listAlimentacoes()
  }

  saveAlimentacao(): void{
    this.alimentacaoService.create(this.alimentacao).then(() => {
      console.log("Alimentação criada com sucesso")
      this.alimentacao.data = null,
      this.alimentacao.racao = ''
      this.alimentacao.quantidade = null
    })
  }

  listAlimentacoes(): void{  
    this.alimentacaoService.getAlimentacaoFromPet(this.parsedPet.id).snapshotChanges().pipe(
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

  editAlimentacao(id: string, alimentacao: Alimentacao){
    this.alimentacaoService.update(id, alimentacao)
  }

  async getAlimentacao(id: string){
    return await this.alimentacaoService.getAlimentacaoById(id).snapshotChanges().pipe(
      map(changes =>
        changes.map(c =>
          ({ id: c.payload.doc.id, ...c.payload.doc.data() })                         
        )
      )
    ).subscribe(data => {
      console.log(data)
      if(data.length > 0){
        this.alimentacao = data.pop();
      }
    });    
  }

}
