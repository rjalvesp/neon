import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ContainerComponent } from './container/container.component';
import { CardComponent } from './card/card.component';

@NgModule({
  declarations: [CardComponent, ContainerComponent],
  imports: [CommonModule],
  exports: [CardComponent, ContainerComponent],
})
export class ComponentsModule {}
