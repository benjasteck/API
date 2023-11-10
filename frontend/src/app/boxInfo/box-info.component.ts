import { HttpClient } from "@angular/common/http";
import { Component, OnInit } from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import {ModalController, ToastController } from "@ionic/angular";
import { Box } from "src/models";
import { State } from "../state";
import { environment } from "src/environments/environment";
import { firstValueFrom } from "rxjs";
import { EditBoxComponent } from "../boxEdit/Edit-box.component";

@Component({
  selector: 'app-box-info',
  template: `
    

    <ion-content fullscreen="true">
      <ion-card *ngIf="box">
        <ion-card-header>
          <ion-card-title>{{ box.typeid ? box.typeid + ' ' : '' }}
            {{ box.material ? box.material + ' ' : '' }}
            Box</ion-card-title>
        </ion-card-header>
        <ion-button (click)="openEditModal()">Edit</ion-button>
        <ion-list>
          <ion-item>
            <ion-label>Size: {{ box.typeid }}</ion-label>
          </ion-item>
          <ion-item>
            <ion-label>Material: {{ box.material }}</ion-label>
          </ion-item>
          <ion-item>
            <ion-label>Price: {{ box.price }}</ion-label>
          </ion-item>
        </ion-list>
      </ion-card>
    </ion-content>

  `,

})
export class BoxInfoComponent implements OnInit {

  box: Box | undefined;

  constructor(public httpClient: HttpClient, private activatedRoute: ActivatedRoute, private http: HttpClient, public modalController: ModalController,
              public toastController: ToastController, public state: State) {
    this.setId();
  }

  ngOnInit() {
    this.loadBoxInfo();
  }

  private async loadBoxInfo() {
    this.activatedRoute.params.subscribe(async (params) => {
      const boxId = params['boxId'];
      if (boxId) {
        const call = this.http.get<Box>(environment.baseUrl + '/api/boxes/' + boxId);
        this.box = await firstValueFrom<Box>(call);
        console.log(this.box)
      } else {

      }
    });
  }
  async setId() {
    try{
      const id = (await firstValueFrom(this.activatedRoute.paramMap)).get('boxId');
      this.state.currentBox = (await firstValueFrom(this.httpClient.get<any>(environment.baseUrl + '/api/boxes/' + id)));
    } catch (e) {
      console.log(e);
      console.log(this.state.currentBox.id);
    }

  }

  async openEditModal() {
    const modal = await this.modalController.create({
      component: EditBoxComponent,
    });
    modal.present();
  }
}
