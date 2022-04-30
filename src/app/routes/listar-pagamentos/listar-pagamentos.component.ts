import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { PagamentosService } from 'src/app/shared/service/pagamentos.service';
import { DialogInfoComponent } from './dialog-info/dialog-info.component';
import { DialogAddComponent } from './dialog-add/dialog-add.component';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import {MatSort, Sort} from '@angular/material/sort'
import {LiveAnnouncer} from '@angular/cdk/a11y';

@Component({
  selector: 'app-listar-pagamentos',
  templateUrl: './listar-pagamentos.component.html',
  styleUrls: ['./listar-pagamentos.component.scss']
})
export class ListarPagamentosComponent implements OnInit{

  displayedColumns: string[] = ['name', 'title', 'date', 'value', 'isPayed', 'action'];
  dataSource = new MatTableDataSource<any>();
  page = 1;
  limit = 20

  length = 100;
  pageSize = 10;
  pageEvent: PageEvent;
  filter: any;

  @ViewChild(MatPaginator) paginator: MatPaginator;

  constructor(private paymentsService: PagamentosService, private dialog: MatDialog, private _liveAnnouncer: LiveAnnouncer) { }

  @ViewChild(MatSort) sort: MatSort;

  ngOnInit(): void {
    this.listPayments();
  }


  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }


  onPaginateChange(event) {
    console.log(event);
  }

  nextPage() {
    this.page = this.page + 1;
    this.paymentsService.listPayments(this.page, this.limit).subscribe(resp => {
      const table = new MatTableDataSource<any>(resp.body)
      this.dataSource = table
    })
  }


  previousPage() {
    this.page = this.page - 1;
    this.paymentsService.listPayments(this.page, this.limit).subscribe(resp => {
      const table = new MatTableDataSource<any>(resp.body)
      this.dataSource = table
    })
  }

  userFilter() {
    this.paymentsService.filterPayments(this.filter).subscribe(resp => {
      if (resp.length == 0) {
        this.openDialogInfo('', 'O usuário buscado não foi encontrado', 'info');
      } else {
        this.dataSource = resp;
      }
    });
  }

  deletePayment(userData) {
    this.openDialogInfo(userData, '', 'del');
  }

  listPayments() {
    this.paymentsService.listPayments(this.page, this.limit).subscribe(resp => {
      const table = new MatTableDataSource<any>(resp.body)
      this.dataSource = table
    }, error => console.log(error))
  }


  openDialogInfo(data, message, flag):void{
  const dialoRef = this.dialog.open(DialogInfoComponent, { width: '400px', data: {flag:flag ,message: message, data:[{id:data['id'] ,user:data['name'], date:data['date'], value:data['value']}] }})
    
  if(flag==='del'){
    dialoRef.afterClosed().subscribe(result=>{this.listPayments()});
  }
}

openDialogAdd(){
const dialogRef =  this.dialog.open(DialogAddComponent, {width: '800px', data:'teste'});

dialogRef.afterClosed().subscribe(result=>{this.listPayments()});
}

 announceSortChange(sortState: Sort) {

  if (sortState.direction) {
    this._liveAnnouncer.announce(`Sorted ${sortState.direction}ending`);
  } else {
    this._liveAnnouncer.announce('Sorting cleared');
  }
}

}

