import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CardsTcgdexDetailComponent } from './cards-tcgdex-detail.component';

describe('CardsDetailComponent', () => {
  let component: CardsTcgdexDetailComponent;
  let fixture: ComponentFixture<CardsTcgdexDetailComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
    imports: [CardsTcgdexDetailComponent]
})
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CardsTcgdexDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
