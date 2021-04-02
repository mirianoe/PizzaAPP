import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {Pizza} from '../../models/pizza';
import {PizzaService} from '../../services/pizza.service';
import {ToppingService} from '../../services/topping.service';
import {NavController, ViewDidLeave} from '@ionic/angular';
import {PhotoService} from '../../services/photo.service';
import {Topping} from '../../models/topping';

@Component({
  selector: 'app-pizza-add',
  templateUrl: './pizza-add.page.html',
  styleUrls: ['./pizza-add.page.scss'],
})
export class PizzaAddPage implements OnInit, ViewDidLeave {

  public form: FormGroup;
  public pizza: Pizza;
  public name: string;

  public toppings: {
    id: number,
    name: string,
    isChecked: boolean
  }[] = [];


  constructor(
    private pizzaService: PizzaService,
    private toppingService: ToppingService,
    public photoService: PhotoService,
    public formBuilder: FormBuilder,
    private navCtrl: NavController,
  ) {
    this.form = this.formBuilder.group({
      name: ['', [Validators.required, Validators.maxLength(255)]],
      toppings: [false],
    });
  }

  async ngOnInit() {
    this.toppingService.getAllToppings().subscribe(toppings => {
      toppings.forEach(topping => {
        this.toppings.push({
          id: topping.id,
          name: topping.name,
          isChecked: false
        });
      });
    });
  }

  async cancel() {
    await this.goBack();
  }

  async savePizza() {
    const name = this.name.trim();
    const photoName = name.split(' ').join('_') + '.jpg';
    const favorite = false;
    const toppings: Array<Topping> = [];
    this.toppings.forEach(topping => {
      if (topping.isChecked) {
        toppings.push({
          id: topping.id,
          name: topping.name
        });
      }
    });
    const pizza: Pizza = {
      name,
      photoName,
      favorite,
      toppings
    };
    const blob = await fetch(this.photoService.getWebPath()).then(r => r.blob());
    const formData = new FormData();
    formData.append('photo', blob, photoName);
    formData.append('pizza', JSON.stringify(pizza));
    this.pizzaService.addPizza(formData).subscribe(() => {
        this.goBack();
      }
    );
  }

  async takePizzaPhoto() {
    await this.photoService.takePhoto();
  }

  async goBack() {
    await this.navCtrl.navigateBack('/tabs/pizza-list');
  }

  ionViewDidLeave() {
    this.photoService.clearWebPath();
  }

}
