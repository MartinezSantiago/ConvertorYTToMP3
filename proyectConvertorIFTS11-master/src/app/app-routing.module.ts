import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import {
  redirectUnauthorizedTo,
  redirectLoggedInTo,
  canActivate,
} from '@angular/fire/auth-guard';

const redirectUnauthorizedToLogin = () => redirectUnauthorizedTo(['']);
const redirectLoggedInToHome = () => redirectLoggedInTo(['convertidor-youtube']);

const routes: Routes = [
  {
    path: '',
    loadChildren: () =>
      import('./login/login.module').then((m) => m.LoginPageModule),
    ...canActivate(redirectLoggedInToHome),
  },
   {
    path: 'convertidor-youtube',
    loadChildren: () =>
      import('./convertidor-youtube/convertidor-youtube.module').then((m) => m.ConvertidorYoutubePageModule),
    ...canActivate(redirectUnauthorizedToLogin),
  },{
    path: 'register',
    loadChildren: () =>
      import('./register/register.module').then((m) => m.RegisterPageModule),
    ...canActivate(redirectLoggedInToHome),
  }, {

    path: 'convertor-tasa-de-cambio',
    loadChildren: () =>
    import('./convertor-tasa-de-cambio/convertor-tasa-de-cambio.module').then((m) => m.ConvertorTasaDeCambioPageModule),
  ...canActivate(redirectUnauthorizedToLogin),
   },{
    path: 'perfil',
    loadChildren: () =>
      import('./perfil/perfil.module').then((m) => m.PerfilPageModule),
    ...canActivate(redirectUnauthorizedToLogin),
  },
  {
    path: '**',
    redirectTo: '',
    pathMatch: 'full',
  },{
    path: 'convertidor-youtube',
    loadChildren: () => import('./convertidor-youtube/convertidor-youtube.module').then( m => m.ConvertidorYoutubePageModule)
  },
 
  {
    path: 'register',
    loadChildren: () => import('./register/register.module').then( m => m.RegisterPageModule)
  },
  {
    path: 'convertor-tasa-de-cambio',
    loadChildren: () => import('./convertor-tasa-de-cambio/convertor-tasa-de-cambio.module').then( m => m.ConvertorTasaDeCambioPageModule)
  },
  {
    path: 'perfil',
    loadChildren: () => import('./perfil/perfil.module').then( m => m.PerfilPageModule)
  },

];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules }),
  ],
  exports: [RouterModule],
})
export class AppRoutingModule {}