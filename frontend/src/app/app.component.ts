import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  template: `
<ion-app>
  
  <router-outlet></router-outlet>
</ion-app>`,
  styleUrls: ['app.component.scss'],
})
export class AppComponent {
  constructor() {}
}
