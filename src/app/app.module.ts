import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { routing, appRoutingProviders } from './app.routing';

import { AppComponent } from './app.component';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';

@NgModule({

  declarations: [
    AppComponent,
    LoginComponent,
    RegisterComponent
  ],

  // Modulos
  imports: [
    BrowserModule,
    routing
  ],

  // Servicios
  providers: [
    appRoutingProviders
  ],

  bootstrap: [AppComponent]

})
export class AppModule { }
