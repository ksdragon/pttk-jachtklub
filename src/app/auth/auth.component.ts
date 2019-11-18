import { AlertComponent } from './../shared/alert/alert.component';
import { PlaceholderDirective } from './../shared/placeholder/placeholder.derective';
import { AuthRensponseData, AuthService } from './auth.service';
import { NgForm } from '@angular/forms';
import { Component, OnInit, ComponentFactoryResolver, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { Observable, Subscription } from 'rxjs';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.scss']
})
export class AuthComponent implements OnInit {

  isLoginMode = true;
  isLoading = false;
  error: string = null;
  @ViewChild(PlaceholderDirective, {static: false}) alertHost: PlaceholderDirective;
  private closeSub: Subscription;

  constructor(private authService: AuthService,
              private router: Router,
              // class to create component
              private componentFactoryResolver: ComponentFactoryResolver) { }

  ngOnInit() {
  }

  onSwitchMode() {
    // reverse value zmiania wartośc true -  false.
    this.isLoginMode = !this.isLoginMode;
  }

  onSubmit(form: NgForm) {
    // ponowne sprawdzenie walidacji.
    if (!form.valid) {
      return;
    }
    const emali = form.value.email;
    const password = form.value.password;
    // utworzenie zmiennej typu observable typu AuthRensponseData
    // w celu subskrybowania powtarzającej się logiki.
    let authObs: Observable<AuthRensponseData>;

    this.isLoading = true;
    if (this.isLoginMode) {
      // logowanie
      authObs = this.authService.login(emali, password);

    } else {
      // sing up
      authObs = this.authService.singup(emali, password);
    }

    // przypisanie logiki do zmiennej obs.
    authObs.subscribe(respData => {
      console.log(respData);
      this.isLoading = false;
      // po zalogowaniu autentykacji przekierowuje nas do:
      this.router.navigate(['/edytor']);
    },
      // errorMessage jest wzięty z authServise tam przygotowany za pomocą catchError
      // z biblioteki rxjs
      errorMessage => {
        console.log(errorMessage);
        this.error = errorMessage;
        // this.showErrorAlert(errorMessage);
        this.isLoading = false;
      });
    form.reset();
  }

  private showErrorAlert(message: string) {
    // this approach is not correct
    // const alertCmp = new AlertComponent();

    // obiekt Component Factory umożliwiający tworzenie komponentu.
    const alertComFactory = this.componentFactoryResolver.resolveComponentFactory(AlertComponent);

    // obiekt całego contenera - musimy wiedzić gdzie chcemy utowrzyć component
    // używjać ViewChild i stworzonej darektywy
    // derektywa daje nam referencje do miejsca gdzie jest użyta.
    const hostViewContainerRef =  this.alertHost.viewContainerRef;
    hostViewContainerRef.clear();

    const componentRef = hostViewContainerRef.createComponent(alertComFactory);
    componentRef.instance.message = message;
    this.closeSub = componentRef.instance.close.subscribe(
      () => {
        this.closeSub.unsubscribe();
        hostViewContainerRef.clear();
      }
    );

}

}
