import {CUSTOM_ELEMENTS_SCHEMA, NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import {AppComponent} from './app.component';
import {HeaderComponent} from './shared/layoud/header/header.component';
import {FooterComponent} from './shared/layoud/footer/footer.component';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {MaterialModule} from "./shared/material/material.module";
import {RECAPTCHA_SETTINGS, RecaptchaFormsModule, RecaptchaModule} from "ng-recaptcha";
import {environment} from "../environments/environment";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {FormularioComponent} from './components/formulario/formulario.component';
import {OnlyNumberDirective} from "./shared/helper/only-number.directive";
import {HttpClientModule} from "@angular/common/http";
import {NgxMaskModule} from "ngx-mask";
import { FormConyugeComponent } from './components/form-conyuge/form-conyuge.component';
import {OnlyLettersDirective} from "./shared/helper/only-letters.directive";
import {ModalsModule} from "./shared/components/modals/modals.module";
import {OnlyAlphaNumberDirective} from "./shared/helper/only-alphanumeric.directive";
import { SpinnerComponent } from './shared/components/spinner/spinner.component';
import { FormConvivienteComponent } from './components/form-conviviente/form-conviviente.component';


@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
    FormularioComponent,
    FormConyugeComponent,
    SpinnerComponent,
    FormConvivienteComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    MaterialModule,
    ReactiveFormsModule,
    FormsModule,
    RecaptchaModule,
    HttpClientModule,
    OnlyNumberDirective,
    OnlyLettersDirective,
    OnlyAlphaNumberDirective,
    NgxMaskModule.forRoot(),
    ModalsModule,
    RecaptchaModule,
    RecaptchaFormsModule
  ],

  providers: [
    {
      provide: RECAPTCHA_SETTINGS,
      useValue: {siteKey: environment.key.recaptcha}
    },
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  bootstrap: [AppComponent]
})
export class AppModule {
}
