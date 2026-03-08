import { Component, ChangeDetectionStrategy, input, output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { MatCardModule } from '@angular/material/card';
import { NormalizedCard } from '../card-list/card-list.component';
import { ActionBarComponent } from '../../action-bar/action-bar.component';

@Component({
  selector: 'app-similar-cards',
  standalone: true,
  imports: [CommonModule, RouterLink, ActionBarComponent, MatCardModule],
  templateUrl: './similar-cards.component.html',
  styleUrls: ['./similar-cards.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SimilarCardsComponent {
  public similarCards = input<NormalizedCard[]>([]);
  public totalItems = input<number>(0);
  public pageSize = input<number>(20);
  public pageIndex = input<number>(0);

  public pageChange = output<number>();

  onPageChange(newPage: number): void {
    this.pageChange.emit(newPage);
  }
}
