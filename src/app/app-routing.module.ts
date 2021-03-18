import {NgModule} from '@angular/core';
import {PreloadAllModules, RouterModule, Routes} from '@angular/router';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'pizza-list',
    pathMatch: 'full'
  },
  {
    path: 'pizza-list',
    loadChildren: () => import('./pages/pizza-list/pizza-list.module').then(m => m.PizzaListPageModule)
  },
  {
    path: 'pizza-detail/:pizzaId',
    loadChildren: () => import('./pages/pizza-detail/pizza-detail.module').then(m => m.PizzaDetailPageModule)
  }
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
