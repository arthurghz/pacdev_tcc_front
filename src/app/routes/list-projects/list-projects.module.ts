import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ListProjectsComponent } from './list-projects.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { RouterModule, Routes} from '@angular/router';

const routes: Routes = [
  { path: '', component: ListProjectsComponent},
];

@NgModule({
  declarations: [
    ListProjectsComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    SharedModule
  ]
})
export class ListProjectsModule { }
