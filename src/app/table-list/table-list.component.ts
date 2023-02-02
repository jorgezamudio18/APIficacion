import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { RestApiServiceService } from '../Servicio/rest-api-service.service'; //servicio al api 
import { ICommonResponse } from '../Interfaces/icommon-response';
import { MatSnackBar } from '@angular/material/snack-bar';
import { IPerson } from 'app/Interfaces/iperson';
import { response } from 'express';
import { ISimpleItemLists } from 'app/Interfaces/isimple-item-lists';

@Component({
  selector: 'app-table-list',
  templateUrl: './table-list.component.html',
  styleUrls: ['./table-list.component.css'],
})
export class TableListComponent implements OnInit {
  public persona: FormGroup;
  public PersonArray: Array<IPerson> = [];
  public totalPerson: Array<ISimpleItemLists> = [];

  constructor(
    public apiService: RestApiServiceService,
  ) {
    this.persona = new FormGroup({

      FistName: new FormControl(null, Validators.required),
      LastName: new FormControl(null, Validators.required),
      DateTime: new FormControl(null, Validators.required),
      Address: new FormControl(null, Validators.required),
      Gender: new FormControl(null, Validators.required),
      Age: new FormControl(null, Validators.required)

    })
  }

  ngOnInit() {
    this.apiService
      .Get('Person/List')
      .subscribe((response: ICommonResponse) => {
        console.log('data', response.data);
        this.totalPerson = <ISimpleItemLists[]>response.data;
        console.log('person', this.totalPerson);

      })
  }

  Delete(person: ISimpleItemLists) {
    this.apiService
      .Get('Person/Delete/' + person.identificationNumber)
      .subscribe((response: ICommonResponse) => {
        window.location.reload();
        console.log('bn')
      })
    console.log("Delete", person.identificationNumber);

  }

}
