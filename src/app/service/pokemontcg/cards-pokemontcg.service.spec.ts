import { TestBed } from '@angular/core/testing';

import { CardsPokemontcgService } from './cards-pokemontcg.service';

describe('CardsService', () => {
  let service: CardsPokemontcgService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CardsPokemontcgService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
