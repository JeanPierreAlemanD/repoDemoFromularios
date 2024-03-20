import { ChangeDetectorRef, Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ReniecService } from '../../services/reniec.service';
import {
  anyToBoolean,
  dniRepetidoValidator,
  getfieldMessage,
} from '../../shared/helper/helper';
import { MatTable } from '@angular/material/table';
import { respSelectedFrom } from '../../models/estadocivil.models';
import { MatDialog } from '@angular/material/dialog';
import { ModalSuccesInscriptionComponent } from '../../shared/components/modals/modal-succes-inscription/modal-succes-inscription.component';
import { ModalsErrorComponent } from '../../shared/components/modals/modal-error/modals-error.component';
import { ModalInvalidFormCoyugeComponent } from '../../shared/components/modals/modal-invalid-form-coyuge/modal-invalid-form-coyuge.component';
import { RecaptchaComponent } from 'ng-recaptcha';

export interface TableItem {
  factorIngresoId: string;
  factorIngreso: string;
  monto: number;
}

@Component({
  selector: 'comp-formulario',
  templateUrl: './formulario.component.html',
  styleUrls: ['./formulario.component.scss'],
})
export class FormularioComponent implements OnInit {
  errorMessage: string = '';
  inputValueCip: string = '';
  nombres: string = '';
  primerApellido: string = '';
  segundoApellido: string = '';
  selectedOption: string = '';
  estadoSelected: string = '';
  estadoCasado: boolean = false;
  estadoConviviente: boolean = false;
  requirePartida: boolean = false;
  datos: boolean = true;
  mostrarMensaje: boolean = false;
  datosNecesarios: boolean = false;
  loading: boolean = false;
  formConyugeIsValid: boolean = false;
  formConvivienteIsValid: boolean = false;
  mostarMensajeConyuge: boolean = false;
  mostarMensajeConviviente: boolean = false;
  data: TableItem[] = [];
  displayedColumns: string[] = ['option', 'value', 'action'];
  @ViewChild(MatTable) table!: MatTable<TableItem>;
  estadoCivil: respSelectedFrom[] = [];
  factor: respSelectedFrom[] = [];
  conyugeData: any;
  convivienteData: any;
  dialogRef: any;
  terminos: boolean = false;
  terminosMarcar: boolean = false;
  dataTotal: any;
  CASADO = '2';
  CONVIVIENTE = '5';
  estadoRegister: string = '';
  estadoCivilAdministrado: number = 0;
  inputValue: number = 0;
  valueCaptcha: string = '';
  captchaResponse: string = '';
  @ViewChild('capthcForm') capthcForm!: RecaptchaComponent;
  mostarMensajeCaptcha: boolean = false;
  public form: FormGroup = this.fb.group({
    dni: [
      '',
      [Validators.required, Validators.minLength(8), dniRepetidoValidator()],
    ],
    cip: [
      '',
      [Validators.required, Validators.minLength(6), Validators.maxLength(8)],
    ],
    estadoCivil: [1, [Validators.required]],
    nombres: ['', [Validators.required]],
    primerApellido: ['', [Validators.required]],
    segundoApellido: ['', [Validators.required]],
    email: ['', [Validators.required, Validators.email]],
    telefono1: ['', [Validators.required, Validators.minLength(9)]],
    direccion1: ['', [Validators.maxLength(100)]],
    ip: [''],
    numeroPartida: [''],
    catpcha: [''],
    // form coyuge
    dniConyuge: [],
    cipConyuge: [],
    nombresConyuge: [],
    primerApellidoConyuge: [],
    segundoApellidoConyuge: [],
    montoadjuducatario: [],
    ingresos: this.fb.array([this.ingresoFormGroup()]),
  });

  constructor(
    private fb: FormBuilder,
    private reniecService: ReniecService,
    private dialog: MatDialog,
    private ref: ChangeDetectorRef
  ) {}

  ingresoFormGroup() {
    return this.fb.group({
      factorIngreso: 0,
      monto: 0,
    });
  }

  recibirFormconyugeValid(isValid: boolean) {
    this.formConyugeIsValid = isValid;
    if (this.formConyugeIsValid) {
      this.mostarMensajeConyuge = false;
    }
  }

  recibirFormconvivienteValid(isValid: boolean) {
    this.formConvivienteIsValid = isValid;
    if (this.formConvivienteIsValid) {
      this.mostarMensajeConyuge = false;
    }
  }

