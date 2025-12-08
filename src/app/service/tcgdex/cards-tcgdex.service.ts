import { Injectable, inject } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { CardResume } from '@tcgdex/sdk';

@Injectable({
  providedIn: 'root',
})
export class CardsTcgdexService {
  private http = inject(HttpClient);

  private cardsTcgdexUrl = 'https://api.tcgdex.net/v2/en/cards';

  public getAllCardsFromTcgdex(): Observable<CardResume> {
    return this.http.get<CardResume>(`${this.cardsTcgdexUrl}`);
  }
}
