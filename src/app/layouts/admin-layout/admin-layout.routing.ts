import { Routes } from '@angular/router';

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
import { PetAddComponent } from 'src/app/pages/pet-add/pet-add.component';
import { PetListComponent } from 'src/app/pages/pet-list/pet-list.component';

export const AdminLayoutRoutes: Routes = [
    { path: 'dashboard/:id', component: DashboardComponent },
    { path: 'user-profile', component: UserProfileComponent },
    { path: 'tables', component: TablesComponent },
    { path: 'icons', component: IconsComponent },
    { path: 'maps', component: MapsComponent },
    { path: 'alimentacao', component: AlimentacaoComponent },
    { path: 'sintomas', component: SintomasComponent },
    { path: 'comportamento', component: ComportamentoComponent },
    { path: 'controle-peso', component: ControlePesoComponent },
    { path: 'exames', component: ExamesComponent },
    { path: 'medicamentos', component: MedicamentosComponent },
    { path: 'vacinas', component: VacinasComponent },
    { path: 'pet-add', component: PetAddComponent },
    { path: 'pet-list', component: PetListComponent },
    { path: 'pet-add/:id', component: PetAddComponent }
];
