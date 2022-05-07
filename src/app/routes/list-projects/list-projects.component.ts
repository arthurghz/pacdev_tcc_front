import { Component, OnInit, TemplateRef } from '@angular/core';
import { GitProjectsService } from 'src/app/shared/service/git-projects.service';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';
import { FormControl, FormGroup, Validators } from '@angular/forms';

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
  modalTest: BsModalRef | null;
  gitProjects: any;
  nameProject: any;
  repoProject: any;
  repositories: any;
  repSelect:any;
  gitUserSelect:any;
  nameFile:any;
  file:any;
  errorFile:boolean=false;
  nameFileError:boolean=false;
  repSelectError:boolean=false;
  formData = new FormData();
  respMessage:any;

  formUpload: FormGroup = new FormGroup({
    gitUser: new FormControl(''),
    repo: new FormControl('', Validators.required),
    file: new FormControl('', Validators.required)
  });


  constructor(private projectService: GitProjectsService, private modalService: BsModalService) { }

  ngOnInit(): void {
    this.populateTable();
  }


  populateTable() {
    this.projectService.listProjects().subscribe(resp => {
      this.gitProjects = resp;
    });
  }

  openModal(template) {
    this.modalRef = this.modalService.show(template);
  }

  modalRepositories(selectRepository, repositories, gitUser) {
    this.repSelect = '';
    this.repositories = repositories;
    this.gitUserSelect = gitUser
    this.modalSelectRep = this.modalService.show(selectRepository);
  }

  modalTestInit(testInit, repositories, gitUser){
    this.respMessage = '';
    this.repositories = repositories;
    this.gitUserSelect = gitUser
    this.modalTest =  this.modalService.show(testInit);
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
    });
  }

  getInfosProject() {
     this.projectService.getProjectById(this.gitUserSelect, this.repSelect).subscribe(resp => {
      var downloadURL = window.URL.createObjectURL(resp);
      var link = document.createElement('a');
      link.href = downloadURL;
      link.download = "README.txt";
      link.click();
      this.modalSelectRep.hide();
    }) 
  }

  getFileTest(){

    if(this.formUpload.get('repo').value){
    this.projectService.getFileTest(this.gitUserSelect, this.formUpload.get('repo').value).subscribe(resp => {
      var downloadURL = window.URL.createObjectURL(resp);
      var link = document.createElement('a');
      link.href = downloadURL;
      link.download = "fileTest.txt";
      link.click();
    }) 
  }else{
    this.formUpload.get('repo').markAsTouched();
  }


  }

  onInputFile(event){
   
    this.file = event.target.files[0];  
    console.log(this.file)
  
    this.nameFile = this.file.name;
    
    if(this.nameFile.includes(' ')){
      this.nameFileError = true;
    }else{
      this.nameFileError = false;
    }

    this.formUpload.get('file').setValue(this.file);
  }


  submitFileTest(){

    this.formUpload.markAllAsTouched();

    if(this.formUpload.valid && !this.nameFileError){

      const formData = new FormData();

      formData.append('file', this.formUpload.get('file').value);

      this.projectService.submitTest(this.gitUserSelect, this.formUpload.get('repo')?.value, formData).subscribe(resp=>{
        console.log(resp);

        if(resp['Status'].includes('Sucess')){
          this.respMessage = `Teste submetido com sucesso!`
        }

        this.formUpload.reset();
        this.file = '';
        this.nameFile = '';
      })
    }

  }

  close(){
    this.modalTest.hide();
  }

}
