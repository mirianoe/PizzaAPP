import {Component} from '@angular/core';
import {PizzaService} from '../../services/pizza.service';
import {Pizza} from '../../models/pizza';
import {URLBASE} from '../../shared/constants';
import {AlertController, IonItemSliding, Platform, ViewWillEnter} from '@ionic/angular';


@Component({
  selector: 'app-pizza-list',
  templateUrl: './pizza-list.page.html',
  styleUrls: ['./pizza-list.page.scss'],
})
export class PizzaListPage implements ViewWillEnter {

  public urlBase = URLBASE;
  public pizzas: Array<Pizza>;
  public searchForm: any;
  public searchTerm = '';
  private searchText = '';
  public ios: boolean;

  constructor(
    private pizzaService: PizzaService,
    public platform: Platform,
    public alertController: AlertController
  ) {
    this.ios = platform.is('ios');
  }

  ionViewWillEnter(): void {
    this.pizzaService.getAllPizzas().subscribe(pizzas => {
      this.pizzas = pizzas;
    });
  }

  filterList() {

    if (this.searchTerm) {
      this.searchText = this.searchTerm.toLowerCase();
    } else {
      this.searchText = '';
    }
    this.pizzaService.findPizzaByName(this.searchText).subscribe(pizzas => {
      this.pizzas = pizzas;
    });

  }

  async deletePizza(id: number) {
    this.pizzaService.deletePizza(id).subscribe(() => {
      const index = this.pizzas.findIndex(x => x.id === id);
      this.pizzas.splice(index, 1);
    });
  }

  async toggleFavorite(event, id) {

    event.preventDefault();
    event.stopPropagation();
    event.stopImmediatePropagation();

    this.pizzaService.toggleFavoritePizza(id).subscribe(pizza => {
      const index = this.pizzas.findIndex(x => x.id === id);
      this.pizzas[index] = pizza;
    });

  }

  async presentAlertConfirm(id: number, slidingItem: IonItemSliding) {

    const alert = await this.alertController.create({
      cssClass: 'my-custom-class',
      header: 'Ma siamo proprio sicuri?',
      message: 'Confermando <strong> eliminerai </strong> questa pizza!!!',
      buttons: [
        {
          text: 'Annulla',
          role: 'cancel',
          cssClass: 'secondary',
          handler: (blah) => {
            slidingItem.close();
          }
        }, {
          text: 'Conferma',
          handler: () => {
            this.deletePizza(id);
          }
        }
      ]
    });
    await alert.present();
  }

}
