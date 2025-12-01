import { Component, OnDestroy, OnInit } from '@angular/core';
import { CardsService } from 'src/app/service/cards.service';
import { Subscription } from 'rxjs';
import { Card } from '../module/card';
import TCGdex, { CardResume } from '@tcgdex/sdk';
const tcgdex = new TCGdex('en');

@Component({
  selector: 'app-cards',
  templateUrl: './cards.component.html',
  styleUrls: ['./cards.component.css'],
  standalone: false,
})
export class CardsComponent implements OnInit, OnDestroy {
  private cardsSubscription: Subscription;
  private cardsPromise: Promise<any>;
  cards: Card;
  allCardsFromTcgdex: CardResume[];
  cardsPerPage = 10;
  currentPage = 0; // 0 = pierwsza strona, 1 = druga itd.
  public pageIndex = 0;
  public pageSize = 10;
  showCardsFromTcgdex: CardResume[] = [];
  page = 1;
  totalCards: number;
  showSpinner = true;
  errorMessage: string;
  constructor(private cardsService: CardsService) {}

  ngOnInit(): void {
    // this.getCards();
    this.getCardsFromTCGdex();
  }
  public getCards(): void {
    this.errorMessage = null;
    this.showSpinner = true;
    this.cardsSubscription = this.cardsService
      .getAllCardsFromPokemontcg()
      .subscribe({
        next: (result) => {
          this.totalCards = (result.totalCount / result.pageSize) * 10;
          this.cards = result.data;
          this.showSpinner = false;
        },
        error: (err) => {
          this.showSpinner = false;
          if (err.status === 504) {
            this.errorMessage =
              'Przekroczono czas oczekiwania na odpowiedź serwera. Proszę spróbować ponownie później.';
          } else {
            this.errorMessage =
              'Wystąpił błąd podczas pobierania danych. Proszę spróbować ponownie później.';
          }
        },
      });
  }

public getCardsFromTCGdex(): void {
  this.errorMessage = null;
  this.showSpinner = true;

  this.cardsPromise = tcgdex.card
    .list()
    .then((cards) => {
      this.allCardsFromTcgdex = cards.map((card) => ({
        ...card,
        image: `${card.image}/low.png`,
      }));

      this.updatePage();
      this.showSpinner = false;
    })
    .catch((error) => {
      console.error('TCGdex error:', error);
      this.showSpinner = false;
      this.errorMessage =
        'Wystąpił błąd podczas pobierania danych. Proszę spróbować ponownie później.';
    });
}


public updatePage(): void {
  const start = this.pageIndex * this.pageSize;
  const end = start + this.pageSize;

  console.log(start + ': start');
  console.log(end + ': end');
  this.showCardsFromTcgdex = this.allCardsFromTcgdex
    .filter((card) => card.name !== 'Unown' && card.image !== 'undefined/low.png')
    .slice(start, end);
    console.log(this.showCardsFromTcgdex);
}


  public nextPage(): void {
    this.pageIndex++;
    // zabezpieczenie – jeśli wyszedłeś poza zakres, zacznij od nowa
    if (
      this.pageIndex * this.cardsPerPage >=
      this.allCardsFromTcgdex.length
    ) {
      this.pageIndex = 0;
    }

    this.updatePage();
  }

  public prevPage(): void {
    if (this.pageIndex > 0) {
      this.pageIndex--;
      this.updatePage();
    }
  }

  ngOnDestroy(): void {
    this.cardsSubscription.unsubscribe();
  }
}
