import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { EventDetailRoutingModule } from './event-detail-routing.module';
import { EventDetailComponent } from './event-detail/event-detail.component';
import { MatMenuModule } from '@angular/material/menu';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatTabsModule } from '@angular/material/tabs';

@NgModule({
  declarations: [EventDetailComponent],
  imports: [
    CommonModule,
    EventDetailRoutingModule,
    MatMenuModule,
    MatIconModule,
    MatButtonModule,
    MatTabsModule,
  ],
})
export class EventDetailModule {}
