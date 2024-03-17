import { Component, OnInit } from '@angular/core';
import {MatDialog} from "@angular/material/dialog";

@Component({
  selector: 'comp-invalid-form-coyuge',
  templateUrl: './modal-invalid-form-coyuge.component.html',
  styleUrls: ['./modal-invalid-form-coyuge.component.scss']
})
export class ModalInvalidFormCoyugeComponent implements OnInit {

  constructor(public dialog: MatDialog) { }

  ngOnInit(): void {
  }

  close() {
    this.dialog.closeAll()
  }
}
