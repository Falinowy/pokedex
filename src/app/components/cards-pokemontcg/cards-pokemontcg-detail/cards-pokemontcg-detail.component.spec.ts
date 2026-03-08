import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideHttpClientTesting } from '@angular/common/http/testing';
import { provideHttpClient } from '@angular/common/http';
import { provideRouter } from '@angular/router';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

import { CardsPokemontcgDetailComponent } from './cards-pokemontcg-detail.component';

describe('CardsPokemontcgDetailComponent', () => {
  let component: CardsPokemontcgDetailComponent;
  let fixture: ComponentFixture<CardsPokemontcgDetailComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        CardsPokemontcgDetailComponent,
        MatSnackBarModule,
        BrowserAnimationsModule
      ],
      providers: [
        provideHttpClient(),
        provideHttpClientTesting(),
        provideRouter([]),
        {
          provide: ActivatedRoute,
          useValue: {
            snapshot: { params: { idCard: '1', types: 'Fire' } },
            paramMap: of({ get: (key: string) => '1' })
          }
        }
      ]
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
