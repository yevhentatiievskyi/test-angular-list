import { Injectable } from '@angular/core';
import {DataSource} from '@angular/cdk/collections';
import {BehaviorSubject, merge, Observable, Subscription} from 'rxjs';
import {flatMap, map} from 'rxjs/operators';
import {MatPaginator} from '@angular/material/paginator';
import {BaseAPIService} from '../services/baseAPI';
import { dot } from 'dot-object';
import {DynamicFilter} from '../shared/helpers/dynamic-filter';

@Injectable({
  providedIn: 'root'
})
export abstract class BaseDataSourceService<T> extends DataSource<T>{
  data: T[] = [];
  paginator: MatPaginator;
  filter: DynamicFilter = new DynamicFilter();
  abstract columns: string[];
  private changesSubscription: Subscription;
  private refetchSubject: BehaviorSubject<any> = new BehaviorSubject<any>(null);

  protected constructor(private service: BaseAPIService<T>) {
    super();
  }

  public refetch(): void {
    this.refetchSubject.next(null);
  }

  connect(): Observable<T[]> {
    const changes = [
      this.refetchSubject.asObservable(),
      this.paginator.page,
      this.filter.changes
    ];

    this.changesSubscription = merge(...changes).subscribe(() => {
      const { pageSize, pageIndex } = this.paginator;
      this.service.fetch({filter: this.filter.value, pageIndex, pageSize });
    });

    return this.service.data.pipe((map((data) => {
      this.data = data.map((i: T) => dot(i));
      return this.data;
    })));
  }

  disconnect(): void {
    this.changesSubscription.unsubscribe();
  }
}
