import {Topping} from './topping';

export interface Pizza {

  id: number;
  name: string;
  photoName: string;
  toppings: Array<Topping>;

}
