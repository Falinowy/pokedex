import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CardsPokemontcgComponent } from './cards-pokemontcg.component';

describe('CardsPokemontcgComponent', () => {
  let component: CardsPokemontcgComponent;
  let fixture: ComponentFixture<CardsPokemontcgComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
    imports: [CardsPokemontcgComponent]
})
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CardsPokemontcgComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
