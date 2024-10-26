import { Injectable } from '@angular/core';
import {environment} from '../../environments/environment';
import {HttpClient} from '@angular/common/http';
import {map, Observable} from 'rxjs';
import {Result} from '../models/Result';
import {Folder} from '../models/business/Folder';
import {CreateFolderRequest} from '../shared/models/account/CreateFolderRequest';

@Injectable({
  providedIn: 'root'
})
export class BudgetService {
  private readonly _budgetServiceEndpoint = environment.budgetService;
  private readonly _folderServicePrefix = 'folder';

  constructor(private httpClient : HttpClient) { }

  public createFolder(createFolderRequest : CreateFolderRequest) : Observable<Result<Folder>>{
    return this.httpClient.post(`${this._budgetServiceEndpoint}${this._folderServicePrefix}`, createFolderRequest)
      .pipe(
        map((response: any)=> response as Result<Folder>)
      );
  }

  public getUserFolders(userId : string) : Observable<Result<Folder[]>>{
    return this.httpClient.get(`${this._budgetServiceEndpoint}${this._folderServicePrefix}/${userId}`)
      .pipe(
        map((response: any)=> response as Result<Folder[]>)
      );
  }
}
