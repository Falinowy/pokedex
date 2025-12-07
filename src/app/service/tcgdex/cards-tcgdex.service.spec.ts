import { TestBed } from '@angular/core/testing';

import { CardsTcgdexService } from './cards-tcgdex.service';

describe('CardsService', () => {
  let service: CardsTcgdexService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CardsTcgdexService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
