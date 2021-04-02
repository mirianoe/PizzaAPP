import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';

import {PizzaEditPage} from './pizza-edit.page';

const routes: Routes = [
  {
    path: '',
    component: PizzaEditPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PizzaEditPageRoutingModule {}
