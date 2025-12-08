import { Component, OnDestroy, OnInit, inject } from '@angular/core';
import { Subscription } from 'rxjs';
import { Card } from '../../module/card';
import { CardsPokemontcgService } from 'src/app/service/pokemontcg/cards-pokemontcg.service';
import { Router, RouterLink } from '@angular/router';
import { MatCard, MatCardHeader, MatCardTitle, MatCardImage } from '@angular/material/card';
import { ActionBarComponent } from '../../action-bar/action-bar.component';
import { MatProgressSpinner } from '@angular/material/progress-spinner';

@Component({
    selector: 'app-cards-pokemontcg',
    templateUrl: './cards-pokemontcg.component.html',
    styleUrls: ['./cards-pokemontcg.component.css'],
    imports: [
        MatCard,
        RouterLink,
        MatCardHeader,
        MatCardTitle,
        MatCardImage,
        ActionBarComponent,
        MatProgressSpinner,
    ],
})
export class CardsPokemontcgComponent implements OnInit, OnDestroy {
  private cardsService = inject(CardsPokemontcgService);
  private router = inject(Router);

  private cardsSubscription: Subscription;
  public cards: Card[];
  public showCards: Card[];
  public pageIndex = 0;
  public pageSize = 10;
  public showSpinner = true;
  public errorMessage: string;

  public ngOnInit(): void {
    this.getCards();
  }
  public getCards(): void {
    this.errorMessage = null;
    this.showSpinner = true;
    this.cardsSubscription = this.cardsService
      .getAllCardsFromPokemontcg()
      .subscribe({
        next: (result) => {
          this.cards = result.data;
          this.showSpinner = false;
          console.log(this.cards);
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

  public updatePage(): void {
    const start = this.pageIndex * this.pageSize;
    const end = start + this.pageSize;
    this.showCards = this.cards;
    // .slice(start, end);
  }

  public onPageChange(newPage: number): void {
    this.pageIndex = newPage;
    this.updatePage();
  }
  public goHome(): void {
    this.router
      .navigate([`/home`])
      .then((ok) => {})
      .catch((err) => {
        console.error('navigate error:', err);
      });
  }
  public ngOnDestroy(): void {
    this.cardsSubscription?.unsubscribe();
  }
}
