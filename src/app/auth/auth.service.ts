import { environment } from './../../environments/environment';
import { Router } from '@angular/router';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable, ErrorHandler } from '@angular/core';
// tap - pozwala na wykonanie jakiegoś kodu bez zmiany odpowiedzi z servera.
import { catchError, tap } from 'rxjs/operators';
// operator króry przechwytuje błędy jest typu obserable jak każdy z tej biblioteki.
import { throwError, BehaviorSubject } from 'rxjs';
import { User } from '../shared/user.model';

// interfejs zgodnie z tym co zwraca baza firebase potrzebny do sing up.
export interface AuthRensponseData {
  kind: string;
  idToken: string;
  email: string;
  refreshToken: string;
  expiresIn: string;
  localId: string;
  // dodatkowe pole potrzebne do login
  registered?: string;
}


@Injectable({providedIn: 'root'})
export class AuthService {

  // zieniamy z Subject do BehaviorSubject - powoduje to ro że mamy dostęp do tej zmiennej
  // nie w chwili jak jakaś metoda wywoła next ale cały czas nie zależnie od czasu emisj.
  // tzn mamy dostęp do właściości tego obiektu np Daty która została wygenerowna.
  user = new BehaviorSubject<User>(null);

  // zmienna do autoLogout czy został już wylogowany.
  private tokenExperationTimer: any;

  constructor(private http: HttpClient,
              private router: Router) {}

  singup(email: string, password: string) {
    return this.http.post<AuthRensponseData>
      // link pobrany z dokumentacji api z firebase w ustawieniach
      // https://firebase.google.com/docs/reference/rest/auth#section-create-email-password
      ('https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=' + environment.fireBaseKeyAPI,
      // obiekt jaki oczekuje basa firebase zgodnie z dokumentacją.
    {
      email,
      password,
      returnSecureToken: true
    })
    // wykorzystanie własnej prywatnej metody do scentralizowania obsługi błędów
    // jest to zamiast anonimowej funkcji którą tutaj zastąpiliśmy
    // metoda przyjmuje obiekt typu HttpErrorResponse
    .pipe(catchError(this.handleError)
    // tap operator nie zmienie odpowiedzi z setwera ale pozwala na uruchomienie jakiegoś kodu
    // z wykorzystaniem danych z odpoweidzi.
    , tap( resData => {
      // API firebase przyjmuje expirationDate w jako TimeStamp więc musimy utworzyć datę wygaśnięcia w ms
      // new Date().getTime() to zwraca nam ile ms upłyneło od 1970 i do tego dadajemy czas jaki dostaliśmy z firebase
      // +resData.expiresIn -  z tego dostajemy czas życia obiektu w sekundach dlatego mnożymy to jeszcze przez 1000
      // żeby dostać milisekuny (+ zamienia na typ number) wszystko zwraca nam Datę jaką potrzebujemy.
      const expirationDate = new Date(new Date().getTime() + +resData.expiresIn * 1000);
      const user = new User(resData.email, resData.localId, resData.idToken, expirationDate);
      // emitujemy nasz obiekt.
      this.user.next(user);
      // przechowujemy użytkownika w localstorage przeglądarki
      localStorage.setItem('userData', JSON.stringify(user));
       // rejestrowanie auto Logout przy zalogowaniu expiresIn dostajem z servera.
      this.autoLogout(+resData.expiresIn * 1000);
    }));
  }