  recibirdatos(datos: any) {
    if (this.estadoRegister == '2') {
      this.conyugeData = datos;
    }
    if (this.estadoRegister == '5') {
      this.convivienteData = datos;
    }
  }

  ngOnInit(): void {
    this.terminos;
    this.estadoCasado = false;
    this.form.controls['dni'].valueChanges.subscribe((d) => {
      if (d.length < 1) {
        this.datos = true;
        this.form.get('nombres')?.setValue('');
        this.form.get('segundoApellido')?.setValue('');
        this.form.get('primerApellido')?.setValue('');
      }
    });

    this.form.controls['estadoCivil'].valueChanges.subscribe((value) => {
      this.estadoRegister = value;
      switch (value) {
        case '2': //casado
          this.estadoCasado = true;
          this.estadoConviviente = false;
          this.estadoCivilAdministrado = 2;
          break;
        case '5': //conviviente
          this.estadoConviviente = true;
          this.estadoCasado = false;
          this.form.get('numeroPartida')?.setValidators([Validators.required]);
          this.ref.detectChanges();
          break;
        default: //cualquier otro estado
          this.estadoCasado = false;
          this.estadoConviviente = false;
          break;
      }
    });
    this.cargarEstadoCivil();
    this.cargarFactor();
  }

  cargarEstadoCivil() {
    this.reniecService.getEstadoCivil().subscribe(
      (e) => {
        if (!e) return;
        this.estadoCivil = e;
        const estadoInit = e.map((m) => m.secuEntiDet);
        this.estadoSelected = estadoInit[0].toString();
      },
      (error) => {
        this.errorMessage = error;
      }
    );
  }

  cargarFactor() {
    this.reniecService.getFactor().subscribe(
      (f) => {
        if (!f) return;
        this.factor = f;
      },
      (error) => {
        this.errorMessage = error;
      }
    );
  }

  addItemTable() {
    if (this.selectedOption && this.inputValue) {
      const existeTipoValor = this.data.some(
        (item) => item.factorIngresoId === this.selectedOption
      );
      const selectedId = this.factor.find(
        (item) => item.valoCaduDet === this.selectedOption
      );
      if (!existeTipoValor) {
        this.data.push({
          factorIngreso: selectedId!.secuEntiDet.toString(),
          monto: this.inputValue,
          factorIngresoId: this.selectedOption,
        });
        this.table.renderRows();
        // Limpiar campos después de agregar
        this.selectedOption = '';
        this.inputValue = 0;
        //oculart mensajes de campos
        this.datosNecesarios = false;
        this.mostrarMensaje = false;
      } else {
        this.mostrarMensaje = true;
        this.datosNecesarios = false;
      }
    } else {
      this.datosNecesarios = true;
    }
  }

  deleteItem(row: TableItem) {
    const index = this.data.indexOf(row);
    if (index > -1) {
      this.data.splice(index, 1);
    }
    this.table.renderRows();
  }

  validatorLengh(field: string) {
    switch (field) {
      case 'dni':
        return this.form.controls['dni'].value.length !== 8;
      case 'cip':
        return this.form.controls['cip'].value.length !== 8;
      case 'telefono1':
        return this.form.controls['telefono1'].value.length !== 9;
      case 'direccion1':
        return this.form.controls['direccion1'].value.length !== 100;
      case 'numeroPartida':
        return this.form.controls['numeroPartida'].value.length !== 20;
    }
    return null;
  }

  obtenerDatos() {
    this.loading = true;
    const dni = this.form.controls['dni'].value;
    if (dni) {
      this.reniecService
        .getDatosReniec(dni)
        .pipe()
        .subscribe(
          (d) => {
            if (d.codigoError === '00') {
              this.loading = false;
              this.form.patchValue({
                nombres: d.nombres,
                primerApellido: d.apellidoPaterno,
                segundoApellido: d.apellidoMaterno,
              });
              this.nombres = d.nombres;
              this.primerApellido = d.apellidoPaterno;
              this.segundoApellido = d.apellidoMaterno;
              this.datos = false;
            } else {
              this.loading = false;
              this.form.get('dni')!.setValue('');
              this.datos = true;
            }
          },
          (error) => {
            this.loading = false;
            this.errorMessage = error;
          }
        );
    } else {
      this.loading = false;
      this.form.get('dni')?.markAsTouched();
      return;
    }
  }

