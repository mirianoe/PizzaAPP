import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';

import {PizzaAddPage} from './pizza-add.page';

const routes: Routes = [
  {
    path: '',
    component: PizzaAddPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PizzaAddPageRoutingModule {}
