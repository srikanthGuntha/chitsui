import { Component, OnInit } from '@angular/core';
import { ColumnApi, GridApi, GridOptions } from 'ag-grid';
import { IsLoginService } from "../../_services/login.service";
import { LoaderService } from '../../_services/loader.service';
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

  constructor(private isLoginService: IsLoginService, private router: Router, private loaderService: LoaderService) {
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
              cellRenderer: this.deleteRecord
            }
        ];
        this.editType = "fullRow";
        this.rowData = [{"name": "Venkatesh", "email": "va@gmail.com", "phone": "7842803071"},
        {"name": "Srikanth", "email": "sg@gmail.com", "phone": "7842803072"},
        {"name": "Pavan", "email": "pb@gmail.com", "phone": "7842803073"},
        {"name": "Abhishek", "email": "at@gmail.com", "phone": "7842803074"},
        {"name": "Shiva", "email": "sa@gmail.com", "phone": "7842803075"}];
  }

  ngOnInit() {
  	this.loaderService.display(true);
  	this.isLoginService.isLoggedIn().then((result: any) => {
  		this.loaderService.display(false);
  		if(result.role !== 'agent') {
  			this.router.navigate(['/login']);
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
          console.log(selectedData);
      }
    }

    private refreshAggregates() {
      this.api.recomputeAggregates();
    }

    private deleteRecord(params) {
	  console.log(params);
	  var html = '<a title="Remove" href="javascript:;" class="align-center btn-link btn-sm" ng-click="removeRecord(' + params.rowIndex + ')">Delete</a>';
	  return html;
	}

}
