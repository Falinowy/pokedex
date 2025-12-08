import { Injectable, inject } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Pullcards } from '../../components/module/pullcards';
import { environment } from 'src/environments/environment';
import { Pullcard } from 'src/app/components/module/pullcard';

@Injectable({
  providedIn: 'root',
})
export class CardsPokemontcgService {
  private http = inject(HttpClient);

  private cardsUrl = 'https://api.pokemontcg.io/v2/cards';

  public getAllCardsFromPokemontcg(): Observable<Pullcards> {
    const header = { 'X-Api-Key': environment.apiKey };
    return this.http.get<Pullcards>(`${this.cardsUrl}`, { headers: header });
  }

  public getCardDetail(idCard: string): Observable<Pullcard> {
    return this.http.get<Pullcard>(`${this.cardsUrl}/${idCard}`);
  }
  public getSimilarCards(types): Observable<any> {
    return this.http.get<Pullcards>(`${this.cardsUrl}?q=types:${types}`);
  }

  public getCardsPage(page = 1, pageSize = 250): Observable<Pullcards> {
    const params = new HttpParams()
      .set('page', String(page))
      .set('pageSize', String(pageSize));
    return this.http.get<Pullcards>(`${this.cardsUrl}`, { params });
  }
}
