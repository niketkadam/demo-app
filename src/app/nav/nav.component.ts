import { Component, OnInit, ElementRef, ViewChild, Input, Output, EventEmitter } from '@angular/core';
import { Validators, FormBuilder, FormGroup } from '@angular/forms';
import { NgForm } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.scss']
})
export class NavComponent implements OnInit {

  menuList: Array<string> = ['LOGIN'];
  selectNav: string = '';
  searchFlag: boolean = false;
  menuFlag: boolean = false;
  subMenuFlag: boolean = true;



  constructor(private router: Router, private route: ActivatedRoute) { }

  ngOnInit() {
    if (window.location.href.includes('login')) {
      this.selectNav = 'LOGIN';
    }
  }

  gotoLocation(list, flag?) {
    var url = this.route.snapshot['_routerState'].url;
    if (list == 'LOGIN') {
      this.router.navigate(["login"]);
      this.menuFlag = false;

    }
  }
  getLoginStatus() {
    if (window.location.href.includes('login')) {
      return false;
    }
    else {
      return true;
    }
  }
}
