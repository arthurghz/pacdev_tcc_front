import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { LoginService } from 'src/app/shared/service/login.service';
import { routes } from '../routes';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  form = this.formBuilder.group({
    name: ['', Validators.required],
    password: ['', Validators.required]
  });

  hide:boolean=true;

  constructor(private formBuilder:FormBuilder, private loginService: LoginService, private router: Router) { }

  ngOnInit(): void {
  }

  login(){

    console.log(this.form.get('name').value)
    this.loginService.getAccount(this.form.get('name').value, this.form.get('password').value).subscribe(resp=>{
      console.log(resp);

      if(resp.length>0){
        localStorage.setItem('tokenPayment', 'accessToken:{}');
        this.router.navigate(['home']);
      }
    });

  }
  
}
