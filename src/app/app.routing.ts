// Importaciones necesarias
import { ModuleWithProviders } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

// Importaciones de las componentes
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { HomeComponent } from './components/home/home.component';
import { ErrorComponent } from './components/error/error.component';
import { UserEditComponent } from './components/user-edit/user-edit.component';
import { CategoryNewComponent } from './components/category-new/category-new.component';

// Definicion de rutas
const appRoutes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'inicio', component: HomeComponent },
  { path: 'login', component: LoginComponent },
  { path: 'logout/:exit', component: LoginComponent },
  { path: 'registro', component: RegisterComponent },
  { path: 'ajustes', component: UserEditComponent },
  { path: 'crear-categoria', component: CategoryNewComponent },
  { path: '**', component: ErrorComponent },
  // Con los dobles asteriscos '**' nos referimos a todas las rutas posibles salvo las anteriores
  // Es importante que la ruta '**' sea la ultima
];

// Exportaciones de la configuracion
export const appRoutingProviders: any[] = [];
export const routing: ModuleWithProviders<any> = RouterModule.forRoot( appRoutes );
