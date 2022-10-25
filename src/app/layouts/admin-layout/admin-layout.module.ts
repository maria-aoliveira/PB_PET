import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { ClipboardModule } from 'ngx-clipboard';

import { ComponentsModule } from '../../components/components.module';
import { AdminLayoutRoutes } from './admin-layout.routing';
import { DashboardComponent } from '../../pages/dashboard/dashboard.component';
import { IconsComponent } from '../../pages/icons/icons.component';
import { MapsComponent } from '../../pages/maps/maps.component';
import { UserProfileComponent } from '../../pages/user-profile/user-profile.component';
import { TablesComponent } from '../../pages/tables/tables.component';
import { AlimentacaoComponent } from 'src/app/pages/alimentacao/alimentacao.component';
import { ComportamentoComponent } from 'src/app/pages/comportamento/comportamento.component';
import { ControlePesoComponent } from 'src/app/pages/controle-peso/controle-peso.component';
import { ExamesComponent } from 'src/app/pages/exames/exames.component';
import { MedicamentosComponent } from 'src/app/pages/medicamentos/medicamentos.component';
import { SintomasComponent } from 'src/app/pages/sintomas/sintomas.component';
import { VacinasComponent } from 'src/app/pages/vacinas/vacinas.component';

import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { PetAddComponent } from 'src/app/pages/pet-add/pet-add.component';
import { PetListComponent } from 'src/app/pages/pet-list/pet-list.component';

// import { ToastrModule } from 'ngx-toastr';

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(AdminLayoutRoutes),
    FormsModule,
    HttpClientModule,
    NgbModule,
    ClipboardModule,
    ComponentsModule
  ],
  declarations: [
    DashboardComponent,
    UserProfileComponent,
    TablesComponent,
    IconsComponent,
    MapsComponent,
    AlimentacaoComponent,
    ComportamentoComponent,
    ControlePesoComponent,
    ExamesComponent,
    MedicamentosComponent,
    SintomasComponent,
    VacinasComponent,
    PetAddComponent,
    PetListComponent
  ]
})

export class AdminLayoutModule {}
