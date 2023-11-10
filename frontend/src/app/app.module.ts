import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';

import { IonicModule, IonicRouteStrategy } from '@ionic/angular';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { BoxFeed } from './box-feed.component';
import {HttpClientModule} from "@angular/common/http";
import { CreateBoxComponent } from './createBox/createbox';
import {FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BoxInfoComponent } from './boxInfo/box-info.component';
import { EditBoxComponent } from './boxEdit/Edit-box.component';



@NgModule({
  declarations: [AppComponent, BoxFeed, CreateBoxComponent, BoxInfoComponent, EditBoxComponent],
  imports: [BrowserModule, IonicModule.forRoot({mode: 'ios'}) , AppRoutingModule, HttpClientModule, ReactiveFormsModule, FormsModule],
  providers: [{ provide: RouteReuseStrategy, useClass: IonicRouteStrategy }],
  bootstrap: [AppComponent],
})
export class AppModule {}
