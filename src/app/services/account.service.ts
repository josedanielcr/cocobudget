import {Injectable, signal, Signal, WritableSignal} from '@angular/core';
import { environment } from '../../environments/environment';
import {HttpClient} from '@angular/common/http';
import {map, Observable} from 'rxjs';
import {Result} from '../models/Result';
import {isUserRegisteredResponse} from '../shared/models/account/isUserRegisteredResponse';
import {CreateUserRequest} from '../shared/models/account/CreateUserRequest';
import {User} from '../models/business/User';

@Injectable({
  providedIn: 'root'
})
export class AccountService {

  private readonly _accountServiceEndpoint = environment.accountService;
  private readonly _accountServicePrefix = 'user';
  userEmail : WritableSignal<string> = signal('');
  user : WritableSignal<User | null> = signal(null);

  constructor(private httpClient : HttpClient ) { }

  public checkIfUserRegistered(email: string) : Observable<Result<isUserRegisteredResponse>>{
    this.userEmail.set(email);
    return this.httpClient.get(`${this._accountServiceEndpoint}${this._accountServicePrefix}/is-registered/${email}`)
      .pipe(
        map((response: any)=> response as Result<isUserRegisteredResponse>)
      );
  }

  public setupUser(createUserRequest : CreateUserRequest) : Observable<Result<User>>{
    return this.httpClient.post(`${this._accountServiceEndpoint}${this._accountServicePrefix}`, createUserRequest)
      .pipe(
        map((response: any)=> {
          const userResult : Result<User> = response as Result<User>;
          this.user.set(userResult.value);
          return userResult;
        })
      );
  }
}
