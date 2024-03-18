import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialog} from "@angular/material/dialog";
import {ApiResponse} from "../../../../services/api.models";

@Component({
  selector: 'comp-invalid-form-coyuge',
  templateUrl: './modal-invalid-form-coyuge.component.html',
  styleUrls: ['./modal-invalid-form-coyuge.component.scss']
})
export class ModalInvalidFormCoyugeComponent implements OnInit {

  constructor(
    public dialog: MatDialog,
    @Inject(MAT_DIALOG_DATA) public data:ApiResponse<any>) { }

  ngOnInit(): void {
  }

  close() {
    this.dialog.closeAll()
  }
}
