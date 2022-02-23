import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { CardsService } from 'src/app/service/cards.service';
import { Card } from '../module/card';

@Component({
  selector: 'app-cards-detail',
  templateUrl: './cards-detail.component.html',
  styleUrls: ['./cards-detail.component.css']
})
export class CardsDetailComponent implements OnInit {
  idCard: string;
  types: string;
  cardDetails: Card;
  similarPokemons: Card;
  private cardsDetailSubscription: Subscription;
  private similarCardsSubscription: Subscription;
  constructor(
    private route: ActivatedRoute,
    private cardsService: CardsService,
    private router: Router) { }

  ngOnInit(): void {
    this.getCardDetail();
    this.getSimilarCards();
  }

  getCardDetail(): void {
    this.idCard = this.route.snapshot.params['idCard'];
    this.cardsDetailSubscription = this.cardsService.getCardDetail(this.idCard)
      .subscribe(result => {
        this.cardDetails = result.data
      });
  }
  getSimilarCards(): void {
    this.types = this.route.snapshot.params['types'];
    this.similarCardsSubscription = this.cardsService.getSimilarCards(this.types)
      .subscribe(result => {
        this.similarPokemons = result.data

      });
  }
  refresh(): void {
    this.idCard = this.route.snapshot.params['idCard'];
    this.types = this.route.snapshot.params['types'];
    this.router.routeReuseStrategy.shouldReuseRoute = () => false;
}
  ngOnDestroy(): void {
    this.cardsDetailSubscription.unsubscribe();
    this.similarCardsSubscription.unsubscribe();
  }
}
