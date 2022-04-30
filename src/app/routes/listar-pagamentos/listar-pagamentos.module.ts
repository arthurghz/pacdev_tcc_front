import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ListarPagamentosComponent } from './listar-pagamentos.component';
import {RouterModule, Routes} from '@angular/router';
import { SharedModule } from 'src/app/shared/shared.module';
import { DialogInfoComponent } from './dialog-info/dialog-info.component';
import { DialogAddComponent } from './dialog-add/dialog-add.component';
import { NgxMaskModule, IConfig } from 'ngx-mask'

export const options: Partial<IConfig> | (() => Partial<IConfig>) = null;

const routes: Routes = [
  { path: '', component: ListarPagamentosComponent},
];

@NgModule({
  declarations: [
    ListarPagamentosComponent,
    DialogInfoComponent,
    DialogAddComponent,
    
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    SharedModule,
    NgxMaskModule.forRoot()
  ],
  
})
export class ListarPagamentosModule { }
