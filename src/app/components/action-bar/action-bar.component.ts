import { Component, Input, input, output } from '@angular/core';

@Component({
    selector: 'app-action-bar',
    templateUrl: './action-bar.component.html',
    styleUrl: './action-bar.component.scss',
})
export class ActionBarComponent {
  @Input() pageIndex = 0;
  readonly pageSize = input(10);
  readonly totalItems = input(0);

  readonly pageChange = output<number>();

  public nextPage() {
    const maxPage = Math.floor(this.totalItems() / this.pageSize());
    this.setPageIndex(maxPage);
    this.pageChange.emit(this.pageIndex);
  }

  public setPageIndex(maxPage: number) {
    if (this.pageIndex >= maxPage) {
      this.pageIndex = 0;
    } else {
      this.pageIndex++;
    }
  }

  public prevPage() {
    if (this.isPageIndexMoreThanZero()) {
      this.pageIndex--;
      this.pageChange.emit(this.pageIndex);
    }
  }

  private isPageIndexMoreThanZero(): boolean {
    return this.pageIndex > 0;
  }

  public isDisabledNext(): boolean {
    return (this.pageIndex + 1) * this.pageSize() >= this.totalItems();
  }

  public isPageIndexZero(): boolean {
    return this.pageIndex === 0;
  }

  public getPageNumber(): number {
    return this.pageIndex + 1;
  }
}
