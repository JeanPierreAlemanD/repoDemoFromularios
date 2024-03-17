import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialog} from "@angular/material/dialog";

@Component({
  selector: 'modal-error',
  templateUrl: './modals-error.component.html',
  styleUrls: ['./modals-error.component.scss']
})
export class ModalsErrorComponent implements OnInit {

  constructor(
    public dialog: MatDialog,
              @Inject(MAT_DIALOG_DATA) public data: any
  ) {
  }
  ngOnInit(): void {
  }

  //
  close() {
    this.dialog.closeAll()
  }

}
