import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MainRoutingModule } from './main-routing.module';
import { MainComponent } from './main.component';
import { SummaryComponent } from './summary/summary.component';
import { ComponentsModule } from '../../components/components.module';
import { InfiniteScrollModule } from 'ngx-infinite-scroll';

@NgModule({
  declarations: [MainComponent, SummaryComponent],
  imports: [
    CommonModule,
    MainRoutingModule,
    ComponentsModule,
    InfiniteScrollModule,
  ],
})
export class MainModule {}
