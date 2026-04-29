import { AfterViewInit, ChangeDetectorRef, Component, ElementRef, inject, viewChild } from '@angular/core';

@Component({
  selector: 'app-double-scroll',
  imports: [],
  templateUrl: './double-scroll.html',
  styleUrl: './double-scroll.scss',
})
export class DoubleScroll implements AfterViewInit {
  wrapper1 = viewChild<ElementRef>('wrapper1');
  wrapper2 = viewChild<ElementRef>('wrapper2');
  div1 = viewChild<ElementRef>('div1');
  div2 = viewChild<ElementRef>('div2');
  private _cd = inject(ChangeDetectorRef);


  ngAfterViewInit() {
    this._cd.detach();

    const el1 = this.wrapper1()?.nativeElement;
    const el2 = this.wrapper2()?.nativeElement;
    const content = this.div2()?.nativeElement;
    const fake = this.div1()?.nativeElement;

    const syncWidth = () => {
      fake.style.width = content.scrollWidth + 'px';
    };

    const ro = new ResizeObserver(() => {
      syncWidth();
    });

    ro.observe(content);

    syncWidth();

    let isSyncing = false;

    el1.addEventListener('scroll', () => {
      if (isSyncing) return;
      isSyncing = true;
      el2.scrollLeft = el1.scrollLeft;
      isSyncing = false;
    });

    el2.addEventListener('scroll', () => {
      if (isSyncing) return;
      isSyncing = true;
      el1.scrollLeft = el2.scrollLeft;
      isSyncing = false;
    });
  }
}
