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
      this.filter.changes
    ];

    this.changesSubscription = merge(...changes).subscribe(() => {
      this.service.fetch({filter: this.filter.value });
    });

    return this.service.data.pipe((map((data) => data.map((i: T) => dot(i)))));
  }

  disconnect(): void {
    this.changesSubscription.unsubscribe();
  }
}
