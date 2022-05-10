import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HistoryProjectsComponent } from './history-projects.component';
import { Routes, RouterModule } from '@angular/router';
import { SharedModule } from 'src/app/shared/shared.module';

const routes: Routes = [
  { path: ':gitUser/:repoName/:job_Id', component: HistoryProjectsComponent },
];

@NgModule({
  declarations: [
    HistoryProjectsComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    RouterModule.forChild(routes)
  ]
})
export class HistoryProjectsModule { }
