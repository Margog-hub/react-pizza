export type SearchPizzaParams  = {
  order: string ; 
  sortBy: string;
  category: string ; 
  search: string ;
  currentPage: string ;
}

export type Pizza = {
  id: string;
  imageUrl: string;
  title: string;
  price: number;
  sizes: number[];
  types: number[];
  rating: number;
}

 export enum Status{
  LOADING = 'loading',
  SUCCESS = 'success',
  ERROR = 'error'
}
 export interface PizzaSliceState {
  items: Pizza[];
  status: Status;
 }