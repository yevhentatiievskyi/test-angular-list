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

  create(newItem: any): Observable<any> {
    return this.client.post('/API/users', newItem);
  }

  get data(): Observable<IUserWithRole[]>{
    return this.subject.asObservable();
  }

  delete(id: string): Observable<any> {
    return this.client.delete(`/API/users/${id}`);
  }

  fetch(options: any): any {
    const { filter = {} } = options;
    let params = new HttpParams();
    params = Object.entries(filter).reduce((acc, [ key, value]) => {
      return value ? acc.set(key, `${value}`) : acc;
    }, params);
    this.client.get<IUserWithRole[]>('/API/users', { params })
      .subscribe((data: IUserWithRole[]) => this.subject.next(data));
  }

  update(id: string, data: any): any {
    return this.client.patch(`/API/users/${id}`, data);
  }

  checkEmail(email: string): Observable<any>{
    return this.client.get(`/API/users/check_email/${email}`);
  }
}
