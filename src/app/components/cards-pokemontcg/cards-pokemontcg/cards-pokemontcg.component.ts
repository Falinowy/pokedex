import { Component, OnInit, inject } from '@angular/core';
import { CardsPokemontcgFacade } from 'src/app/service/pokemontcg/cards-pokemontcg.facade';
import { Router } from '@angular/router';
import { CardListComponent } from '../../shared/card-list/card-list.component';

@Component({
  selector: 'app-cards-pokemontcg',
  templateUrl: './cards-pokemontcg.component.html',
  styleUrls: ['./cards-pokemontcg.component.scss'],
  imports: [CardListComponent],
})
export class CardsPokemontcgComponent implements OnInit {
  public facade = inject(CardsPokemontcgFacade);
  private router = inject(Router);

  public pageIndex = 0;
  public pageSize = 10;

  public ngOnInit(): void {
    if (this.facade.cards().length === 0) {
      this.facade.loadCards();
    }
  }

  public onPageChange(newPage: number): void {
    this.pageIndex = newPage;
  }

  public onSearch(query: string): void {
    this.facade.setSearchQuery(query);
    this.pageIndex = 0;
  }

  public goHome(): void {
    this.router
      .navigate([`/home`])
      .then((ok) => {})
      .catch((err) => {
    });
  }
}
