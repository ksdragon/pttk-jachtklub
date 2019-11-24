import { AlertComponent } from './shared/alert/alert.component';
import { PlaceholderDirective } from './shared/placeholder/placeholder.derective';
import { EditorLayoutComponent } from './extrasCopmonent/editor/editor-layout/editor-layout.component';
import { EditorPageComponent } from './extrasCopmonent/editor/editor-page/editor-page.component';
import {NgPipesModule} from 'ngx-pipes';

import { EditorComponent } from './extrasCopmonent/editor/editor.component';
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
import { EditorViewLayoutComponent } from './extrasCopmonent/editor/editor-view-layout/editor-view-layout.component';
import { EditorViewArticleComponent } from './extrasCopmonent/editor/editor-view-article/editor-view-article.component';
import { ModalViewLayoutComponent } from './extrasCopmonent/editor/modal-view-layout/modal-view-layout.component';
import { HttpClientModule } from '@angular/common/http';
import { LoadingSpinnerComponent } from './shared/loading-spinner/loading-spinner.component';
import { environment } from '../environments/environment';
import { AngularFireModule } from '@angular/fire';
import { AngularFirestoreModule } from '@angular/fire/firestore';
import { AngularFireDatabaseModule } from '@angular/fire/database';
import {NgxPaginationModule} from 'ngx-pagination';
import { ArticlesContentComponent } from './extrasCopmonent/articles-content/articles-content.component';
import { AuthComponent } from './auth/auth.component';
import { AngularFireAuthModule } from '@angular/fire/auth';
import { AuthFireComponent } from './auth-fire/auth-fire.component';
import { ProfileUserComponent } from './contents/profile-user/profile-user.component';


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
    EditorPageComponent,
    EditorLayoutComponent,
    EditorViewLayoutComponent,
    EditorViewArticleComponent,
    ModalViewLayoutComponent,
    LoadingSpinnerComponent,
    ArticlesContentComponent,
    AuthComponent,
    PlaceholderDirective,
    AlertComponent,
    AuthFireComponent,
    ProfileUserComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpClientModule,
    ReactiveFormsModule,
    MDBBootstrapModule.forRoot(),
    AppRoutingModule,
    AppQuillModule,
    NgPipesModule,
    AngularFireModule.initializeApp(environment.firebase),
    AngularFirestoreModule,
    AngularFireDatabaseModule,
    NgxPaginationModule,
    AngularFireAuthModule,
  ],
  entryComponents: [ ModalViewLayoutComponent, AlertComponent ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
