import { EditorResolverService } from './extrasCopmonent/editor/editor-resolver.service';
import { AuthGuardService } from './auth-fire/auth.guard.service';
import { AuthComponent } from './auth/auth.component';
import { EditorViewArticleComponent } from './extrasCopmonent/editor/editor-view-article/editor-view-article.component';
import { ArticleTemplateComponent } from './contents/article-template/article-template.component';
import { PageNotFoundComponent } from './shared/page-not-found/page-not-found.component';
import { AboutAsPageComponent } from './contents/about-as-page/about-as-page.component';
import { MainPageComponent } from './contents/main-page/main-page.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DockPageComponent } from './contents/dock-page/dock-page.component';
import { AuthFireComponent } from './auth-fire/auth-fire.component';
import { ProfileUserComponent } from './contents/profile-user/profile-user.component';
import { ProfileResolverService } from './contents/profile-user/profile-resolver.service';

const routes: Routes = [
  { path: '', redirectTo: '/strona-glowna', pathMatch: 'full' },
  { path: 'strona-glowna', component: MainPageComponent },
  { path: 'o-nas', component: AboutAsPageComponent },
  { path: 'port', component: DockPageComponent },
  { path: 'profile', component: ProfileUserComponent, canActivate: [AuthGuardService], resolve: [ProfileResolverService] },
  { path: 'edytor', component: ArticleTemplateComponent, canActivate: [AuthGuardService], resolve: [ProfileResolverService] },
  { path: 'edytor/:id', component: ArticleTemplateComponent, canActivate: [AuthGuardService],
      resolve: [EditorResolverService] },
  { path: 'article/:id', component: EditorViewArticleComponent },
  { path: 'auth', component: AuthFireComponent},
  { path: 'not-found', component: PageNotFoundComponent },
  { path: '**', redirectTo: '/not-found' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})

export class AppRoutingModule {}

