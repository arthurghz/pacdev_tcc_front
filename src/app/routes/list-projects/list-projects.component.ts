import { Component, OnInit, TemplateRef } from '@angular/core';
import { GitProjectsService } from 'src/app/shared/service/git-projects.service';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';

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

  modalRef?: BsModalRef | null;
  gitProjects: any;
  nameProject: any;
  repoProject: any;

  constructor(private projectService:GitProjectsService, private modalService: BsModalService) { }

  ngOnInit(): void {
    this.gitProjects = projects;
    this.populateTable();
  }


  populateTable(){
   this.projectService.listProjects().subscribe(resp=>{
      console.log(resp); 
    });
  }

  openModal(template: TemplateRef<any>) {
    this.modalRef = this.modalService.show(template);
  }


  saveProject(){
   let  info = 
      {
        github_user: this.nameProject,
        repo_name: this.repoProject,
      }
    
      console.log(info);
    this.projectService.saveProject(info).subscribe(resp=>{
      console.log(resp);
    });
  }

}