  login(email: string, password: string) {
    return this.http.post<AuthRensponseData>(
      'https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=' + environment.fireBaseKeyAPI,
    {
      email,
      password,
      returnSecureToken: true
    }
    // obsługa błędów bez metody prywatnej, można ją zastąpić metodą prywatną handleError
    // która jest poniżej i wykorzstywana przy sing up
    ).pipe(catchError( errorRes => {
      let errorMessage = 'An unknown error occurred';
      // sprawdzenie czy nie ma innych błędów (np sieciowych)
      // sprawdzenie czy istnieje taki obiek z taką włąściwością.
      if (!errorRes.error || !errorRes.error.error) {
        return throwError(errorMessage);
      }
      switch (errorRes.error.error.message) {
        case 'EMAIL_NOT_FOUND':
          errorMessage = 'This email or password is not correct';
          break;
        case 'INVALID_PASSWORD':
          errorMessage = 'This email or password is not correct';
          break;
        case 'USER_DISABLED':
        errorMessage = 'This email or password is not correct';
        break;
        default:
          errorMessage = 'An unknown error occurred';
      }

      return throwError(errorMessage);
    }),
    // wykorzystanie prywatnej metody handleAuthentication do obsługi logowania.
    // podobniej jak w przypadku catchError wykorzystujemy funkcje handleAuthentication()
    tap(
      resData => {
        this.handleAuthentication(resData.email, resData.localId, resData.idToken, +resData.expiresIn);
      }
    ));
  }

  logout() {
    this.user.next(null);
    this.router.navigate(['/auth']);
    // czyszczeni po wylogowaniu.
    localStorage.removeItem('userData');
    // sprawdzenie czy timer działa jak tak to go wyłącza.
    if (this.tokenExperationTimer) {
      clearTimeout(this.tokenExperationTimer);
    }
    this.tokenExperationTimer = null;
  }

  // zastosowany w app.comonent.ts przy ponownym załadowaniu strony
  autoLogin() {
    // pobranie User z LocalStorage rzutowanie na obiekt User
    // dodaenie do ngOnInit w app.componet.ts
    const userData: {
      email: string,
      id: string,
      _token: string,
      _tokenExpirationDate: string
    } = JSON.parse(localStorage.getItem('userData'));
    if (!userData) {
      return;
    }
    // utworzenie nowego usera z dancy z loclaStorage
    const loadedUser = new User(
      userData.email,
      userData.id,
      userData._token,
      new Date(userData._tokenExpirationDate));
    // sprawdzenie czy token jest valid czy nie wygasł
    if (loadedUser.token) {  // wywołanie metody z user.model.ts i sprawdzenie czy nie wygasł
      // emitowanie zmienej user
        this.user.next(loadedUser);
       // rejestrowanie auto Logout przy zalogowaniu expiresIn dostajem z servera.
        const experationDuration =
          new Date( userData._tokenExpirationDate).getTime() - new Date().getTime();
        this.autoLogout(experationDuration);
      }
  }

  // przypisujemy do metod po poprawnym zalogowaiu lub rejestracji.
  autoLogout(experationDuration: number) {
    // przypisujemy timera do zmiennej.
    this.tokenExperationTimer = setTimeout( () => {
      this.logout();
    } , experationDuration);
  }

  private handleAuthentication(email: string, userId: string, token: string, expiresIn: number) {
    const expirationDate = new Date(new Date().getTime() + expiresIn * 1000);
    const user = new User(
      email,
      userId,
      token,
      expirationDate);
    // emitujemy nasz obiekt.
    this.user.next(user);
    // dodanie usera do localStorage - autoLogin()
    localStorage.setItem('userData', JSON.stringify(user));
    // rejestrowanie auto Logout przy zalogowaniu expiresIn dostajem z servera.
    this.autoLogout(expiresIn * 1000);
  }

  private handleError(errorRes: HttpErrorResponse) {
    let errorMessage = 'An unknown error occurred';
      // sprawdzenie czy nie ma innych błędów (np sieciowych)
      // sprawdzenie czy istnieje taki obiek z taką włąściwością.
    if (!errorRes.error || !errorRes.error.error) {
        return throwError(errorMessage);
      }
    switch (errorRes.error.error.message) {
        case 'EMAIL_EXISTS':
        errorMessage = 'This email already exists';
      }
    return throwError(errorMessage);

  }
}
