import {Component} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {PizzaService} from '../../services/pizza.service';
import {Pizza} from '../../models/pizza';
import {URLBASE} from '../../shared/constants';
import {AlertController, IonRouterOutlet, ModalController, NavController, ViewWillEnter} from '@ionic/angular';
import {PizzaEditPage} from '../pizza-edit/pizza-edit.page';

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
    public alertController: AlertController,
    private navCtrl: NavController,
    public modalCtrl: ModalController,
    public routerOutlet: IonRouterOutlet,
  ) {
  }

  ionViewWillEnter() {
    const pizzaId = this.route.snapshot.paramMap.get('pizzaId');
    this.pizzaService.getPizzaById(Number(pizzaId)).subscribe(pizza => {
      this.pizza = pizza;
    });
  }

  async deletePizza(id: number) {
    this.pizzaService.deletePizza(id).subscribe();
  }

  async toggleFavorite(event, id) {

    event.preventDefault();
    event.stopPropagation();
    event.stopImmediatePropagation();

    this.pizzaService.toggleFavoritePizza(id).subscribe(pizza => {
      this.pizza = pizza;
    });

  }

  async presentAlertConfirm(id: number) {
    console.log('presentAlertConfirm -> ', id);
    const alert = await this.alertController.create({
      cssClass: 'my-custom-class',
      header: 'Ma siamo proprio sicuri?',
      message: 'Confermando <strong> eliminerai </strong> questa pizza!!!',
      buttons: [
        {
          text: 'Annulla',
          role: 'cancel',
          cssClass: 'secondary',
          handler: () => {
          }
        }, {
          text: 'Conferma',
          handler: () => {
            this.deletePizza(id);
            this.goBack();
          }
        }
      ]
    });
    await alert.present();
  }

  async presentEditPizza(id: number) {
    const modal = await this.modalCtrl.create({
      component: PizzaEditPage,
      swipeToClose: true,
      presentingElement: this.routerOutlet.nativeEl,
      componentProps: {
        id
      }
    });
    modal.onDidDismiss()
      .then((data) => {
        if (data.data) {
          this.pizza = data.data.pizza;
        }
      });
    await modal.present();
  }

  async goBack() {
    await this.navCtrl.back();
  }

}
