import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { response } from 'express';
import { RestApiServiceService } from '../Servicio/rest-api-service.service'; //servicio al api 
import { ICommonResponse } from '../Interfaces/icommon-response';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.css']
})
export class UserProfileComponent implements OnInit {
  public persona: FormGroup;
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

  ngOnInit(): void {
  }

  submit() {
    console.log(this.persona.value);
    this.apiService
      .Post("Person/Save", this.persona.value)
      .subscribe((response: ICommonResponse) => {
        this.persona.reset();
        if (response.Status == "Success") {
          console.log("ok")
        } else {
          console.log("Bad")
        }
      })
  }

}
