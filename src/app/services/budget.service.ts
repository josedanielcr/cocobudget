import {effect, Injectable, signal, WritableSignal} from '@angular/core';
import {environment} from '../../environments/environment';
import {HttpClient} from '@angular/common/http';
import {map, Observable} from 'rxjs';
import {Result} from '../models/Result';
import {Folder} from '../models/business/Folder';
import {CreateFolderRequest} from '../shared/models/account/CreateFolderRequest';
import {AccountService} from './account.service';
import {Period} from '../models/business/Period';
import {CreatePeriodRequest} from '../shared/models/period/CreatePeriodRequest';

@Injectable({
  providedIn: 'root'
})
export class BudgetService {

  private readonly _budgetServiceEndpoint = environment.budgetService;
  private readonly _folderServicePrefix = 'folder';
  private readonly _periodServicePrefix = 'period';

  folders : WritableSignal<Folder[] | null> =  signal<Folder[] | null>(null);
  private userFoldersEffect = effect(() => {
    const user = this.accountService.user();
    if (user) {
      this.getUserFolders(user.id).subscribe({
        error : (error : Result<Folder[]>) => {
          this.folders.update(() => []);
        }
      });
    }
  });

  constructor(private httpClient : HttpClient,
              private accountService : AccountService) { }

  public createFolder(createFolderRequest : CreateFolderRequest) : Observable<Result<Folder>>{
    return this.httpClient.post(`${this._budgetServiceEndpoint}${this._folderServicePrefix}`, createFolderRequest)
      .pipe(
        map((response: any)=> {
          const folderResult = response as Result<Folder>;
          this.folders.update((currentFolders) =>
            folderResult.value
              ? [...(currentFolders ?? []), folderResult.value]
              : currentFolders
          );
          return folderResult;
        })
      );
  }

  public getUserFolders(userId : string) : Observable<Result<Folder[]>>{
    return this.httpClient.get(`${this._budgetServiceEndpoint}${this._folderServicePrefix}/${userId}`)
      .pipe(
        map((response: any)=> {
          const folders = response as Result<Folder[]>;
          this.folders.update(value => folders.value);
          return folders;
        })
      );
  }

  public createPeriod(createPeriodRequest : CreatePeriodRequest) : Observable<Result<Period>>{
    return this.httpClient.post(`${this._budgetServiceEndpoint}${this._periodServicePrefix}`, createPeriodRequest)
      .pipe(
        map((response: any)=> {
          return response as Result<Period>;
        })
      );
  }
}
