import { NgModule }              from '@angular/core';
import { RouterModule, Routes }  from '@angular/router';

import { AuthComponent } from './auth/auth.component';
import { DiscoverComponent } from './discover/discover.component';
import { NewsfeedComponent } from './newsfeed/newsfeed.component';
import { ProfileComponent } from './profile/profile.component';

const appRoutes: Routes = [
  { path: 'discover', component: DiscoverComponent },
  { path: 'feed',        component: NewsfeedComponent },
  { path: 'profile',        component: ProfileComponent },
  { path: 'login',        component: AuthComponent },  
  { path: '',   redirectTo: '/feed', pathMatch: 'full' }
  // { path: '**', component: PageNotFoundComponent } TODO: error pages
];

@NgModule({
  imports: [
    RouterModule.forRoot(appRoutes)
  ],
  exports: [
    RouterModule
  ]
})
export class AppRoutingModule {}