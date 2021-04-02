import {Topping} from './topping';

export interface Pizza {

  id?: number;
  name: string;
  photoName: string;
  favorite: boolean;
  toppings: Array<Topping>;

}
