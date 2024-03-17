import {Directive, ElementRef, HostListener, Input} from '@angular/core';

@Directive({
  standalone: true,
  selector: '[hbkOnlyLetters]'
})

export class OnlyLettersDirective {

  @HostListener('input', ['$event']) onInputChange(event: KeyboardEvent) {
    const initialValue = (<HTMLInputElement>event.target).value;
    // (<HTMLInputElement>event.target).value = initialValue.replace(/[^a-zA-Z]*/g, '');
    (<HTMLInputElement>event.target).value = initialValue.replace(/[^a-zA-Z\s]*/g, '');
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
    if (selection && /[a-zA-Z]/.test(selection)) {
      event.preventDefault();
    }
  }

}
