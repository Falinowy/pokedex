import { Injectable, inject, signal, computed } from '@angular/core';
import { CardsPokemontcgService } from './cards-pokemontcg.service';
import { Card } from '../../components/module/card';
import { NormalizedCard } from '../../components/shared/card-list/card-list.component';
import { HttpErrorResponse } from '@angular/common/http';

@Injectable({ providedIn: 'root' })
export class CardsPokemontcgFacade {
  private cardsService = inject(CardsPokemontcgService);
  private _cards = signal<Card[]>([]);
  public cards = this._cards.asReadonly();
  
  private _isListLoading = signal<boolean>(true);
  public isListLoading = this._isListLoading.asReadonly();
  
  private _listError = signal<string | null>(null);
  public listError = this._listError.asReadonly();

  private _selectedCard = signal<Card | null>(null);
  public selectedCard = this._selectedCard.asReadonly();

  private _isDetailLoading = signal<boolean>(true);
  public isDetailLoading = this._isDetailLoading.asReadonly();
  
  private _similarCards = signal<Card[]>([]);
  public similarCards = this._similarCards.asReadonly();

  private _similarPageIndex = signal<number>(0);
  public similarPageIndex = this._similarPageIndex.asReadonly();

  private _similarPageSize = signal<number>(20);
  public similarPageSize = this._similarPageSize.asReadonly();

  private similarCardsCache = new Map<string, Card[]>();

  public normalizedCards = computed<NormalizedCard[]>(() => 
    this._cards().map(c => ({
      id: c.id,
      name: c.name,
      imageUrl: c.images?.small,
      routerLink: `/cards/pokemontcg/${c.id}/${c.types ? c.types[0] : ''}`
    }))
  );

  public normalizedSimilarCards = computed<NormalizedCard[]>(() => {
    const similar = this._similarCards() as any; 
    if (!similar) return [];
    
    const start = this._similarPageIndex() * this._similarPageSize();
    const end = start + this._similarPageSize();
    
    return (similar as Card[]).slice(start, end).map(c => ({
      id: c.id,
      name: c.name,
      imageUrl: c.images?.small,
      routerLink: `/cards/pokemontcg/${c.id}/${c.types ? c.types[0] : ''}`
    }));
  });

  public similarCardsTotal = computed<number>(() => this._similarCards().length);
  public loadCards(): void {
    this._isListLoading.set(true);
    this._listError.set(null);
    this.cardsService.getAllCardsFromPokemontcg().subscribe({
      next: (result) => {
        this._cards.set(result.data);
        this._isListLoading.set(false);
      },
      error: (err: HttpErrorResponse) => {
        this._isListLoading.set(false);
        if (err.status === 504) {
          this._listError.set('Przekroczono czas oczekiwania na odpowiedź serwera. Proszę spróbować ponownie później.');
        } else {
          this._listError.set('Wystąpił błąd podczas pobierania danych. Proszę spróbować ponownie później.');
        }
      }
    });
  }

  public loadCardDetail(idCard: string): void {
    this._isDetailLoading.set(true);
    this.cardsService.getCardDetail(idCard).subscribe({
      next: (result) => {
        this._selectedCard.set(result.data);
        this._isDetailLoading.set(false);
      },
      error: () => this._isDetailLoading.set(false)
    });
  }

  public changeSimilarPage(newPageIndex: number): void {
    this._similarPageIndex.set(newPageIndex);
  }

  public loadSimilarCards(types: string): void {
    const currentSimilar = this._similarCards();
    
    if (this.similarCardsCache.has(types)) {
      const cached = this.similarCardsCache.get(types)!;
      if (currentSimilar !== cached) {
        this._similarPageIndex.set(0);
        this._similarCards.set(cached);
      }
      return;
    }

    this.cardsService.getSimilarCards(types).subscribe({
      next: (result) => {
        this._similarPageIndex.set(0);
        this.similarCardsCache.set(types, result.data);
        this._similarCards.set(result.data);
      },
      error: () => {}
    });
  }

  public resetDetailState(): void {
    this._selectedCard.set(null);
    this._isDetailLoading.set(true);
 }
}
