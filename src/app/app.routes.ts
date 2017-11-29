import {Routes} from "@angular/router";

//Gueards
import {AuthenticatedGuard} from "./app.guards"

import { blankComponent, 
         basicComponent,
         error404Component,
         // mainViewComponent,
         // minorViewComponent,
         loginComponent,
         registerComponent,
         logoutComponent,
         // resetComponent,
         // resetConfirmComponent 
       } from "./components"

import {  } from "./components";


export const ROUTES:Routes = [
  // Main redirect
  {path: '', redirectTo: 'login', pathMatch: 'full'},

  // App views
  // {
  //   path: '', component: basicComponent,
  //   canActivate: [AuthenticatedGuard],
  //   children: [
  //     {path: 'dashboard', component: mainViewComponent},
  //     {path: 'minorView', component: minorViewComponent},
  //   ]
  // },
  {
    path: '', component: blankComponent,
    resolve: [AuthenticatedGuard],
    children: [
      { path: 'login', component: loginComponent},
      { path: 'register', component: registerComponent },
      // { path: 'reset', component: resetComponent },
      // { path: 'passwordresetconfirm/:uid/:token', component: resetConfirmComponent},
    ]
  },
  {
    path: '', component: blankComponent,
    children: [
      { path: 'logout', component: logoutComponent },
      { path: '404', component: error404Component }
    ]
  },

  // Handle all other routes
  {path: '**', redirectTo: '/404'}
];
