import { ElementRef } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/observable/fromEvent';

declare var jQuery: any;

export class ModalInstance {

    private suffix: string = '.app';
    private shownEventName: string = 'shown.bs.modal' + this.suffix;
    private hiddenEventName: string = 'hidden.bs.modal' + this.suffix;
    private $modal: any;

    shown: Observable<void>;
    hidden: Observable<ModalResult>;
    result: any;
    visible: boolean = false;

    constructor(private element: ElementRef) {
        this.init();
    }

    private init() {
        this.$modal = jQuery(this.element.nativeElement);
        // this.$modal.appendTo('body');

        this.shown = Observable.fromEvent(this.$modal, this.shownEventName)
            .map(() => {
                this.visible = true;
            });

        this.hidden = Observable.fromEvent(this.$modal, this.hiddenEventName)
            .map(() => {
                let result = (!this.result || this.result === ModalResult.None)
                    ? ModalResult.Dismiss : this.result;

                this.result = ModalResult.None;
                this.visible = false;

                return result;
            });
    }

    open(): Observable<any> {
        return this.show();
    }

    close(): Observable<any> {
        this.result = ModalResult.Close;
        return this.hide();
    }

    dismiss(): Observable<any> {
        this.result = ModalResult.Dismiss;
        return this.hide();
    }

    destroy(): Observable<any> {
        return this.hide().map(() => {
            if (this.$modal) {
                this.$modal.data('bs.modal', null);
                this.$modal.remove();
            }
        });
    }

    private show() {
        this.resetData();
        this.$modal.modal();
        return this.shown;
    }

    private hide(): Observable<ModalResult> {
        if (this.$modal && this.visible) {
            this.$modal.modal('hide');
            return this.hidden;
        }
        return Observable.create(this.result);
    }


    private resetData() {
        this.$modal.removeData();
        this.$modal.data('backdrop', booleanOrValue(this.$modal.attr('data-backdrop')));
        this.$modal.data('keyboard', booleanOrValue(this.$modal.attr('data-keyboard')));
    }
}

function booleanOrValue(value:any) {
    if (value === 'true')
        return true;
    else if (value === 'false')
        return false;
    return value;
}

export enum ModalResult {
    None,
    Close,
    Dismiss
}
