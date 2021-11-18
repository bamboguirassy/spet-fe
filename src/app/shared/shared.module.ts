import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ClonablePipe } from './pipes/clonable.pipe';
import { EditablePipe } from './pipes/editable.pipe';
import { CreablePipe } from './pipes/creable.pipe';
import { ListablePipe } from './pipes/listable.pipe';
import { ShowablePipe } from './pipes/showable.pipe';
import { DeletablePipe } from './pipes/deletable.pipe';
import { TypedocumentPipe } from './pipes/typedocument.pipe';
import { SafeUrlPipe } from './pipes/safe-url.pipe';


@NgModule({
  declarations: [
    ClonablePipe,
    EditablePipe,
    CreablePipe,
    ListablePipe,
    ShowablePipe,
    DeletablePipe,
    SafeUrlPipe,
    TypedocumentPipe,
  ],
  imports: [
    CommonModule
  ],
  exports: [
    ClonablePipe,
    EditablePipe,
    CreablePipe,
    ListablePipe,
    ShowablePipe,
    DeletablePipe,
    TypedocumentPipe,
    SafeUrlPipe,
  ]
})
export class SharedModule { }
