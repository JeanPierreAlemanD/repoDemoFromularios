import {Directive, ElementRef, HostListener, Input} from '@angular/core';

@Directive({
  standalone: true,
  selector: '[hbkOnlyAlphaNumeric20]'
})

export class OnlyAlphaNumberDirective {

  constructor(private el: ElementRef) {
  }

  @HostListener('input', ['$event.target.value']) onInput(value: string) {
    const maxLength = 20;
    const trimmedValue = value.trim(); // Trim leading/trailing whitespace
    if (trimmedValue.length > maxLength) {
      this.el.nativeElement.value = trimmedValue.substring(0, maxLength);
    }
  }

}
