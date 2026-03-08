import { Component, ChangeDetectionStrategy, input, output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { SimilarCardsComponent } from '../similar-cards/similar-cards.component';
import { NormalizedCard } from '../card-list/card-list.component';

@Component({
  selector: 'app-card-detail',
  standalone: true,
  imports: [CommonModule, MatCardModule, MatProgressSpinnerModule, SimilarCardsComponent],
  templateUrl: './card-detail.component.html',
  styleUrls: ['./card-detail.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CardDetailComponent {
  public imageUrl = input<string | undefined>();
  public imageAlt = input<string>('Card image');
  public similarCards = input<NormalizedCard[]>([]);
  public showSpinner = input<boolean>(false);
  public pageIndex = input<number>(0);
  public pageSize = input<number>(20);
  public totalItems = input<number>(0);

  public pageChange = output<number>();

  onPageChange(newPage: number): void {
    this.pageChange.emit(newPage);
  }
}
