import { Component, Input, EventEmitter, Output, OnDestroy, OnInit } from '@angular/core';
import { ColumnApi, GridApi, GridOptions } from 'ag-grid';
import { IsLoginService } from "../../_services/login.service";
import { LoaderService } from '../../_services/loader.service';
import { AgentService } from '../../_services/agent.service';
import { ChitsService } from '../../_services/getchitsdata.service';
import { Router } from "@angular/router";

@Component({
  selector: 'app-management',
  templateUrl: './management.component.html',
  styleUrls: ['./management.component.scss']
})
export class AgentManagementComponent implements OnInit {
  
  public columnDefs;
  public rowData: any[] = [];
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
  constructor(private isLoginService: IsLoginService, private router: Router, private loaderService: LoaderService, private agentService: AgentService, private chitsdataservice: ChitsService) { 
  	this.columnDefs = [
            {
                width: 50,
                headerCheckboxSelection: false,
                headerCheckboxSelectionFilteredOnly: true,
                checkboxSelection: true
            },
            {
              headerName: "Name",
              field: "data.userid.firstname",
              width: 200,
              cellRenderer: this.renderNameField.bind(this),
              editable: false,
             },
            {
              width: 200,
              headerName: "Chit Id",
              field: "data.chit.chitid.chitid",
              cellRenderer: this.renderChitField.bind(this),
              editable: true,
            },
            {
              width: 200,
              headerName: "Chit Value",
              field: "data.chit.chitvalue",
              cellRenderer: this.renderValueField.bind(this),
              editable: false,
            },
            {
              headerName: "Status",
              field: "data.chitstatus",
              width: 200,
              cellRenderer: this.renderStatusField.bind(this),
              editable: false,
            },
            { headerName: "Action",
              width: 150,
              cellRenderer: this.deleteButton.bind(this)
            }
        ];
        this.editType = "fullRow";
  }

  ngOnInit() {
  	this.loaderService.display(true);
    this.isLoginService.isLoggedIn().then((result: any) => {
      this.loaderService.display(false);
      if(result.role !== 'agent') {
        this.router.navigate(['/login']);
      }
    });
    this.chitsdataservice.getPopulateChitData().subscribe(result => {
      if (result.success) {
        this.loaderService.display(false);
        this.rowData = result.data;
      } else {
        this.loaderService.display(false);
        this.rowData = [];
        var code = result.code;
   		console.log(code);
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

    private renderNameField(params) {
      var eDiv = document.createElement('div');
      eDiv.innerHTML = '<span>'+params.data.userid.firstname+'</span>';
      return eDiv;
    }
    
    private renderChitField(params) {
      var eDiv = document.createElement('div');
      eDiv.innerHTML = '<span>'+params.data.chit.chitid.chitid+'</span>';
      return eDiv;
    }

    private renderValueField(params) {
      var eDiv = document.createElement('div');
      eDiv.innerHTML = '<span>'+params.data.chit.chitvalue+'</span>';
      return eDiv;
    }

    private renderStatusField(params) {
      var eDiv = document.createElement('div');
      if (params.data.chitstatus) {
      	eDiv.innerHTML = '<span>Approved</span>';
      } else {
      	eDiv.innerHTML = '<span>Pending</span>';
      }
      return eDiv;
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
    this.agentService.deleteUserChits(data.userid)
    .subscribe(result => {
            if(result.success) {
              this.loaderService.display(false);
              for (let i=0; i < this.rowData.length; i++) {
              if (this.rowData[i].userid._id == data.userid._id) {
                this.rowData.splice(i,1);
              }
            }
            this.api.setRowData(this.rowData);
            } else {
              this.loaderService.display(false);
              let code = result.code;
              console.log(code);
            }
        });
  }

}