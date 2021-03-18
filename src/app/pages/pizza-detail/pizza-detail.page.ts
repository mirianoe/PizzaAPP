import {Component} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {PizzaService} from '../../services/pizza.service';
import {Pizza} from '../../models/pizza';
import {URLBASE} from '../../shared/constants';
import {ViewWillEnter} from '@ionic/angular';

@Component({
  selector: 'app-pizza-detail',
  templateUrl: './pizza-detail.page.html',
  styleUrls: ['./pizza-detail.page.scss'],
})
export class PizzaDetailPage implements ViewWillEnter {

  public urlBase = URLBASE;
  public pizza: Pizza;

  constructor(
    private route: ActivatedRoute,
    private pizzaService: PizzaService,
  ) {
  }

  ionViewWillEnter() {
    const pizzaId = this.route.snapshot.paramMap.get('pizzaId');
    this.pizzaService.getPizzaById(Number(pizzaId)).subscribe(pizza => {
      this.pizza = pizza;
    });
  }

}
