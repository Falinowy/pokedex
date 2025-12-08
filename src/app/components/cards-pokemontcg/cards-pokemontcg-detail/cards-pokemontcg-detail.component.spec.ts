import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CardsPokemontcgDetailComponent } from './cards-pokemontcg-detail.component';

describe('CardsPokemontcgDetailComponent', () => {
  let component: CardsPokemontcgDetailComponent;
  let fixture: ComponentFixture<CardsPokemontcgDetailComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
    imports: [CardsPokemontcgDetailComponent]
})
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CardsPokemontcgDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
