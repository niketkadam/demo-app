import { Component, OnInit, ViewEncapsulation, ViewChild } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/of';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/debounceTime';
import 'rxjs/add/operator/distinctUntilChanged';
import 'rxjs/add/operator/do';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/switchMap';
import 'rxjs/add/operator/merge';
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import { Http, Headers, Response, RequestOptionsArgs, ResponseContentType, RequestOptions } from "@angular/http"
import { BrowserXhr } from '@angular/http';
import { error } from 'util';
import { PlanningHarvestHeader, PlanningTankHarvestHeader, PlanningOakHarvestHeader, harvestTypes } from '../common/default.value';
import { AppService } from '../app.services';

@Component({
  selector: 'app-inventory-counts',
  templateUrl: './management.component.html',
  styleUrls: ['./management.component.scss'],
  encapsulation: ViewEncapsulation.None,
  host: {
    '(document:click)': 'onClick($event)',
  },
})

export class ManagementComponent implements OnInit {
  buttons: Array<number> = [1, 2, 3];
  types: Array<string> = harvestTypes
  type: string = this.types[0];
  btnVal: number = 1;
  prevBtn: string = '< PREV';
  nextBtn: string = 'NEXT >';
  dummyBarrel: Array<string> = ['', '', '', '', '', '', '', ''];
  headerControl: Array<string> = PlanningHarvestHeader;
  headerControl1: Array<string> = PlanningOakHarvestHeader;
  headerControl2: Array<string> = PlanningTankHarvestHeader;
  contractData = [];
  tankData: Array<Object> = [];
  editFlag: boolean = false;
  tempTableData = [];
  tableFlag: boolean = false;
  @ViewChild('content') content;
  tempbtn: number = 1;
  cancelFlag: boolean = false;
  modelFlag: boolean = false;
  searchText='';

  constructor(private appSvc: AppService, private modalService: NgbModal) { }


  ngOnInit() {
    this.getContract();
    this.getTank();
  }
  onSelect(item) {
    this.type = item;
    this.btnVal = this.types.indexOf(item) + 1;
  }

  onChange() {
    this.tableFlag = true;
  }
  onEdit() {
    this.editFlag = true;
    if (this.btnVal == 2 || this.btnVal == 3) {
      this.tempTableData = this.tankData.map(x => Object.assign({}, x));
    }
    if (this.btnVal == 1) {
      this.tempTableData = this.contractData.map(x => Object.assign({}, x));
    }
  }

  onCancel(content) {
    if (this.tableFlag) {
      this.modalService.open(content)
    }
    else {
      this.editFlag = false;
    }
  }
  onSave(content) {
    this.modalService.open(content)
  }
  onYes() {
    this.editFlag = false;
    this.tableFlag = false;
    if (this.modelFlag) {
      this.btnVal = this.tempbtn;
      this.type = this.types[this.tempbtn - 1];
      this.modelFlag = false;
    }
  }


  onClose() {
    this.editFlag = false;
    this.tableFlag = false;
    if (this.btnVal == 2 || this.btnVal == 3) {
      this.tankData = this.tempTableData.map(x => Object.assign({}, x));
    }
    else {
      this.contractData = this.tempTableData.map(x => Object.assign({}, x));
    }
    if (this.modelFlag) {
      this.btnVal = this.tempbtn;
      this.type = this.types[this.tempbtn - 1];

      this.modelFlag = false;
    }
  }

  selectBtn(item: number) {
    this.modelFlag = true;
    if (this.tableFlag) {
      this.modalService.open(this.content);
      this.tempbtn = item;
    } else {
      this.tempbtn = item;
      this.btnVal = item;
      this.type = this.types[item - 1];
    }
  }

  goPrev() {
    this.modelFlag = true;
    if (this.tableFlag) {
      this.modalService.open(this.content);
      this.tempbtn--;
    } else {
      this.tempbtn--;
      this.btnVal = this.tempbtn;
      this.type = this.types[this.btnVal - 1];
    }
  }

  goNext() {
    console.log("it's coming")
    this.modelFlag = true;
    if (this.tableFlag) {
      this.modalService.open(this.content);
      this.tempbtn++;
    } else {
      this.tempbtn++;
      this.btnVal = this.tempbtn;
      this.type = this.types[this.btnVal - 1];
    }
  }
  onClick(event) {
    var classNames = event.target.className;
    if (!classNames.includes('dropbtnss')) {
      var dropdowns = document.getElementsByClassName("dropdown-content");
      var i;
      for (i = 0; i < dropdowns.length; i++) {
        var openDropdown = dropdowns[i];
        if (openDropdown.classList.contains('show')) {
          openDropdown.classList.remove('show');
        }
      }
    }
  }
  getContract() {
    console.log("coming");
    this.contractData = [];
    this.appSvc.getContracts().subscribe(data => this.onGetBayResult(data), err => this.handleError(err));
  }

  onGetBayResult(data) {
    var data = data.dataModel;
    this.contractData = [];
    for (var i = 0; i < data.length; i++) {
      console.log(data[i])
      this.contractData.push(data[i]);
    }
  }

  getTank() {
    this.tankData = [];
    this.appSvc.getTanks().subscribe(data => this.onGetTankResult(data), err => this.handleError(err));
  }

  onGetTankResult(data) {
    var data = data.dataModel1;
    this.tankData = [];
    for (var i = 0; i < data.length; i++) {
      this.tankData.push(data[i]);
    }
  }
  handleError(err) {
    console.log(err);
  }
}

