import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {APP_URL} from '../shared/constants';
import {Topping} from '../models/topping';

@Injectable({
  providedIn: 'root'
})
export class ToppingService {

  constructor(
    private http: HttpClient
  ) {
  }

  getAllToppings(): Observable<Array<Topping>> {
    return this.http.get<Array<Topping>>(`${APP_URL.TOPPINGS}`);
  }

}
