import { Component, OnInit, inject } from '@angular/core';
import { CardsTcgdexFacade } from 'src/app/service/tcgdex/cards-tcgdex.facade';
import { CardListComponent } from '../../shared/card-list/card-list.component';

@Component({
    selector: 'app-cards-tcgdex',
    templateUrl: './cards-tcgdex.component.html',
    styleUrls: ['./cards-tcgdex.component.scss'],
    imports: [CardListComponent],
})
export class CardsTcgdexComponent implements OnInit {
  public facade = inject(CardsTcgdexFacade);

  public ngOnInit(): void {
    this.facade.loadAllCards();
  }

  public onPageChange(newPage: number): void {
    this.facade.changePage(newPage);
  }
}
