import { Directive, HostBinding, HostListener, ElementRef, inject } from '@angular/core';

@Directive({
  selector: 'img[appImgLoader]',
  standalone: true
})
export class ImgLoaderDirective {
  private el = inject(ElementRef<HTMLImageElement>);
  
  @HostBinding('class.loaded') isLoaded = false;

  @HostListener('load')
  onLoad() {
    this.updateState();
  }

  @HostListener('error')
  onError() {
    this.el.nativeElement.src = 'assets/images/card-back.png';
    this.updateState();
  }

  private updateState() {
    this.isLoaded = true;
    const parent = this.el.nativeElement.closest('.card-placeholder');
    if (parent) {
      parent.classList.add('is-loaded');
    }
  }
}
