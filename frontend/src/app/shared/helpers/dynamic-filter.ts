import {BehaviorSubject, Observable} from 'rxjs';

export class DynamicFilter {
  private v: BehaviorSubject<any> = new BehaviorSubject<any>({});

  get changes(): Observable<any>{
    return this.v.asObservable();
  }

  get value(): any {
    return this.v.value;
  }

  set values(newItem: any){
    this.v.next({...this.v.value, ...newItem});
  }
}
