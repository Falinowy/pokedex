import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CardsTcgdexComponent } from './cards-tcgdex.component';

describe('CardsComponent', () => {
  let component: CardsTcgdexComponent;
  let fixture: ComponentFixture<CardsTcgdexComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CardsTcgdexComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CardsTcgdexComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
