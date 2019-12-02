import { Address } from './address.model';
import { from } from 'rxjs';

export class User {
  // jak w konstruktorze podamy tak właściowći to możemy to wykorzystywąć tak
  // jakbyśmy utworzyli klasę typu user jest taki skrót wykorzystywany przez typescript

  constructor(
    public email: string,
    public id: string,
    // tslint:disable-next-line: variable-name
    private _token?: string,
    // tslint:disable-next-line: variable-name
    private _tokenExpirationDate?: Date,
    public nickName: string = '',
    public name: string = '',
    public lastName: string = '',
    public phones: number[] = [],
    public birthday: string = '',
    public street: string = '',
    public streetNumber: string = '',
    public city: string = '',
    public postCode: string = '',
    public country: string = ''
    ) {}

    // geter to specjaly sposób dostępu do włąściowści, jak ustawiemy pole jako
    // prywatne to można je utowrzyc przy tworzeniu obiektu typu user
    // a dostać sie możemy przez tylko specjalne funkcje typu get i set
    get token() {
      // sprawdzenie czy token istnieje i czy nie jest wygasły domyślnie API firebase ustawia 1h
      if (!this._tokenExpirationDate || new Date() > this._tokenExpirationDate) {
        return null;
      }
      return this._token;
    }
}
