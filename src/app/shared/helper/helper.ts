import {AbstractControl, ValidatorFn} from "@angular/forms";


export function getfieldMessage(field: string, control: AbstractControl) {
  if (!control.get(field)) return null;
  const errors = control.get(field)!.errors || {};
  for (const key of Object.keys(errors)) {
    switch (key) {
      case 'required':
        return `Estes campo ${field}  es requerido`;
      case 'minlength':
        return `Se requiere mínimo ${errors['minlength'].requiredLength} caracters`;
      case 'maxlength':
        return `Se requiere maximo ${errors['maxlength'].requiredLength} caracters`;
      case 'email':
        return `Se requiere ingresar un correo valido`;
    }
  }
  return null;
}

// FUNCION PARA VALIDAR SI LOS 8 DIGITOS DEL DNI SE REPITEN
export function dniRepetidoValidator(): ValidatorFn {
  return (control: AbstractControl): { [key: string]: any } | null => {
    const dni: string = control.value;

    if (dni && dni.length === 8) {
      for (let i = 0; i <= 7; i++) {
        if (dni.charAt(i) === dni.charAt(i + 1) &&
          dni.charAt(i) === dni.charAt(i + 2) &&
          dni.charAt(i) === dni.charAt(i + 3)) {
          return {dniRepetido: true};
        }
      }
    }
    return null;
  };
}


export function completarConCerosValidator(): ValidatorFn {
  return (control: AbstractControl): { [key: string]: any } | null => {
    const valor: string = control.value;
    if (valor && valor.length === 6) {
      const numero = parseInt(valor, 10);
      if (!isNaN(numero)) {
        // Completar con ceros a la izquierda si el número tiene menos de 6 dígitos
        const numeroFormateado = numero.toString().padStart(8, '0');
        control.setValue(numeroFormateado, {emitEvent: false}); // Actualizar el valor en el control
      }
    }

    return null; // No hay errores de validación
  };
}



export function anyToBoolean(value:any) {
  if(value == null || value ==''){
    return false
  }else{
    return true
  }


}




