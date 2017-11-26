import { Injectable } from "@angular/core";
import { Observable, BehaviorSubject } from "rxjs/Rx";


interface Message {
    channel: string;
    data: any;
}


@Injectable()
export class MessagingService {
    private message$: BehaviorSubject<Message>

    constructor(){
        this.message$ = new BehaviorSubject<Message>({channel: '', data: ''});
    }

    public publish<T>(message: T): void {
      let channel: any = '';
      if (message != null){
        channel = (<any>message.constructor).name;
      }
      this.message$.next({ channel: channel, data: message || ''});
    }

    public of<T>(messageType: { new(...args: any[]): T }): Observable<T> {
        const channel = (<any>messageType).name;
        return this.message$.filter(m => m.channel === channel).map(m => m.data);
    }
}
