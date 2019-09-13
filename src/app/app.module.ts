import { ReactiveFormsModule } from '@angular/forms';
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
import { ArticleTemplateComponent } from './contents/article-template/article-template.component';
import { PageNotFoundComponent } from './shared/page-not-found/page-not-found.component';
import { AppRoutingModule } from './app-routing.module';
import { DockPageComponent } from './contents/dock-page/dock-page.component';
import { QuillModule } from 'ngx-quill';




@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    LogoComponent,
    TopbarComponent,
    MainSlidershowComponent,
    ShowCaseComponent,
    MainPageComponent,
    AboutAsPageComponent,
    ArticleTemplateComponent,
    PageNotFoundComponent,
    DockPageComponent
  ],
  imports: [
    BrowserModule,
    ReactiveFormsModule,
    MDBBootstrapModule.forRoot(),
    AppRoutingModule,
    QuillModule.forRoot()
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
