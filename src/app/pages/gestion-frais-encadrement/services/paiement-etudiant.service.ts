import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { GfcWebServiceService } from './gfc-web-service.service'
import { TokenManagerService } from 'src/app/shared/services/token-manager.service';


@Injectable({
  providedIn: 'root'
})
export class PaiementEtudiantService {

  constructor(private gfcService: GfcWebServiceService, private tokenManager: TokenManagerService,) { }

  inscriptionId: number = 53377;
  inscriptionI: number = 28732;
  token: string;

  getStatus(): Observable<any> {
    this.token = this.tokenManager.getToken()
    const requestData = {
      token: this.token
    };
    
    return this.gfcService.post(`/get-paiement-details/${this.inscriptionId}`,requestData, this.token);
  }

  getPayments(): Observable<any> {
    const requestData = {
      token: this.token
    };
    return this.gfcService.post(`/get-paiements/${this.inscriptionId}`,requestData, this.token)
  }

  getReclamations(): Observable<any> {
    const requestData = {
      token: this.token
    };
    return this.gfcService.post(`/reclamation/${this.inscriptionI}/inscription`,requestData, this.token)
  }
}
