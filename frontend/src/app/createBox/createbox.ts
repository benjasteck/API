import { HttpClient, HttpErrorResponse } from "@angular/common/http";
import { Component, EventEmitter, OnInit, Output } from "@angular/core";
import {FormBuilder, FormControl, FormGroup, Validators } from "@angular/forms";
import { ModalController, ToastController } from "@ionic/angular";
import { firstValueFrom } from "rxjs";
import { environment } from "src/environments/environment";
import {Box, ResponseDto } from "src/models";
import { State } from "../state";



@Component({
  template: `

    <ion-list>
      <ion-item>
        <ion-input [formControl]="createNewBoxForm.controls.typeid" type="number" data-testid="weightInput"  label="Type id of the box" min=1 max=9>
        </ion-input>
      </ion-item>
      <ion-item>
        <ion-select [formControl]="createNewBoxForm.controls.material" data-testid="materialInput" label="Material" placeholder="Pick material">
          <ion-select-option value="cardboard">cardboard</ion-select-option>
          <ion-select-option value="plastic">plastic</ion-select-option>
          <ion-select-option value="metal">metal</ion-select-option>
          <ion-select-option value="wood">wood</ion-select-option>
        </ion-select>
      </ion-item>
      <ion-item>
        <ion-input [formControl]="createNewBoxForm.controls.price" type="number" data-testid="priceInput"  label="Price of the box" min="100">
        </ion-input>
      </ion-item>

      <ion-item>
        <ion-button data-testid="submit" [disabled]="createNewBoxForm.invalid" (click)="submit()">Create New Box</ion-button>
      </ion-item>
    </ion-list>
  `
})

export class CreateBoxComponent {

  createNewBoxForm = this.fb.group({
    typeid: ['', Validators.maxLength(1) ],
    material: ['', Validators.pattern('(?:cardboard|metal|plastic|wood)')],
    price: ['', Validators.minLength(4)],
  })

  constructor(public fb: FormBuilder, public modalController: ModalController, public http: HttpClient, public state: State, public toastController: ToastController) {
  }

  async submit() {

    try {
      const call =     this.http.post<ResponseDto<Box>>(environment.baseUrl + '/api/boxes', this.createNewBoxForm.getRawValue())

      const response = await firstValueFrom(call);

      this.state.boxes.push(response.responseData!);


      const toast = await this.toastController.create({
        message: 'Box was created!',
        duration: 1233,
        color: "success"
      })
      toast.present();
      this.modalController.dismiss();
    } catch (e) {
      if(e instanceof HttpErrorResponse) {
        const toast = await this.toastController.create({
          message: e.error.messageToClient,
          color: "danger"
        });
        toast.present();
      }
    }


  }
}

