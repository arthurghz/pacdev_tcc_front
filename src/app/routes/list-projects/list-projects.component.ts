import { Component, OnInit } from '@angular/core';
import { GitProjectsService } from 'src/app/shared/service/git-projects.service';

const projects = [{
    nameProject: "arthurghz",
    repositories: ['pacdev', 'teste1', 'teste2']
    },
    {
    nameProject: "arthurx",
    repositories: ['pacdev', 'teste1', 'teste2']
    },
    {
      nameProject: "maxnb_",
      repositories: ['fron-tcc', 'teste1', 'teste2']
    }
]

@Component({
  selector: 'app-list-projects',
  templateUrl: './list-projects.component.html',
  styleUrls: ['./list-projects.component.scss']
})
export class ListProjectsComponent implements OnInit {

  gitProjects: any;

  constructor(private projectService:GitProjectsService) { }

  ngOnInit(): void {
    this.gitProjects = projects;
    this.populateTable();
  }


  populateTable(){
   this.projectService.listProjects().subscribe(resp=>{
      console.log(resp); 
    });
  }

}
