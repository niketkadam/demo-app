import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import {NavComponent} from './nav/nav.component';
import { ManagementComponent } from './management/management.component';
import { AppService } from './app.services';
import { AppRoutingModule } from './app.routing.module';
import {FilterPipe}from './filter.pipe';
@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    NavComponent,
    ManagementComponent,
    FilterPipe
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    ReactiveFormsModule,
    AppRoutingModule,
    NgbModule.forRoot(),
  ],
  providers: [AppService],
  bootstrap: [AppComponent]
})
export class AppModule { }
