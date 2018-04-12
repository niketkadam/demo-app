import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-root',
  template:
  `<app-nav></app-nav>
   <div id= "main-content" style="height:100%">
      <router-outlet></router-outlet>
   </div>` ,
})
export class AppComponent implements OnInit {  
  ngOnInit() {
  }
}
