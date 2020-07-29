import {Observable} from 'rxjs';

export interface BaseAPIService<T> {
  readonly data: Observable<T[]>;
  fetch(options: any): void;
  byId(id: string): Observable<T>;
  update(id: string, data: any): any;
  delete(id: string): any;
}
