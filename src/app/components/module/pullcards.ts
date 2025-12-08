import { Card } from './card';

export interface Pullcards {
  count: number;
  data: Card[];
  page: number;
  pageSize: number;
  totalCount: number;
}
