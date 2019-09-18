import { ReactiveFormsModule, FormsModule } from '@angular/forms';
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
import { AppQuillModule } from './app-quill.module';
import { EditorComponent } from './extrasCopmonent/editor/editor.component';


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
    DockPageComponent,
    EditorComponent,

  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    MDBBootstrapModule.forRoot(),
    AppRoutingModule,
    AppQuillModule

  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
