import { Component, OnInit, ElementRef } from '@angular/core';
// import { ROUTES } from '../sidebar/sidebar.component';
import { Location, LocationStrategy, PathLocationStrategy } from '@angular/common';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/shared/services/auth.service';

declare interface RouteInfo {
  path: string;
  title: string;
  icon: string;
  class: string;
}
export const ROUTES: RouteInfo[] = [
  { path: 'pet-add', title: 'Adicionar Pet',  icon:'ni ni-bullet-list-67 text-green', class: '' },
  { path: 'pet-edit', title: 'Editar Pet',  icon:'ni-single-02 text-yellow', class: '' },
  { path: 'pet-list', title: 'Meus Pets',  icon:'ni ni-bullet-list-67 text-green', class: '' },
  { path: 'user-profile', title: 'Perfil',  icon:'ni-single-02 text-yellow', class: '' },
  { path: 'alimentacao', title: 'Alimentação',  icon:'ni-single-02 text-yellow', class: '' },
  { path: 'comportamento', title: 'Comportamento',  icon:'ni-single-02 text-yellow', class: '' },
  { path: 'controle-peso', title: 'Peso',  icon:'ni-single-02 text-yellow', class: '' },
  { path: 'exames', title: 'Exames',  icon:'ni-single-02 text-yellow', class: '' },
  { path: 'pet-list', title: 'Lista de Pets',  icon:'ni-single-02 text-yellow', class: '' },
  { path: 'sintomas', title: 'Sintomas',  icon:'ni-single-02 text-yellow', class: '' },
  { path: 'vacinas', title: 'Vacinas',  icon:'ni-single-02 text-yellow', class: '' },
];

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {
  public focus;
  public listTitles: any[];
  public location: Location;

  constructor(location: Location,  private element: ElementRef, private router: Router, public authService: AuthService) {
    this.location = location;
  }

  ngOnInit() {
    this.listTitles = ROUTES.filter(listTitle => listTitle);
  }
  
  getTitle(){
    var titlee = this.location.prepareExternalUrl(this.location.path());
    if(titlee.charAt(0) === '#'){
        titlee = titlee.slice( 2 );
        var url = titlee.split('/')[0]
    }
    
    for(var item = 0; item < this.listTitles.length; item++){
        if(this.listTitles[item].path === url){
          console.log(this.listTitles[item].title)
            return this.listTitles[item].title;
        }
    }
    return 'Dashboard';
  }

}
