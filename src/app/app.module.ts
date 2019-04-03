import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import { MainComponent } from './main/main.component';
import { ModalModule } from 'ngx-bootstrap/modal';
import { AlertModule } from 'ngx-bootstrap/alert';

import { UsersService } from './users.service';

import { HttpClientModule } from '@angular/common/http';
import { HttpClientInMemoryWebApiModule } from 'angular-in-memory-web-api';

import { InMemoryDataService } from './api/in-memory-data.service';
import { InfoComponent } from './info/info.component';

import { RouterModule, Routes } from '@angular/router';


const appRoutes: Routes = [
  {path: '', component: MainComponent},
  {path: 'info', component: InfoComponent}
]


@NgModule({
  declarations: [
    AppComponent,
    MainComponent,
    InfoComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    NgbModule.forRoot(),
    ModalModule.forRoot(),
    AlertModule.forRoot(),
    RouterModule.forRoot(appRoutes),
    HttpClientModule,

        //remove this when we will have real API
        HttpClientInMemoryWebApiModule.forRoot(
          InMemoryDataService, {dataEncapsulation: false}
        )
  ],
  providers: [UsersService],
  bootstrap: [AppComponent]
})
export class AppModule { }
