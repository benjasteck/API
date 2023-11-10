import {Component, OnInit} from "@angular/core";
import {HttpClient, HttpErrorResponse} from "@angular/common/http";
import {Environment} from "@angular/cli/lib/config/workspace-schema";
import { environment } from "src/environments/environment";
import {firstValueFrom} from "rxjs";
import {Box, ResponseDto } from "src/models";
import { State } from "src/app/state";
import { ModalController, ToastController } from "@ionic/angular";
import {ActivatedRoute, Router } from "@angular/router";
import { CreateBoxComponent } from "./createBox/createbox";
import { FormControl, FormGroup } from "@angular/forms";
import {search} from "ionicons/icons";


@Component({
  template: `
    <ion-header  vertical="top">
      <ion-searchbar [(ngModel)]="searchTerm" (ionChange)="filterItems()" color="primary" placeholder="Search for box material(plastic, metal etc) " type="text" debounce="500" (ionChange)="getItems($event)"></ion-searchbar>
    </ion-header>


    <ion-list *ngIf="filteredBoxes.length > 0" vertical="top" >


      <ion-card [attr.data-testid]="'card_'+box.id" *ngFor="let box of filteredBoxes.slice(0, 50); let i = index">
        <ion-card-header>
          <ion-card-title>Box number {{box.id}}</ion-card-title>
        </ion-card-header>
        <ion-list>
          <ion-item>
            <ion-label>type: {{box.typeid}}</ion-label>
          </ion-item>
          <ion-item>
            <ion-label>Material: {{box.material}}</ion-label>
          </ion-item>
          <ion-item>
            <ion-label>Price: {{box.price}}</ion-label>
          </ion-item>
        </ion-list >

        <ion-button (click)="openBoxInfo(box.id)">More info</ion-button><ion-button (click)="deleteBox(box.id)" color="danger">Delete</ion-button>

      </ion-card>

    </ion-list >
    <ion-list *ngIf="filteredBoxes.length === 0">
      <ion-item>
        No boxes found.
      </ion-item>
    </ion-list>
    <ion-fab  vertical="top" style="padding: 20px 20px 20px 20px;">
      <ion-fab-button data-testid="createBox" (click)="openModal()">
        <ion-icon name="add"></ion-icon>
      </ion-fab-button>
    </ion-fab>


`,
  styleUrls: ['boxpage.scss'],
  selector: 'BoxFeed'

})
export class BoxFeed {
  box: Box | undefined;



  searchTerm: string = '';
  filteredBoxes: any[] = [];





  constructor(public modalController: ModalController,
              public toastController: ToastController,
              private router: Router,
              private activatedRoute: ActivatedRoute,
              public state: State,
              public http: HttpClient
  ) {
    this.getFeedData();

  }

  isItemAvailable = false;
  items: any[] = [];

  initializeItems(){
    this.items = ["card board","plastic", "metal", "wood"];
  }

  getItems(ev: any) {
    // Reset items back to all of the items
    this.initializeItems();

    // set val to the value of the searchbar
    const val = ev.target.value;

    // if the value is an empty string don't filter the items
    if (val && val.trim() !== '') {
      this.isItemAvailable = true;
      this.items = this.items.filter((item) => {
        return (item.toLowerCase().indexOf(val.toLowerCase()) > -1);
      })
    } else {
      this.isItemAvailable = false;
    }
  }
  filterItems() {
    this.filteredBoxes = this.state.boxes.filter((box) => {
      const searchString = this.searchTerm.toLowerCase();

      // @ts-ignore
      const itemMaterial = box.material.toLowerCase();
      return itemMaterial.includes(searchString);
    });
  }


  async getFeedData() {
    const call = this.http.get<Box[]>(environment.baseUrl + '/api/boxes');
    this.state.boxes = await firstValueFrom<Box[]>(call);
  }
  async openModal() {
    const modal = await this.modalController.create({
      component: CreateBoxComponent
    });
    modal.present();
  }


  async openBoxInfo(boxId: number | undefined) {
    if (boxId !== undefined) {
      this.router.navigate(['box-info', boxId]);
    }
  }

  async handleInput($event: any) {
    const query = $event.target.value;

    const call = this.http.get<Box[]>(environment.baseUrl + `/api/boxes?SearchTerm=${query}`);
    this.state.boxes = await firstValueFrom<Box[]>(call);
    console.log(this.state.boxes)
  }

  async deleteBox(Boxes: Box){
    const call = this.http.delete(environment.baseUrl+'/api/boxes/' + Boxes.id);
    const result = await firstValueFrom(call);

    this.state.boxes = this.state.boxes.filter(a => a.id != Boxes.id)
  }


  protected readonly search = search;
  searchterm = new  FormControl("");
}
