import { Component, ChangeDetectionStrategy, input, output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { RouterLink } from '@angular/router';
import { ActionBarComponent } from '../../action-bar/action-bar.component';
import { MatButtonModule } from '@angular/material/button';

export interface NormalizedCard {
  id: string;
  name: string;
  imageUrl?: string;
  routerLink: string;
}

@Component({
  selector: 'app-card-list',
  standalone: true,
  imports: [
    CommonModule,
    MatCardModule,
    MatProgressSpinnerModule,
    RouterLink,
    ActionBarComponent,
    MatButtonModule
  ],
  templateUrl: './card-list.component.html',
  styleUrls: ['./card-list.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CardListComponent {
  public cards = input<NormalizedCard[]>([]);
  public pageIndex = input<number>(0);
  public pageSize = input<number>(10);
  public totalItems = input<number>(0);
  public showSpinner = input<boolean>(false);
  public errorMessage = input<string | null>(null);
  public showSourceChangeButton = input<boolean>(false);

  public pageChange = output<number>();
  public reload = output<void>();
  public sourceChange = output<void>();

  onPageChange(newPage: number): void {
    this.pageChange.emit(newPage);
  }

  onReload(): void {
    this.reload.emit();
  }

  onChangeSource(): void {
    this.sourceChange.emit();
  }
}

