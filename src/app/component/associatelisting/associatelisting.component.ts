import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { AddassociateComponent } from '../addassociate/addassociate.component';
import { Store } from '@ngrx/store';
import { Associates } from 'src/app/Store/Model/Associate.model';
import { getAssociateList } from 'src/app/Store/Associate/Associate.Selectors';
import { deleteAssociate, getAssociate, loadAssociate, openPopup } from 'src/app/Store/Associate/Associate.Action';
import { MatTableDataSource } from "@angular/material/table"
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';

@Component({
  selector: 'app-associatelisting',
  templateUrl: './associatelisting.component.html',
  styleUrls: ['./associatelisting.component.css']
})
export class AssociatelistingComponent implements OnInit{
  
  associateList!: Associates[];
  datasource: any;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  displayedColumns: string[]=["code", "name", "email", "phone", "address", "type", "group", "status", "action"];


  constructor(private dialog: MatDialog, private store: Store){

  }

  ngOnInit(): void {
    this.store.dispatch(loadAssociate());
    this.store.select(getAssociateList).subscribe(item=>{
      this.associateList = item;
      this.datasource = new MatTableDataSource<Associates>(this.associateList);
      this.datasource.paginator = this.paginator;
      this.datasource.sort = this.sort;
    });
  }

  functionAdd(){

    this.openPopup(0, 'Create Associate');
  }

  functionEdit(code:number){
    this.store.dispatch(getAssociate({id:code}))
    this.openPopup(code, 'Update Associate');
    
  }

  functionDelete(code:number){
    if(confirm('do you want to remove?')){
      this.store.dispatch(deleteAssociate({code:code}));
    }
  }

  openPopup(code: number, title: string){
    this.store.dispatch(openPopup());

    this.dialog.open(AddassociateComponent, {
      width:'50%',
      enterAnimationDuration:'1000ms',
      exitAnimationDuration:'1000ms',
      data:{
        code: code,
        title: title
      }
    })

  }

}
