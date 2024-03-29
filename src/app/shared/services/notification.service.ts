import { Injectable, Injector } from '@angular/core';
import { MessageService } from 'primeng/api';

@Injectable({
  providedIn: 'root'
})
export class NotificationService {

  constructor(private injector: Injector) { }

  public get messageService(): MessageService {
    return this.injector.get(MessageService);
  }

  showError(message: any){
    this.messageService.add({ severity: 'error', summary: 'Danger', detail: message });
  }
  
  showSuccess(message: any){
    this.messageService.add({ severity: 'success', summary: 'Succès !', detail: message });
  }

  showInfo(message: any){
    this.messageService.add({ severity: 'info', summary: 'Information', detail: message });
  }

  showWarning(message: any){
    this.messageService.add({ severity: 'warn', summary: 'Attention', detail: message });
  }
}
