import { Injectable } from '@angular/core';
import {IUserWithRole} from '../../../../shared/interfaces';
import {HttpClient, HttpParams} from '@angular/common/http';
import {BehaviorSubject, Observable} from 'rxjs';
import {BaseAPIService} from './baseAPI';

@Injectable({
  providedIn: 'root'
})
export class UserServiceService implements BaseAPIService<IUserWithRole> {
  private subject: BehaviorSubject<IUserWithRole[]> = new BehaviorSubject<IUserWithRole[]>([]);

  constructor(private client: HttpClient) { }

  get data(): Observable<IUserWithRole[]>{
    return this.subject.asObservable();
  }

  byId(id: string): any {
  }

  delete(id: string): Observable<any> {
    return this.client.delete(`/API/users/${id}`);
  }

  fetch(options: any): any {
    const { pageSize = 100, pageIndex = 0, filter = {} } = options;
    let params = new HttpParams().set('limit', pageSize).set('offset', `${pageSize * pageIndex}`);
    params = Object.entries(filter).reduce((acc, [ key, value]) => {
      return value ? acc.set(key, `${value}`) : acc;
    }, params);
    this.client.get<IUserWithRole[]>('/API/users', { params })
      .subscribe((data: IUserWithRole[]) => this.subject.next(data));
  }

  update(id: string, data: any): any {
  }
}
