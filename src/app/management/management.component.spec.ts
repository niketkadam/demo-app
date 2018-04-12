import { async, inject, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';
import { ManagementComponent } from './management.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { Http, Headers, Response, RequestOptionsArgs, ResponseContentType, RequestOptions } from "@angular/http";
import { AppService } from '../app.services';
import {Observable, ReplaySubject} from 'rxjs';
import {FilterPipe}from '../filter.pipe';
// import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

class MockAuthService extends AppService {
    getContracts(): Observable<any> {
        return Observable.of({
          "dataModel": [
            {
                "company": "BBSMzzzzzzzzzz",
                "plant": 0,
                "vintage": "Not Started",
                "baseLotDesc": "Lot Description",
                "crushProgrameName": "Crush1",
                "ava":"jom",
                "variety":12,
                "comment":"good"
            }
          ]
        });
      }

      getTanks():Observable<any>{
          return Observable.of({
            "dataModel1":[ {
                "warehouse": "BBSM",
                "wipCount": 0,
                "Status": "Not Started",
                "startCountDate": "12-jan-2017 9:30AM",
                "toast": "Toast1"
            },
        ]
          })
      }
  }
  

describe('Welcome component tests', () => {
    let comp: ManagementComponent;
    let fixture: ComponentFixture<ManagementComponent>;
   
    beforeEach((() => {
        TestBed.configureTestingModule({
            declarations: [ManagementComponent,FilterPipe],
            imports: [FormsModule, ReactiveFormsModule,NgbModule.forRoot(),],
            providers: [
                { provide: AppService, useClass: MockAuthService },
                { provide: Http },
            ]
        })
            .compileComponents()
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(ManagementComponent);
        comp = fixture.componentInstance;
        fixture.detectChanges();
        

    });
    it('onGetcontractData functionality check', () => {
        let val = comp.getContract();
        var data=comp.contractData;
        var checkData=[ {
            "company": "BBSMzzzzzzzzzz",
            "plant": 0,
            "vintage": "Not Started",
            "baseLotDesc": "Lot Description",
            "crushProgrameName": "Crush1",
            "ava":"jom",
            "variety":12,
            "comment":"good"
        },
    ]
        expect(data).toEqual(checkData);
        
      });
      it('onGetcontractData functionality check', () => {
        let val = comp.getTank();
        var data=comp.tankData;
        var checkData=[ {
            "warehouse": "BBSM",
            "wipCount": 0,
            "Status": "Not Started",
            "startCountDate": "12-jan-2017 9:30AM",
            "toast": "Toast1"
        },
    ]
        expect(data).toEqual(checkData);
        
      });

      it('click on next ',() => {
          comp.goNext();
       expect(comp.modelFlag).toBe(true);
    });
});