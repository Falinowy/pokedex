import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { CardResume } from '@tcgdex/sdk';

@Injectable({
  providedIn: 'root',
})
export class CardsTcgdexService {
  constructor(private http: HttpClient) {}
  private cardsTcgdexUrl = 'https://api.tcgdex.net/v2/en/cards';

  public getAllCardsFromTcgdex(): Observable<CardResume> {
    return this.http.get<CardResume>(`${this.cardsTcgdexUrl}`);
  }
}
