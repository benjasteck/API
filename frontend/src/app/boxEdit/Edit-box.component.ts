import { HttpClient, HttpErrorResponse } from "@angular/common/http";
import { Component } from "@angular/core";
import {FormBuilder, Validators } from "@angular/forms";
import { ActivatedRoute } from "@angular/router";
import { ModalController, ToastController } from "@ionic/angular";
import { Box } from "src/models";
import { State } from "../state";
import { environment } from "src/environments/environment";
import { firstValueFrom } from "rxjs";

@Component({
  template: `

    <ion-list>
      <ion-item>
        <ion-input  [formControl]="editBoxForm.controls.typeid" type="number" data-testid="weightInput"
                   label="Typeid of the box">
        </ion-input>
      </ion-item>
      <ion-item>
        <ion-input [formControl]="editBoxForm.controls.price" placeholder="{{state.currentBox.price}}" value="{{state.currentBox.price}}" type="number" data-testid="priceInput"
                   label="Price of the box">
        </ion-input>
      </ion-item>
      <ion-item>
        <ion-select [formControl]="editBoxForm.controls.material" data-testid="materialInput" label="Material"
                    placeholder="Pick material">
          <ion-select-option value="paper">cardboard</ion-select-option>
          <ion-select-option value="plastic">plastic</ion-select-option>
          <ion-select-option value="metal">metal</ion-select-option>
          <ion-select-option value="wood">wood</ion-select-option>
        </ion-select>
      </ion-item>
      <ion-item>
        <ion-button data-testid="submit" [disabled]="editBoxForm.invalid" (click)="submit()">Update Box
        </ion-button>
      </ion-item>
    </ion-list>

  `
})

export class EditBoxComponent {

  box: Box | undefined;

  editBoxForm = this.fb.group({
    typeid: [this.state.currentBox.typeid, [Validators.required]],
    material: [this.state.currentBox.material, [Validators.required, Validators.pattern('(?:paper|metal|plastic|wood)')]],
    price: [this.state.currentBox.price, [Validators.required]],


  })

  constructor(private activatedRoute: ActivatedRoute, public fb: FormBuilder, public modalController: ModalController, public http: HttpClient, public state: State, public toastController: ToastController) {
  }

  async submit() {
    try {
      const call = this.http.put<Box>(environment.baseUrl + '/api/boxes/' + this.state.currentBox.id, this.editBoxForm.value);
      const result = await firstValueFrom<Box>(call);
      let index = this.state.boxes.findIndex(b => b.id == this.state.currentBox.id)
      this.state.boxes[index] = result;
      this.state.currentBox = result;
      this.modalController.dismiss();
      const toast = await this.toastController.create({
        message: 'successfully updated',
        duration: 1000,
        color: 'success'
      })
      toast.present();

    } catch (error: any) {
      console.log(error);
      let errorMessage = 'Error';

      if (error instanceof HttpErrorResponse) {
        // The backend returned an unsuccessful response code.
        errorMessage = error.error?.message || 'Server error';
      } else if (error.error instanceof ErrorEvent) {
        // A client-side or network error occurred.
        errorMessage = error.error.message;
      }

      const toast = await this.toastController.create({
        color: 'danger',
        duration: 2000,
        message: errorMessage
      });

      toast.present();
    }

  }

}
