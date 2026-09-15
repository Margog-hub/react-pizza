import { SortPropertyEnum } from "../redux/filter/type";


  export type SortItem = {
    name: string;
    sortProperty: SortPropertyEnum;
   }

  export const lists: SortItem[] = [
    { name: 'популярністю(DESC)', sortProperty: SortPropertyEnum.RATING_DESC },
    { name: 'популярністю(ASC)', sortProperty: SortPropertyEnum.RATING_ASC },
    { name: 'ціною(DESC)', sortProperty: SortPropertyEnum.PRICE_DESC},
    { name: 'ціною(ASC)', sortProperty: SortPropertyEnum.PRICE_ASC },
    { name: 'алфавітом(DES)C', sortProperty: SortPropertyEnum.TITLE_DESC },
    { name: 'алфавітом(ASC)', sortProperty:  SortPropertyEnum.TITLE_ASC }
  ];