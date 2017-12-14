import { Component, OnDestroy, Input, Output, EventEmitter, Type, ElementRef, HostBinding, Inject } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import { ModalInstance, ModalResult } from './modal.instance';

@Component({
    selector: '[modal]',
    host: {
        'class': 'modal',
        'role': 'dialog',
        'tabindex': '-1'
    },
    template: `
        <div class="modal-dialog" [ngClass]="getCssClasses()">
            <div class="modal-content">
                <ng-content></ng-content>
            </div>
        </div>
    `
})
export class ModalComponent implements OnDestroy {

    private overrideSize: string = null;

    instance: ModalInstance;
    visible: boolean = false;

    @Input() animation: boolean = true;
    @Input() backdrop: string | boolean = true;
    @Input() keyboard: boolean = true;
    @Input() size: string;
    @Input() cssClass: string = '';

    @Output() onClose: EventEmitter<any> = new EventEmitter(false);
    @Output() onDismiss: EventEmitter<any> = new EventEmitter(false);
    @Output() onOpen: EventEmitter<any> = new EventEmitter(false);

    @HostBinding('class.fade') get fadeClass(): boolean {
        return this.animation;
    }

    @HostBinding('attr.data-keyboard') get dataKeyboardAttr(): boolean {
        return this.keyboard;
    }

    @HostBinding('attr.data-backdrop') get dataBackdropAttr(): string | boolean {
        return this.backdrop;
    }

    constructor(private element: ElementRef) {
        this.instance = new ModalInstance(this.element);

        this.instance.hidden.subscribe((result) => {
            this.visible = this.instance.visible;
            if (result === ModalResult.Dismiss) {
                this.onDismiss.emit(undefined);
            }
        });

        this.instance.shown.subscribe(() => {
            this.onOpen.emit(undefined);
        });
    }

    ngOnDestroy() {
        return this.instance && this.instance.destroy();
    }

    routerCanDeactivate(): any {
        return this.ngOnDestroy();
    }

    open(size?: string): Observable<void> {
        if (ModalSize.validSize(size)) this.overrideSize = size;
        return this.instance.open().map(() => {
            this.visible = this.instance.visible;
        });
    }

    close(value: any = ''): Observable<void> {
        this.onClose.emit(value);
        return this.instance.close();
    }

    dismiss(): Observable<void> {
        return this.instance.dismiss();
    }

    getCssClasses(): string {
        let classes: string[] = [];

        if (this.isSmall()) {
            classes.push('modal-sm');
        }

        if (this.isLarge()) {
            classes.push('modal-lg');
        }

        if (this.cssClass !== '') {
            classes.push(this.cssClass);
        }

        return classes.join(' ');
    }

    private isSmall() {
        return this.overrideSize !== ModalSize.Large
            && this.size === ModalSize.Small
            || this.overrideSize === ModalSize.Small;
    }

    private isLarge() {
        return this.overrideSize !== ModalSize.Small
            && this.size === ModalSize.Large
            || this.overrideSize === ModalSize.Large;
    }
}

export class ModalSize {
    static Small = 'sm';
    static Large = 'lg';

    static validSize(size: string) {
        return size && (size === ModalSize.Small || size === ModalSize.Large);
    }
}


@Component({
    selector: 'modal-header',
    template: `
        <div class="modal-header">
            <button *ngIf="showClose" type="button" class="close" data-dismiss="modal" aria-label="Close" (click)="modal.dismiss()">
                <span aria-hidden="true">&times;</span>
            </button>
            <ng-content></ng-content>
        </div>
    `
})
export class ModalHeaderComponent {
    @Input('show-close') showClose: boolean = false;
}


@Component({
    selector: 'modal-body',
    template: `
        <div class="modal-body">
            <ng-content></ng-content>
        </div>
    `
})
export class ModalBodyComponent {
}


@Component({
    selector: 'modal-footer',
    template: `
        <div class="modal-footer">
            <ng-content></ng-content>
            <button *ngIf="showDefaultButtons" type="button" class="btn btn-default" data-dismiss="modal" (click)="modal.dismiss()">{{dismissButtonLabel}}</button>
            <button *ngIf="showDefaultButtons" type="button" class="btn btn-primary" (click)="modal.close()">{{closeButtonLabel}}</button>
        </div>
    `
})
export class ModalFooterComponent {
    @Input('show-default-buttons') showDefaultButtons: boolean = false;
    @Input('dismiss-button-label') dismissButtonLabel: string = 'Dismiss';
    @Input('close-button-label') closeButtonLabel: string = 'Close';
    constructor(private modal: ModalComponent) { }
}

