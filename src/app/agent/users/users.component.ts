import { Component, Input, EventEmitter, Output, OnDestroy, OnInit } from '@angular/core';
import { ColumnApi, GridApi, GridOptions } from 'ag-grid';
import { IsLoginService } from "../../_services/login.service";
import { LoaderService } from '../../_services/loader.service';
import { AuthenticationService } from '../../_services/authentication.service';
import { AgentService } from '../../_services/agent.service';

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
    public rowData: any[] = [];
    public editType;
    public gridOptions: GridOptions = {
      rowHeight: 42,
      headerHeight: 45,
      rowSelection: 'single',
      onSelectionChanged: this.setSelection.bind(this),
      animateRows: true,
      onRowEditingStopped: this.updateUser.bind(this),
      onCellEditingStopped: function(event) {
        //console.log("column",event);
      }
    };
    private api: GridApi;
    private columnApi: ColumnApi;
    manageToolsets: EventEmitter<Event> = new EventEmitter<Event>();

    registrationForm : FormGroup;
  public alertClass: string = "error";
  public showRegistraionMsg: string = "";
  public creatorRole:string;
  public creatorId:string;
  public showPopup:boolean = false;
  
  public user:any = {};

  constructor(private isLoginService: IsLoginService, private router: Router, private loaderService: LoaderService, private formBuilder: FormBuilder, private authenticationService: AuthenticationService, private agentService: AgentService) {
  	this.columnDefs = [
            {
                width: 50,
                headerCheckboxSelection: false,
                headerCheckboxSelectionFilteredOnly: true,
                checkboxSelection: true
            },
            {
              width: 150,
              headerName: "First Name",
              field: "firstname",
              editable: true,
            },
            {
              width: 150,
              headerName: "Last Name",
              field: "lastname",
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
              field: "mobile",
              width: 200,
              editable: true,
            },
            // {
            //   headerName: "Creator Role",
            //   field: "creator_role",
            //   width: 200,
            //   editable: false,
            // },
            { headerName: "Action",
              width: 150,
              cellRenderer: this.deleteButton.bind(this)
            }
        ];
        this.editType = "fullRow";
  }

  ngOnInit() {
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
    this.loaderService.display(true);
    this.isLoginService.isLoggedIn().then((result: any) => {
      this.loaderService.display(false);
      if(result.role !== 'agent') {
        this.router.navigate(['/login']);
      }
      this.creatorRole = result.creator_role;
      this.creatorId = result.creator_id;
      this.user.creator_role = result.creator_role;
      this.user.creator_id = result.creator_id;
    });

    this.agentService.getPopulateUsersData().subscribe(result => {
      this.loaderService.display(true);
      if (result.success) {
        this.rowData = result.data;
        this.loaderService.display(false);
      } else {
        this.rowData = [];
        this.loaderService.display(false);
        var code = result.code;
        console.log(MapErrorCodes[code] || "Something went wrong, please try again.");
      }
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
      }
    }

    private updateUser(selectedData) {
              let updateData = {
                "firstname": selectedData.data.firstname,
                "lastname": selectedData.data.lastname,
                "email": selectedData.data.email,
                "mobile": selectedData.data.mobile
              }
              this.loaderService.display(true);
              this.agentService.updateUser(updateData, selectedData.data._id)
              .subscribe(result => {
                if(result.success) {
                  this.loaderService.display(false);
                } else {
                  this.loaderService.display(false);
                  let code = result.code;
                  console.log(code);
                }
            });
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
      this.loaderService.display(true);
    this.agentService.deleteUser(data)
    .subscribe(result => {
            if(result.success) {
              this.loaderService.display(false);
              for (let i=0; i < this.rowData.length; i++) {
              if (this.rowData[i]._id == data._id) {
                this.rowData.splice(i,1);
              }
            }
            this.api.setRowData(this.rowData);
            } else {
              this.loaderService.display(false);
              let code = result.code;
              this.alertClass = "error";
              console.log(MapErrorCodes[code]);
            }
        });
  }

  createUser(e: Event) {
    this.showPopup = true;
    this.manageToolsets.emit(new Event("open"));
  }

  onToolsetsSelected(result : {
    action: string,
    initiator: Event
  }) {
    this.user = {};
    this.resetForm(this.registrationForm);
    this.showRegistraionMsg = "";
    this.showPopup = false;
    this.agentService.getPopulateUsersData().subscribe(result => {
      this.loaderService.display(true);
      if (result.success) {
        this.rowData = result.data;
        this.loaderService.display(false);
      } else {
        this.rowData = [];
        this.loaderService.display(false);
        var code = result.code;
        console.log(MapErrorCodes[code] || "Something went wrong, please try again.");
      }
    });
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
      this.loaderService.display(true);
      this.agentService.userRegister(this.user)
         .subscribe(result => {
            if(result.success) {
              this.loaderService.display(false);
              this.alertClass = "success";
              this.showRegistraionMsg = "User successfull added";
              this.user = {};
              this.resetForm(this.registrationForm);
            } else {
              this.loaderService.display(false);
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
