import {Injectable} from '@angular/core';
import {HttpClient, HttpParams} from '@angular/common/http';
import {Observable} from 'rxjs';
import {Pizza} from '../models/pizza';
import {APP_URL} from '../shared/constants';

@Injectable({
  providedIn: 'root'
})
export class PizzaService {

  constructor(
    private http: HttpClient
  ) {
  }

  getAllPizzas(): Observable<Array<Pizza>> {
    return this.http.get<Array<Pizza>>(`${APP_URL.PIZZAS}`);
  }

  getPizzaById(id: number): Observable<Pizza> {
    return this.http.get<Pizza>(`${APP_URL.PIZZAS}/${id}`);
  }

  findPizzaByName(pizzaName: string): Observable<Array<Pizza>> {
    return this.http.get<Array<Pizza>>(`${APP_URL.PIZZAS}/search`, {
      params: new HttpParams().set('pizzaName', pizzaName)
    });
  }

  getFavoritePizzas(): Observable<Array<Pizza>> {
    return this.http.get<Array<Pizza>>(`${APP_URL.PIZZAS}/favorites`);
  }

  addPizza(formData: FormData): Observable<Pizza> {
    return this.http.post<Pizza>(`${APP_URL.PIZZAS}`, formData );
  }

  updatePizza(pizza: Pizza): Observable<Pizza> {
    return this.http.put<Pizza>(`${APP_URL.PIZZAS}`, pizza);
  }

  toggleFavoritePizza(id: number): Observable<Pizza> {
    return this.http.put<Pizza>(`${APP_URL.PIZZAS}/toggle`, id);
  }

  deletePizza(id: number): Observable<any> {
    return this.http.delete(`${APP_URL.PIZZAS}/${id}`);
  }

}
