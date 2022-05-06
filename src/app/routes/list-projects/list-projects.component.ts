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
  modalSelectRep?: BsModalRef | null;
  modalMessage: BsModalRef | null;
  gitProjects: any;
  nameProject: any;
  repoProject: any;
  repositories: any;
  repSelect:any;
  gitUserSelect:any;

  constructor(private projectService: GitProjectsService, private modalService: BsModalService) { }

  ngOnInit(): void {
    this.populateTable();
  }


  populateTable() {
    this.projectService.listProjects().subscribe(resp => {
      this.gitProjects = resp;
    });
  }

  openModal(template: TemplateRef<any>) {
    this.modalRef = this.modalService.show(template);
  }

  modalRepositories(selectRepository: TemplateRef<any>, repositories, gitUser) {
    this.repositories = repositories;
    this.gitUserSelect = gitUser
    this.modalRef = this.modalService.show(selectRepository);
  }

  saveProject() {
    let info =
    {
      github_user: this.nameProject,
      repo_name: this.repoProject,
    }

    console.log(info);
    this.projectService.saveProject(info).subscribe(resp => {
      console.log(resp);
      String(resp).includes('')
    });
  }

  getInfosProject() {

     this.projectService.getProjectById(this.gitUserSelect, this.repSelect).subscribe(resp => {
      var downloadURL = window.URL.createObjectURL(resp);
      var link = document.createElement('a');
      link.href = downloadURL;
      link.download = "README.txt";
      link.click();
      
    }) 
  }

}
