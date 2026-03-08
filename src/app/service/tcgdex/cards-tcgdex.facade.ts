import { Injectable, signal, computed } from '@angular/core';
import TCGdex, { CardResume, Card } from '@tcgdex/sdk';
import { NormalizedCard } from '../../components/shared/card-list/card-list.component';

const tcgdex = new TCGdex('en');

@Injectable({ providedIn: 'root' })
export class CardsTcgdexFacade {

  private _allCards = signal<CardResume[]>([]);
  public allCards = this._allCards.asReadonly();

  private _isListLoading = signal<boolean>(true);
  public isListLoading = this._isListLoading.asReadonly();

  private _listError = signal<string | null>(null);
  public listError = this._listError.asReadonly();

  private _pageIndex = signal<number>(0);
  public pageIndex = this._pageIndex.asReadonly();

  private _pageSize = signal<number>(10);
  public pageSize = this._pageSize.asReadonly();

  public validCards = computed<CardResume[]>(() => {
    return this._allCards().filter(
      card => card.name !== 'Unown' && card.image && !card.image.includes('undefined')
    );
  });

  public normalizedCards = computed<NormalizedCard[]>(() => {
    const start = this._pageIndex() * this._pageSize();
    const end = start + this._pageSize();
    return this.validCards().slice(start, end).map(c => ({
      id: c.id,
      name: c.name,
      imageUrl: `${c.image}/low.png`,
      routerLink: `/cards/tcgdex/${c.id}`
    }));
  });

  private _selectedCard = signal<Card | null>(null);
  public selectedCard = this._selectedCard.asReadonly();

  private _similarCards = signal<CardResume[]>([]);
  public similarCards = this._similarCards.asReadonly();

  private _similarPageIndex = signal<number>(0);
  public similarPageIndex = this._similarPageIndex.asReadonly();

  private _similarPageSize = signal<number>(20);
  public similarPageSize = this._similarPageSize.asReadonly();

  private _isDetailLoading = signal<boolean>(true);
  public isDetailLoading = this._isDetailLoading.asReadonly();

  private similarCardsCache = new Map<string, CardResume[]>();

  public normalizedSimilarCards = computed<NormalizedCard[]>(() => {
    const start = this._similarPageIndex() * this._similarPageSize();
    const end = start + this._similarPageSize();
    return this._similarCards().slice(start, end).map(c => ({
      id: c.id,
      name: c.name,
      imageUrl: c.image ? `${c.image}/low.webp` : '',
      routerLink: `/cards/tcgdex/${c.id}`
    }));
  });

  public similarCardsTotal = computed<number>(() => this._similarCards().length);

  public selectedCardImageUrl = computed<string>(() => {
    const card = this._selectedCard();
    if (card && card.image) {
      return `${card.image}/high.webp`;
    }
    return '';
  });

  public changePage(newPageIndex: number): void {
    this._pageIndex.set(newPageIndex);
  }

  public async loadAllCards(): Promise<void> {
    if (this._allCards().length > 0) return;
    this._isListLoading.set(true);
    this._listError.set(null);
    try {
      const cards = await tcgdex.card.list();
      this._allCards.set(cards);
      this._isListLoading.set(false);
    } catch (err) {
      console.error('TCGdex error:', err);
      this._listError.set('Wystąpił błąd podczas pobierania danych. Proszę spróbować ponownie później.');
      this._isListLoading.set(false);
    }
  }

  public changeSimilarPage(newPageIndex: number): void {
    this._similarPageIndex.set(newPageIndex);
  }

  public resetDetail(): void {
    this._selectedCard.set(null);
    this._isDetailLoading.set(true);
}

  public async loadCardDetail(idCard: string): Promise<void> {
    this._isDetailLoading.set(true);
    try {
      const card = await tcgdex.card.get(idCard);
      const currentCard = this._selectedCard();
      
      if (!currentCard || (card && card.set && currentCard.set && card.set.id !== currentCard.set.id)) {
        this._similarPageIndex.set(0);
        
        if (card && card.set && card.set.id) {
          if (this.similarCardsCache.has(card.set.id)) {
            this._similarCards.set(this.similarCardsCache.get(card.set.id)!);
          } else {
            this._similarCards.set([]); 
            const set = await tcgdex.set.get(card.set.id);
            const cards = set.cards || [];
            this.similarCardsCache.set(card.set.id, cards);
            this._similarCards.set(cards);
          }
        } else {
          this._similarCards.set([]);
        }
      }

      this._selectedCard.set(card);
      this._isDetailLoading.set(false);
    } catch (err) {
      console.error(err);
      this._isDetailLoading.set(false);
    }
  }
}
