import {Component} from '@angular/core';
import {PizzaService} from '../../services/pizza.service';
import {Pizza} from '../../models/pizza';
import {URLBASE} from '../../shared/constants';
import {ViewWillEnter} from '@ionic/angular';

@Component({
  selector: 'app-pizza-list',
  templateUrl: './pizza-list.page.html',
  styleUrls: ['./pizza-list.page.scss'],
})
export class PizzaListPage implements ViewWillEnter {

  public urlBase = URLBASE;
  public pizzas: Array<Pizza>;

  constructor(
    private pizzaService: PizzaService
  ) {
  }

  ionViewWillEnter(): void {
    this.pizzaService.getAllPizzas().subscribe(pizzas => {
      this.pizzas = pizzas;
    });
  }

}
