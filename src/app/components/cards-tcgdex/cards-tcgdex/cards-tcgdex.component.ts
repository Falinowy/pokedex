import { Component, OnDestroy, OnInit, inject } from '@angular/core';
import { Subscription } from 'rxjs';
import { Card } from '../../module/card';
import TCGdex, { CardResume } from '@tcgdex/sdk';
import { CardsTcgdexService } from 'src/app/service/tcgdex/cards-tcgdex.service';
import { MatCard, MatCardHeader, MatCardTitle, MatCardImage } from '@angular/material/card';
import { RouterLink } from '@angular/router';
import { ActionBarComponent } from '../../action-bar/action-bar.component';
import { MatProgressSpinner } from '@angular/material/progress-spinner';
import { MatButton } from '@angular/material/button';
const tcgdex = new TCGdex('en');

@Component({
    selector: 'app-cards-tcgdex',
    templateUrl: './cards-tcgdex.component.html',
    styleUrls: ['./cards-tcgdex.component.css'],
    imports: [
        MatCard,
        RouterLink,
        MatCardHeader,
        MatCardTitle,
        MatCardImage,
        ActionBarComponent,
        MatProgressSpinner,
        MatButton,
    ],
})
export class CardsTcgdexComponent implements OnInit, OnDestroy {
  private cardsService = inject(CardsTcgdexService);

  private cardsSubscription: Subscription;
  private cardsPromise: Promise<any>;
  cards: Card[];
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

  ngOnInit(): void {
    this.getCardsFromTCGdex();
  }
  public getCards(): void {
    this.errorMessage = null;
    this.showSpinner = true;
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
    this.showCardsFromTcgdex = this.allCardsFromTcgdex
      .filter(
        (card) => card.name !== 'Unown' && card.image !== 'undefined/low.png'
      )
      .slice(start, end);
  }

  public onPageChange(newPage: number): void {
    this.pageIndex = newPage;
    this.updatePage();
  }

  ngOnDestroy(): void {
    this.cardsSubscription?.unsubscribe();
  }
}
