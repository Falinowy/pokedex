import { Component, OnInit } from '@angular/core';
import { CardsService } from 'src/app/service/cards.service';
import { Subscription } from 'rxjs';
import { Card } from '../module/card';

@Component({
  selector: 'app-cards',
  templateUrl: './cards.component.html',
  styleUrls: ['./cards.component.css']
})
export class CardsComponent implements OnInit {
  private cardsSubscription: Subscription;
  cards: Card;
  page = 1;
  totalCards: number;

  constructor(private cardsService: CardsService) { }

  ngOnInit(): void {
    this.getCards();
  }
  getCards(): void {
    this.cardsSubscription = this.cardsService.getCards(this.page)
      .subscribe(result => {
        this.totalCards = (result.totalCount / result.pageSize) * 10;
        this.cards = result.data;
      });
    }
  ngOnDestroy(): void {
    this.cardsSubscription.unsubscribe();
  }
}
