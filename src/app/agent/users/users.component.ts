import { Component, Input, EventEmitter, Output, OnDestroy, OnInit, } from '@angular/core';
import { ColumnApi, GridApi, GridOptions } from 'ag-grid';
import { IsLoginService } from "../../_services/login.service";
import { LoaderService } from '../../_services/loader.service';
import { AuthenticationService } from '../../_services/authentication.service';

import { FormBuilder, FormGroup, FormsModule, FormControl, Validators , ReactiveFormsModule} from '@angular/forms';
import { NgModule } from '@angular/core';

import { MapErrorCodes } from '../../config/errorcodes';
import { Router } from "@angular/router";

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss']
})
export class AgentUsersComponent implements OnInit {

	public columnDefs;
    public rowData;
    public editType;
    public gridOptions: GridOptions = {
      rowHeight: 42,
      headerHeight: 45,
      rowSelection: 'single',
      onSelectionChanged: this.setSelection.bind(this),
      animateRows: true
    };
    private api: GridApi;
    private columnApi: ColumnApi;
    manageToolsets: EventEmitter<Event> = new EventEmitter<Event>();

    registrationForm : FormGroup;
  public alertClass: string = "error";
  public showRegistraionMsg: string = "";
  
  public user:any = {};

  constructor(private isLoginService: IsLoginService, private router: Router, private loaderService: LoaderService, private formBuilder: FormBuilder, private authenticationService: AuthenticationService) {
  	this.columnDefs = [
            {
                width: 50,
                headerCheckboxSelection: true,
                headerCheckboxSelectionFilteredOnly: true,
                checkboxSelection: true
            },
            {
              width: 200,
              headerName: "Name",
              field: "name",
              editable: true,
            },
            {
              headerName: "Email",
              field: "email",
              width: 200,
              editable: true,
             },
            {
              headerName: "Phone",
              field: "phone",
              width: 200,
              editable: true,
            },
            { headerName: "Action",
              width: 150,
              cellRenderer: this.deleteButton.bind(this)
            }
        ];
        this.editType = "fullRow";
        this.rowData = [{"id": 1, "name": "Venkatesh", "email": "va@gmail.com", "phone": "7842803071"},
        {"id": 2, "name": "Srikanth", "email": "sg@gmail.com", "phone": "7842803072"},
        {"id": 3, "name": "Pavan", "email": "pb@gmail.com", "phone": "7842803073"},
        {"id": 4, "name": "Abhishek", "email": "at@gmail.com", "phone": "7842803074"},
        {"id": 5, "name": "Shiva", "email": "sa@gmail.com", "phone": "7842803075"}];
  }

  ngOnInit() {
  	this.loaderService.display(true);
  	this.isLoginService.isLoggedIn().then((result: any) => {
  		this.loaderService.display(false);
  		if(result.role !== 'agent') {
  			this.router.navigate(['/login']);
  		}
  	});
    this.registrationForm = this.formBuilder.group({
      firstName: [null, Validators.required],
      lastName: [null, Validators.required],
      email: [null, [Validators.required]],
      mobileNumber: [null, Validators.required],
      password: [null, Validators.required],
      creatorRole: [null, Validators.required],
      creatorId: [null, Validators.required],
      dob: [null, Validators.required],
      address: [null, Validators.required],
      address2: [null],
      city: [null, Validators.required],
      state: [null, Validators.required],
      pincode: [null, Validators.required],
      IdType: [null, Validators.required],
      idNumber: [null, Validators.required]
    });
  }

    public onReady(params) {
      this.api = params.api;
      this.columnApi = params.columnApi;
    }

    private resizeGrid() {
      if (this.api) {
        this.api.sizeColumnsToFit();
      }
    }

    private setSelection(): void {
      if (this.api) {
          let selectedData = this.api.getSelectedRows();
          console.log(selectedData);
      }
    }

    private refreshAggregates() {
      this.api.recomputeAggregates();
    }

    private deleteButton(params) {
      var eDiv = document.createElement('div');
      eDiv.innerHTML = '<span><i class="fa fa-trash-o del"></i></span>';
      var eButton = eDiv.querySelectorAll('.del')[0];
      let self = this;
      eButton.addEventListener('click', function() {
        self.delete(params.data);
      });
      return eDiv;
    }

    public delete(data) {
    for (let i=0; i < this.rowData.length; i++) {
      if (this.rowData[i].id == data.id) {
        this.rowData.splice(i,1);
      }
    }
    this.api.setRowData(this.rowData);
  }

  createUser(e: Event) {
    this.manageToolsets.emit(new Event("open"));
  }

  onToolsetsSelected(result : {
    action: string,
    initiator: Event
  }) {
    this.user = {};
    this.resetForm(this.registrationForm);
  }

  isFieldValid(field: string) {
    return !this.registrationForm.get(field).valid && this.registrationForm.get(field).touched;
  }

  displayFieldCss(field: string) {
    return {
      'has-error': this.isFieldValid(field),
      'has-feedback': this.isFieldValid(field)
    };
  }

  ifEmailExists(data: string) {
    this.authenticationService.isEmailExisting(data)
    .subscribe(result => {
            if(result.code == "200201") {
              this.alertClass = "error";
              this.showRegistraionMsg = "Email already exists. Please login now.";
            }
        });
  }

  ifMobileExists(data: string) {
    this.authenticationService.isMobileExisting(data)
    .subscribe(result => {
            if(result.code == "200201") {
              this.alertClass = "error";
              this.showRegistraionMsg = "Mobile number already exists. Please login now.";
            }
        });
  }

  submitForm() {
    if (this.registrationForm.valid) {
      this.authenticationService.userRegister(this.user)
         .subscribe(result => {
            if(result.success) {
              this.alertClass = "success";
              this.showRegistraionMsg = "User successfull added";
              this.user = {};
              this.resetForm(this.registrationForm);
            } else {
              let code = result.code;
              this.alertClass = "error";
              this.showRegistraionMsg = MapErrorCodes[code];
            }
        });
    } else {
      this.validateAllFormFields(this.registrationForm);
    }
  }

  validateAllFormFields(formGroup: FormGroup) {
    Object.keys(formGroup.controls).forEach(field => {
      const control = formGroup.get(field);
      if (control instanceof FormControl) {
        control.markAsTouched({ onlySelf: true });
      } else if (control instanceof FormGroup) {
        this.validateAllFormFields(control);
      }
    });
  }

  resetForm(formGroup: FormGroup) {
    let control = null;
    formGroup.reset();
    formGroup.markAsUntouched();
      Object.keys(formGroup.controls).forEach((name) => {
        if (control instanceof FormControl) {
          control = formGroup.controls[name];
          control.setErrors(null);
      }
    });
  }

}
