import { Component, Inject, OnInit } from '@angular/core';
import { DialogData } from 'src/app/shared/interfaces/dialog-info';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import { PagamentosService } from 'src/app/shared/service/pagamentos.service';

@Component({
  selector: 'app-dialog-info',
  templateUrl: './dialog-info.component.html',
  styleUrls: ['./dialog-info.component.scss']
})
export class DialogInfoComponent implements OnInit {

  constructor(public dialogRef: MatDialogRef<DialogInfoComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData, private paymentService:PagamentosService) { }

  ngOnInit(): void {
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  paymentDelete(){
    this.paymentService.deletePayment(this.data.data[0].id).subscribe(resp => { 

/*       if(resp.status=200){
        this.openDialogInfo('Usuário excluído com sucesso!');} */
        this.dialogRef.close();
    
    }, error => console.error(error))
  }
}
