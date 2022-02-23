import { Injectable } from '@angular/core';
import { Observable} from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Pullcard } from '../components/module/pullcard';

@Injectable({
  providedIn: 'root'
})
export class CardsService {

  constructor(private http: HttpClient) { }
  private cardsUrl = 'https://api.pokemontcg.io/v2/cards/';

  getCards(page: number): Observable<Pullcard> {
    return this.http.get<Pullcard>(`${this.cardsUrl}?page=${page}`);
  }

  getCardDetail(idCard: string): Observable<Pullcard> {
    return this.http.get<Pullcard>(`${this.cardsUrl}/${idCard}`);
  }
  getSimilarCards(types): Observable<any> {
    return this.http.get<Pullcard>(`${this.cardsUrl}?q=types:${types}`);
  }
}
