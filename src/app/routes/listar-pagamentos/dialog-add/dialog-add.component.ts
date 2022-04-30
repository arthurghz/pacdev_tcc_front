import { Component, Inject, OnInit } from '@angular/core';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import { PagamentosService } from 'src/app/shared/service/pagamentos.service';
import { DialogDataAdd } from 'src/app/shared/interfaces/dialog-add';
import { FormControl, FormGroup, FormBuilder, Validators} from '@angular/forms';

@Component({
  selector: 'app-dialog-add',
  templateUrl: './dialog-add.component.html',
  styleUrls: ['./dialog-add.component.scss']
})
export class DialogAddComponent implements OnInit {

  
   form = this.formBuilder.group({
    name: ['', Validators.required],
    usernmae:  [''],
    title: [''],
    value:  ['', Validators.required],
    date:  ['', Validators.required],
    image:  [''],
    isPayed: [''],
  });

  value:any;
  constructor(public dialogRef: MatDialogRef<DialogAddComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DialogDataAdd, private paymentService:PagamentosService, private formBuilder: FormBuilder) { 
    }

  ngOnInit(): void {  }


  onNoClick(): void {
    this.dialogRef.close();
  }

  paymentSave($ev): void{
    
    $ev.preventDefault();
    this.form.markAllAsTouched();

    if(this.form.valid){

      console.log(this.form.value)

      this.paymentService.savePayment(this.form.value).subscribe(resp=>{
        this.dialogRef.close();
      });
    }
 

  }

}
