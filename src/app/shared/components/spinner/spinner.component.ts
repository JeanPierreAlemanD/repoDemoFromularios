import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'shared-spinner',
  template:`
    <div class="overlay">
      <mat-spinner diameter="50"></mat-spinner>
    </div>`,
  styleUrls: ['./spinner.component.scss']
})
export class SpinnerComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

}
