import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormsModule} from '@angular/forms';

import {IonicModule} from '@ionic/angular';

import {PizzaFavoritesPageRoutingModule} from './pizza-favorites-routing.module';

import {PizzaFavoritesPage} from './pizza-favorites.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    PizzaFavoritesPageRoutingModule
  ],
  declarations: [PizzaFavoritesPage]
})
export class PizzaFavoritesPageModule {}
