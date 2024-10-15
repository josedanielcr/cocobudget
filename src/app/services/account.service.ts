import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import {HttpClient} from '@angular/common/http';
import {map, Observable} from 'rxjs';
import {Result} from '../models/Result';
import {isUserRegisteredResponse} from '../shared/models/account/isUserRegisteredResponse';

@Injectable({
  providedIn: 'root'
})
export class AccountService {

  private readonly _accountServiceEndpoint = environment.accountService;
  private readonly _accountServicePrefix = 'user/';

  constructor(private httpClient : HttpClient ) { }

  public checkIfUserRegistered(email: string) : Observable<Result<isUserRegisteredResponse>>{
    return this.httpClient.get(`${this._accountServiceEndpoint}${this._accountServicePrefix}/is-registered/${email}`)
      .pipe(
        map((response: any)=> response as Result<isUserRegisteredResponse>)
      );
  }
}
