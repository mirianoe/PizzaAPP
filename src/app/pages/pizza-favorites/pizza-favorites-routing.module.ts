import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';

import {PizzaFavoritesPage} from './pizza-favorites.page';

const routes: Routes = [
  {
    path: '',
    component: PizzaFavoritesPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PizzaFavoritesPageRoutingModule {}
