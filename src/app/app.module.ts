import { TopbarComponent } from './header/topbar/topbar.component';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { MDBBootstrapModule } from 'angular-bootstrap-md';

import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { LogoComponent } from './header/logo/logo.component';
import { MainSlidershowComponent } from './extrasCopmonent/main-slidershow/main-slidershow.component';
import { ShowCaseComponent } from './extrasCopmonent/show-case/show-case.component';
import { MainPageComponent } from './contents/main-page/main-page.component';
import { AboutAsPageComponent } from './contents/about-as-page/about-as-page.component';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    LogoComponent,
    TopbarComponent,
    MainSlidershowComponent,
    ShowCaseComponent,
    MainPageComponent,
    AboutAsPageComponent
  ],
  imports: [
    BrowserModule,
    MDBBootstrapModule.forRoot()
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
