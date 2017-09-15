import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import * as socketIo from 'socket.io-client';

@Injectable()
export class MonitorService {

  private monitor: any;

  constructor() { 
    console.log('Construct services')
    this.monitor = this.getSocket();
  }

  private getSocket(): any {
    if (this.monitor) {
      return this.monitor;
    }

    return socketIo('http://localhost:3000');
  }

  public onCPUData(): Observable<any> {
    return new Observable(observer => {
      this.monitor.on('cpu:data', (data) => {
        observer.next(data);
      })
    })
  }

  public totalMemory(): Observable<any> {
    return new Observable(observer => {
      this.monitor.on('totalMemory:data', (totalMemory) => {
        observer.next(totalMemory);
      })
    })
  }
}
