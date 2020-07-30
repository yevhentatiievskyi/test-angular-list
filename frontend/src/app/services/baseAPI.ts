import {Observable} from 'rxjs';

export interface BaseAPIService<T> {
  readonly data: Observable<T[]>;
  fetch(options: any): void;
  create(newItem: any): Observable<any>;
  update(id: string, data: any): any;
  delete(id: string): any;
}
