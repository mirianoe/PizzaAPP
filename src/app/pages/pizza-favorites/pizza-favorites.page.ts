import {Component} from '@angular/core';
import {URLBASE} from '../../shared/constants';
import {Pizza} from '../../models/pizza';
import {PizzaService} from '../../services/pizza.service';
import {ViewWillEnter} from '@ionic/angular';

@Component({
  selector: 'app-pizza-favorites',
  templateUrl: './pizza-favorites.page.html',
  styleUrls: ['./pizza-favorites.page.scss'],
})
export class PizzaFavoritesPage implements ViewWillEnter {

  public urlBase = URLBASE;
  public pizzas: Array<Pizza>;
  public filtered: Array<Pizza>;
  public searchForm: any;
  public searchTerm = '';
  private searchText = '';

  constructor(
    private pizzaService: PizzaService
  ) {
  }

  ionViewWillEnter(): void {
    this.pizzaService.getFavoritePizzas().subscribe(pizzas => {
      this.pizzas = pizzas;
      this.filtered = pizzas;
    });
  }

  filterList() {

    if (this.searchTerm) {
      this.searchText = this.searchTerm.toLowerCase();
    } else {
      this.searchText = '';
    }

    this.pizzas = this.filtered.filter(pizza => {
      if (pizza.name
        .toLowerCase()
        .indexOf(this.searchText) > -1
      ) {
        return pizza;
      }
    });

  }

  async toggleFavorite(event, id) {

    event.preventDefault();
    event.stopPropagation();
    event.stopImmediatePropagation();

    this.pizzaService.toggleFavoritePizza(id).subscribe(pizza => {
      const index = this.pizzas.findIndex(x => x.id === id);
      this.pizzas.splice(index, 1);
    });

  }

}
