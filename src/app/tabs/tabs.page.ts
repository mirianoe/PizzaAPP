import {Component} from '@angular/core';
import {IonTabBar, NavController} from '@ionic/angular';

@Component({
  selector: 'app-tabs',
  templateUrl: './tabs.page.html',
  styleUrls: ['./tabs.page.scss'],
})
export class TabsPage {

  constructor(
    private navCtrl: NavController,
  ) {
  }

  async goToTab(tab: IonTabBar) {
    await this.navCtrl.navigateRoot('/tabs/' + tab.selectedTab);
  }
}
