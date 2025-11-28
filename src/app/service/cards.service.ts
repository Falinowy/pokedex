import { Injectable } from '@angular/core';
import { EMPTY, expand, map, Observable, reduce} from 'rxjs';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Pullcard } from '../components/module/pullcard';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class CardsService {

  constructor(private http: HttpClient) { }
  private cardsUrl = 'https://api.pokemontcg.io/v2/cards/';

  getCards(page: number): Observable<Pullcard> {
    const header = { 'X-Api-Key': environment.apiKey };

    return this.http.get<Pullcard>(`${this.cardsUrl}?pageSize=10` , { headers: header });
  }

  getCardDetail(idCard: string): Observable<Pullcard> {
    return this.http.get<Pullcard>(`${this.cardsUrl}/${idCard}`);
  }
  getSimilarCards(types): Observable<any> {
    return this.http.get<Pullcard>(`${this.cardsUrl}?q=types:${types}`);
  }


  public getCardsPage(page = 1, pageSize = 250): Observable<Pullcard> {
    const params = new HttpParams()
      .set('page', String(page))
      .set('pageSize', String(pageSize));
    return this.http.get<Pullcard>(`${this.cardsUrl}`, { params });
  }

  public getAllCards(): Observable<Pullcard[]> {
    const pageSize = 250;
    return this.getCardsPage(1, pageSize).pipe(
      expand(res => (res.page * res.pageSize < res.count ? this.getCardsPage(res.page + 1, pageSize) : EMPTY)),
      map(res => res.data),
      reduce((all, pageData) => all.concat(pageData), [])
    );
  }
}
