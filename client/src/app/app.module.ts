import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { ProfileComponent } from './profile/profile.component';
import { DiscoverComponent } from './discover/discover.component';
import { NewsfeedComponent } from './newsfeed/newsfeed.component';
import { AuthComponent } from './auth/auth.component';
import { ArticleCardComponent } from './shared/article-card/article-card.component';

@NgModule({
  declarations: [
    AppComponent,
    ProfileComponent,
    DiscoverComponent,
    NewsfeedComponent,
    AuthComponent,
    ArticleCardComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