  recaptchaResolved(captchaResponse: string) {
    if (captchaResponse) {
      this.valueCaptcha = captchaResponse;
      this.mostarMensajeCaptcha = false;
    } else {
      this.capthcForm.reset();
    }
  }

  isValidField(field: string): boolean | null {
    return (
      this.form.controls[field].errors && this.form.controls[field].touched
    );
  }

  getFieldErrors(field: string): string | null {
    return getfieldMessage(field, this.form);
  }

  limpiarform() {
    this.form.get('dni')!.setValue('');
    window.location.reload();
    this.cleanFormulario();
  }

  agregarCeros() {
    if (this.inputValueCip.length === 6) {
      this.inputValueCip = '00' + this.inputValueCip;
    }
  }

  handleCheckbox(data: any) {
    if (data == true) {
      this.terminos = data;
      this.terminosMarcar = false;
    } else {
      this.terminosMarcar = true;
    }
  }

  resert() {
    this.capthcForm.reset();
  }

  registrar() {
    // debugger;
    const captchaIdValid = anyToBoolean(this.captchaResponse);
    captchaIdValid == true
      ? (this.mostarMensajeCaptcha = false)
      : (this.mostarMensajeCaptcha = true);
    this.terminos == true
      ? (this.terminosMarcar = false)
      : (this.terminosMarcar = true);
    if (this.form.invalid) {
      this.loading = false;
      this.form.markAllAsTouched();
      return;
    }
    if (this.estadoRegister === '2' && this.formConyugeIsValid == false) {
      this.mostarMensajeConyuge = true;
      this.loading = false;
      return;
    }
    if (this.estadoRegister === '5' && this.formConvivienteIsValid == false) {
      this.mostarMensajeConviviente = true;
      this.loading = false;
      return;
    }
    this.cargarCatos();
    // this.loading = false;
    // console.log('dataTotal--> ', this.dataTotal);
    this.reniecService
      .registrarInscripcion(this.dataTotal)
      .subscribe((data) => {
        if (data.body) {
          const nameSucces = this.form.get('nombres')?.value;
          this.loading = false;
          this.modalSuccessInscription(nameSucces);
        }
        const inValido = data.code;
        const mensaje = data.message;
        if (inValido === 400) {
          this.modalInfo(mensaje);
          this.loading = false;
          this.capthcForm.reset();
          return;
        }
      });
  }

