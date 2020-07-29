import { Injectable } from '@angular/core';
import {BehaviorSubject, Observable} from 'rxjs';
import {HttpClient} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class RolesDataSourceService {
  private subject: BehaviorSubject<any[]> = new BehaviorSubject<any[]>([]);

  constructor(private client: HttpClient) { }

  get data(): Observable<any[]>{
    return this.subject.asObservable();
  }

  byId(id: string): any {
  }

  delete(id: string): any {
  }

  fetch(): any {
    this.client.get<any[]>('/API/roles')
      .subscribe((data: any[]) => this.subject.next(data));
  }

  update(id: string, data: any): any {
  }
}
