import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideHttpClientTesting } from '@angular/common/http/testing';
import { provideHttpClient } from '@angular/common/http';
import { provideRouter } from '@angular/router';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

import { CardsTcgdexDetailComponent } from './cards-tcgdex-detail.component';

describe('CardsDetailComponent', () => {
  let component: CardsTcgdexDetailComponent;
  let fixture: ComponentFixture<CardsTcgdexDetailComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        CardsTcgdexDetailComponent,
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
            snapshot: { params: { idCard: '1' } },
            paramMap: of({ get: (key: string) => '1' })
          }
        }
      ]
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
