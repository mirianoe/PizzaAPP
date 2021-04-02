import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';

import {TabsPage} from './tabs.page';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'pizza-list',
    pathMatch: 'full'
  },
  {
    path: '',
    component: TabsPage,
    children: [
      {
        path: 'pizza-list',
        children: [
          {
            path: '',
            loadChildren: () => import('../pages/pizza-list/pizza-list.module').then(m => m.PizzaListPageModule)
          },
          {
            path: 'detail/:pizzaId',
            loadChildren: () => import('../pages/pizza-detail/pizza-detail.module').then(m => m.PizzaDetailPageModule)
          },
          {
            path: 'add',
            loadChildren: () => import('../pages/pizza-add/pizza-add.module').then(m => m.PizzaAddPageModule)
          },
        ]
      },
      {
        path: 'pizza-favorites',
        children: [
          {
            path: '',
            loadChildren: () => import('../pages/pizza-favorites/pizza-favorites.module').then(m => m.PizzaFavoritesPageModule)
          },
          {
            path: ':pizzaId',
            loadChildren: () => import('../pages/pizza-detail/pizza-detail.module').then(m => m.PizzaDetailPageModule)
          },
        ]
      },
    ]
  },
  {
    path: 'pizza-edit',
    loadChildren: () => import('../pages/pizza-edit/pizza-edit.module').then(m => m.PizzaEditPageModule)
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class TabsPageRoutingModule {
}
