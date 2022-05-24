import { Component, OnInit } from '@angular/core';
import { Router,ActivatedRoute } from '@angular/router';
import { GitProjectsService } from 'src/app/shared/service/git-projects.service';
import { userTest } from 'src/app/shared/constants/variables';

@Component({
  selector: 'app-history-projects',
  templateUrl: './history-projects.component.html',
  styleUrls: ['./history-projects.component.scss']
})
export class HistoryProjectsComponent implements OnInit {

  gitUser:any; 
  repoName:any;
  job_Id:any;
  infoJobs:any;
  page=1;
  //userTest = userTest;
  userTest:any;
  appTest:any;

  constructor(private router:Router, private activateRouter:ActivatedRoute, private gitProject:GitProjectsService) { }

  ngOnInit(): void {
    this.gitUser = this.activateRouter.snapshot.params.gitUser;
    this.repoName = this.activateRouter.snapshot.params.repoName;
    this.job_Id =  this.activateRouter.snapshot.params.job_Id

    this.gitProject.getStatusTest(this.gitUser, this.repoName, this.job_Id).subscribe(resp=>{
      this.infoJobs=resp['jobs'][0]['steps'];
    })

    
    this.gitProject.getLogTestUser(this.gitUser, this.repoName, this.job_Id).subscribe(resp=>{
      this.userTest = resp;
    })

    this.gitProject.getLogTestApp(this.gitUser, this.repoName, this.job_Id).subscribe(resp=>{
      this.appTest = resp;
    })
  }


  getLog(){
    this.gitProject.getLogTest(this.gitUser, this.repoName, this.job_Id).subscribe(resp=>{
      var downloadURL = window.URL.createObjectURL(resp);
      var link = document.createElement('a');
      link.href = downloadURL;
      link.download = "Log.zip";
      link.click();
    })
  }

  back(){
    this.router.navigate(['/list-projects'])
  }


}