  cargarCatos() {
    if (this.estadoRegister == this.CASADO) {
      this.dataTotal = {
        cip: this.form.get('cip')?.value,
        direccion1: this.form.get('direccion1')?.value,
        dni: this.form.get('dni')?.value,
        email: this.form.get('email')?.value,
        estadoCivil: this.form.get('estadoCivil')?.value,
        ingresos: this.data,
        ip: null,
        nombres: this.form.get('nombres')?.value,
        numeroPartida: this.form.get('numeroPartida')?.value
          ? this.form.get('numeroPartida')?.value
          : null,
        primerApellido: this.form.get('primerApellido')?.value,
        segundoApellido: this.form.get('segundoApellido')?.value,
        telefono1: this.form.get('telefono1')?.value,
        terminos: this.terminos,
        // form coyuge ---
        cipConyuge:
          this.estadoRegister == '2'
            ? this.conyugeData.formConyuge.cipconyuge
            : null,
        dniConyuge:
          this.estadoRegister == '2'
            ? this.conyugeData.formConyuge.dniconyuge
            : null,
        ingresosConyuge:
          this.estadoRegister == '2' ? this.conyugeData.dataConyuge : null,
        nombresConyuge:
          this.estadoRegister == '2'
            ? this.conyugeData.formConyuge.nombreconyuge
            : null,
        primerApellidoConyuge:
          this.estadoRegister == '2'
            ? this.conyugeData.formConyuge.primerApellidoConyuge
            : null,
        segundoApellidoConyuge:
          this.estadoRegister == '2'
            ? this.conyugeData.formConyuge.segundoApellidoConyuge
            : null,
        captcha: this.estadoRegister == '2' ? this.valueCaptcha : null,
      };
    }
    if (this.estadoRegister == this.CONVIVIENTE) {
      this.dataTotal = {
        cip: this.form.get('cip')?.value,
        direccion1: this.form.get('direccion1')?.value,
        dni: this.form.get('dni')?.value,
        email: this.form.get('email')?.value,
        estadoCivil: this.form.get('estadoCivil')?.value,
        ingresos: this.data,
        ip: null,
        nombres: this.form.get('nombres')?.value,
        numeroPartida: this.form.get('numeroPartida')?.value
          ? this.form.get('numeroPartida')?.value
          : null,
        primerApellido: this.form.get('primerApellido')?.value,
        segundoApellido: this.form.get('segundoApellido')?.value,
        telefono1: this.form.get('telefono1')?.value,
        terminos: this.terminos,
        // form conviviente ---
        cipConyuge: this.convivienteData.formConviviente.cipConviviente
          ? this.convivienteData.formConviviente.cipConviviente
          : null,
        dniConyuge: this.convivienteData.formConviviente.dniConviviente
          ? this.convivienteData.formConviviente.dniConviviente
          : null,
        ingresosConyuge: this.convivienteData.dataConviviente
          ? this.convivienteData.dataConviviente
          : null,
        nombresConyuge: this.convivienteData.formConviviente.nombreConviviente
          ? this.convivienteData.formConviviente.nombreConviviente
          : null,
        primerApellidoConyuge: this.convivienteData.formConviviente
          .primerApellidoConviviente
          ? this.convivienteData.formConviviente.primerApellidoConviviente
          : null,
        segundoApellidoConyuge: this.convivienteData.formConviviente
          .segundoApellidoConviviente
          ? this.convivienteData.formConviviente.segundoApellidoConviviente
          : null,
        captcha: this.valueCaptcha ? this.valueCaptcha : null,
      };
    }
    if (
      this.estadoRegister == '1' ||
      this.estadoRegister == '3' ||
      this.estadoRegister == '4'
    ) {
      this.dataTotal = {
        cip: this.form.get('cip')?.value,
        direccion1: this.form.get('direccion1')?.value,
        dni: this.form.get('dni')?.value,
        email: this.form.get('email')?.value,
        estadoCivil: this.form.get('estadoCivil')?.value,
        ingresos: this.data,
        ip: null,
        nombres: this.form.get('nombres')?.value,
        numeroPartida: this.form.get('numeroPartida')?.value
          ? this.form.get('numeroPartida')?.value
          : null,
        primerApellido: this.form.get('primerApellido')?.value,
        segundoApellido: this.form.get('segundoApellido')?.value,
        telefono1: this.form.get('telefono1')?.value,
        terminos: this.terminos,
        // form coyuge ---
        cipConyuge: null,
        dniConyuge: null,
        ingresosConyuge: null,
        nombresConyuge: null,
        primerApellidoConyuge: null,
        segundoApellidoConyuge: null,
        captcha: this.valueCaptcha ? this.valueCaptcha : null,
      };
    }
  }

  modalInfo(mensaje: string) {
    (this.dialogRef = this.dialog.open(ModalInvalidFormCoyugeComponent, {
      width: '450px',
      panelClass: 'modal-Info',
      data: {
        title: 'Info',
        message: mensaje,
      },
    })),
      this.dialogRef.afterClosed().subscribe(() => {
        // this.cleanFormulario();
        // this.form.get('dni')!.setValue('');
        window.location.reload();
      });
  }

  modalSuccessInscription(data: string) {
    this.loading = false;
    this.dialogRef = this.dialog.open(ModalSuccesInscriptionComponent, {
      width: '450px',
      panelClass: 'modal-succes',
      data: {
        title: 'Exitoso',
        nombres: data,
      },
    });
    this.dialogRef.afterClosed().subscribe(() => {
      this.cleanFormulario();
      this.form.get('dni')!.setValue('');
      window.location.reload();
    });
  }

  msotarModalError() {
    this.dialogRef = this.dialog.open(ModalsErrorComponent, {
      width: '450px',
      panelClass: 'modal-succes',
      data: {
        title: 'Error',
      },
    });
    this.dialogRef.afterClosed().subscribe(() => {
      this.cleanFormulario();
      this.form.get('dni')!.setValue('');
      window.location.reload();
    });
  }

  cleanFormulario() {
    this.form.reset();
    this.datos = true;
    this.nombres = '';
    this.primerApellido = '';
    this.segundoApellido = '';
  }
}
