import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SidebarComponent } from './sidebar/sidebar.component';
import { NavbarComponent } from './navbar/navbar.component';
import { FooterComponent } from './footer/footer.component';
import { PetCardHeaderComponent } from './pet-card-header/pet-card-header.component';
import { RouterModule } from '@angular/router';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

@NgModule({
  imports: [
    CommonModule,
    RouterModule,
    NgbModule
  ],
  declarations: [
    FooterComponent,
    NavbarComponent,
    SidebarComponent,
    PetCardHeaderComponent
  ],
  exports: [
    FooterComponent,
    NavbarComponent,
    SidebarComponent,
    PetCardHeaderComponent
  ]
})
export class ComponentsModule { }
