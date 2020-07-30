import {AfterViewInit, Component, Input, TemplateRef, ViewChild} from '@angular/core';
import { MatTable } from '@angular/material/table';
import {BaseDataSourceService} from '../../../dataSources/base-data-source.service';
import {DynamicFilter} from '../../helpers/dynamic-filter';

@Component({
  selector: 'app-data-table',
  templateUrl: './data-table.component.html',
  styleUrls: ['./data-table.component.scss']
})
export class DataTableComponent implements AfterViewInit {
  @ViewChild(MatTable) table: MatTable<any>;
  @Input() dataSource: BaseDataSourceService<any>;
  @Input() actionsTemplate: TemplateRef<any>;
  @Input() filter: DynamicFilter;

  ngAfterViewInit(): void {
    this.table.dataSource = this.dataSource;
  }
}
