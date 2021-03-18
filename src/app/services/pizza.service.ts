import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
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

}
