import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { BoxFeed } from './box-feed.component';
import { BoxInfoComponent } from './boxInfo/box-info.component';


const routes: Routes = [

  {
    path: 'boxes',
    component: BoxFeed
  },
  {
    path: 'box-info/:boxId',
    component: BoxInfoComponent
  },
  {
    path: '',
    redirectTo: '',
    pathMatch: 'full'
  },

];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
