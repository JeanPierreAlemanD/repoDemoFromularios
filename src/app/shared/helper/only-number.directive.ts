import {Directive, ElementRef, HostListener, Input} from '@angular/core';

@Directive({
  standalone: true,
  selector: '[hbkOnlyNumber]'
})

export class OnlyNumberDirective {

  @HostListener('input', ['$event']) onInputChange(event: KeyboardEvent) {
    const initialValue = (<HTMLInputElement>event.target).value;
    (<HTMLInputElement>event.target).value = initialValue.replace(/[^0-9]*/g, '');
    if (initialValue !== (<HTMLInputElement>event.target).value) {
      event.stopPropagation();
    }
  }

  @HostListener('paste', ['$event']) onPaste(event: ClipboardEvent) {
    const clipboardData = event.clipboardData?.getData('text/plain');
    if (clipboardData && /[0-9]/.test(clipboardData)) {
      event.preventDefault();
    }
  }

  @HostListener('cut', ['$event']) onCut(event: ClipboardEvent) {
    const selection = window.getSelection()?.toString();
    if (selection && /[0-9]/.test(selection)) {
      event.preventDefault();
    }
  }

}
