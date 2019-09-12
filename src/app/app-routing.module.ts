import { PageNotFoundComponent } from './shared/page-not-found/page-not-found.component';
import { AboutAsPageComponent } from './contents/about-as-page/about-as-page.component';
import { MainPageComponent } from './contents/main-page/main-page.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  { path: '', redirectTo: '/strona-glowna', pathMatch: 'full' },
  { path: 'strona-glowna', component: MainPageComponent },
  { path: 'o-nas', component: AboutAsPageComponent },
  { path: 'not-found', component: PageNotFoundComponent },
  { path: '**', redirectTo: '/not-found' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})

export class AppRoutingModule {}

