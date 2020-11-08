import { FormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MaterialModule } from '../material.module';
import { FlexLayoutModule } from '@angular/flex-layout';

@NgModule({
  declarations: [],
  exports: [CommonModule, FormsModule, MaterialModule, FlexLayoutModule],
  imports: [CommonModule, FormsModule, MaterialModule, FlexLayoutModule],
})
export class SharedModule {}
