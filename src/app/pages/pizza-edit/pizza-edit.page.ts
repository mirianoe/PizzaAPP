import {Component, Input, OnInit} from '@angular/core';
import {FormGroup} from '@angular/forms';
import {Pizza} from '../../models/pizza';
import {PizzaService} from '../../services/pizza.service';
import {ToppingService} from '../../services/topping.service';
import {ModalController} from '@ionic/angular';
import {Topping} from '../../models/topping';
import {URLBASE} from '../../shared/constants';

@Component({
  selector: 'app-pizza-edit',
  templateUrl: './pizza-edit.page.html',
  styleUrls: ['./pizza-edit.page.scss'],
})
export class PizzaEditPage implements OnInit {

  @Input() id: number;

  public form: FormGroup;
  public pizza: Pizza;
  public name: string;
  public urlBase: string = URLBASE;

  public toppings: {
    id: number,
    name: string,
    isChecked?: boolean
  }[] = [];

  constructor(
    private pizzaService: PizzaService,
    private toppingService: ToppingService,
    public modalCtrl: ModalController,
  ) {
  }

  async ngOnInit() {
    this.pizzaService.getPizzaById(this.id).subscribe(pizza => {
      this.pizza = pizza;
      this.toppingService.getAllToppings().subscribe(toppings => {
        toppings.forEach(topping => {
          this.toppings.push({
            id: topping.id,
            name: topping.name,
            isChecked: !!this.pizza.toppings.find(x => x.id === topping.id),
          });
        });
      });
    });
  }

  async cancel() {
    await this.modalCtrl.dismiss();
  }

  async savePizza() {
    const toppings: Array<Topping> = [];
    this.toppings.forEach(topping => {
      if (topping.isChecked) {
        toppings.push({
          id: topping.id,
          name: topping.name
        });
      }
    });
    this.pizza.toppings = toppings;
    this.pizzaService.updatePizza(this.pizza).subscribe(pizza => {
        this.modalCtrl.dismiss({
          pizza
        });
      }
    );
  }

}
