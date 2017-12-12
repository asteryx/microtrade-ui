import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ModalComponent, ModalHeaderComponent, ModalBodyComponent, ModalFooterComponent } from './modal.component';
// import { AutofocusDirective } from './directives/autofocus';

export * from './modal.component';
export * from './modal.instance';

@NgModule({
    imports: [
        CommonModule
    ],
    declarations: [
        ModalComponent,
        ModalHeaderComponent,
        ModalBodyComponent,
        // AutofocusDirective,
        ModalFooterComponent
        
    ],
    exports: [
        ModalComponent,
        ModalHeaderComponent,
        ModalBodyComponent,
        // AutofocusDirective,
        ModalFooterComponent,
    ]
})
export class ModalModule {
}
