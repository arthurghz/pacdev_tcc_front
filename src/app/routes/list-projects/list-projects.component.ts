import { Component, OnInit, TemplateRef } from '@angular/core';
import { GitProjectsService } from 'src/app/shared/service/git-projects.service';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-list-projects',
  templateUrl: './list-projects.component.html',
  styleUrls: ['./list-projects.component.scss']
})
export class ListProjectsComponent implements OnInit {

  modalRef?: BsModalRef | null;
  modalSelectRep?: BsModalRef | null;
  modalHistoryList?: BsModalRef | null;
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

  showJobId: boolean = false;
  listJobId:any;
  getRepErro:boolean = false;
  respMessage:any;
  registryMessage: any;
  readmeText:any;
  jobId:any;
  testRepo:any;
  page = 1;

  nameProjectError:boolean=false;
  repoProjectError:boolean=false;



  formTest: FormGroup = new FormGroup({
    gitUser: new FormControl(''),
    repo: new FormControl('', Validators.required),
    file: new FormControl('', Validators.required)
  });


  constructor(private projectService: GitProjectsService, private modalService: BsModalService, private router:Router) { }

  ngOnInit(): void {
    this.populateTable();
  }

  populateTable() {
    this.projectService.listProjects().subscribe(resp => {
      this.gitProjects = resp;
    });
  }

  openModal(template) {
    this.registryMessage = '';
    this.nameProject = '';
    this.repoProject = '';
    this.nameProjectError = false;
    this.repoProjectError = false;
    this.modalRef = this.modalService.show(template);
  }

  modalRepositories(selectRepository, repositories, gitUser) {
    this.repSelect = '';
    this.readmeText = '';
    this.repositories = repositories;
    this.gitUserSelect = gitUser
    this.modalSelectRep = this.modalService.show(selectRepository);
  }

  modalTestInit(testInit, repositories, gitUser){
    this.respMessage = '';
    this.nameFile = '';
    this.formTest.reset();
    this.repositories = repositories;
    this.gitUserSelect = gitUser
    this.modalTest =  this.modalService.show(testInit);
  }

  modalHistoryInit(selectRepository, repositories, gitUser){
    this.repSelect = '';
    this.showJobId = false;
    this.repositories = repositories;
    this.gitUserSelect = gitUser
    this.modalHistoryList = this.modalService.show(selectRepository);
  }

  saveProject() {
    
    if(this.nameProject && this.repoProject){    
      this.nameProjectError = false;
      this.repoProjectError = false;

    let info = {
      github_user: this.nameProject,
      repo_name: this.repoProject }


    this.projectService.saveProject(info).subscribe(resp => {
      this.modalRef.hide();
    }, error=>this.registryMessage = error.error.message);
  }else{
    this.nameProjectError = true;
    this.repoProjectError = true;
  }


  }

  getInfosProject() {
    if(this.repSelect){
     this.getRepErro = false;
     this.projectService.getProjectById(this.gitUserSelect, this.repSelect).subscribe(resp => {
      this.readmeText = resp;
    }) 
  }else{
    this.getRepErro = true;
  }
  }

  getFileTest(){

    if(this.formTest.get('repo').value){
    this.projectService.getFileTest(this.gitUserSelect, this.formTest.get('repo').value).subscribe(resp => {
      var downloadURL = window.URL.createObjectURL(resp);
      var link = document.createElement('a');
      link.href = downloadURL;
      link.download = "test_user.py";
      link.click();
    }) 
  }else{
    this.formTest.get('repo').markAsTouched();
  }
  }

  getSubmission(repoName){
    this.repSelect = repoName;

    this.projectService.getHistoryTest(this.gitUserSelect, repoName).subscribe(resp=>{
      this.showJobId = true;
      this.listJobId = resp;
    });  
  }

  navigateToJobDetail(value){
    this.modalHistoryList.hide();
    this.router.navigate([`/history/${this.gitUserSelect}/${this.repSelect}/${value}`])
  }


  onInputFile(event){
   
    this.file = event.target.files[0];  

    this.nameFile = this.file.name;
    
    if(this.nameFile.includes(' ')){
      this.nameFileError = true;
    }else{
      this.nameFileError = false;
    }

    this.formTest.get('file').setValue(this.file);
  }


  submitFileTest(){

    this.formTest.markAllAsTouched();

    if(this.formTest.valid && !this.nameFileError){

      const formData = new FormData();

      this.testRepo = this.formTest.get('repo')?.value;

      formData.append('file', this.formTest.get('file').value);

      this.projectService.submitTest(this.gitUserSelect, this.formTest.get('repo')?.value, formData).subscribe(resp=>{
   
        if(resp['Status'].includes('Sucess')){
          this.respMessage = `Test successfully!`
          this.jobId = resp['id_workflow']['job_id'];
        }

        this.formTest.reset();
        this.file = '';
        this.nameFile = '';
      }, error=> this.respMessage = error.error.message)
    }

  }


  navigateToLastTest(){
    this.modalTest.hide();
    this.router.navigate([`/history/${this.gitUserSelect}/${this.testRepo}/${this.jobId}`])
  }



  close(){
    this.modalTest.hide();
  }

}
