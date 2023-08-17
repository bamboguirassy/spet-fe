import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { GfcWebServiceService } from './gfc-web-service.service'
import { TokenManagerService } from 'src/app/shared/services/token-manager.service';


@Injectable({
  providedIn: 'root'
})
export class PaiementEtudiantService {

  constructor(private gfcService: GfcWebServiceService, private tokenManager: TokenManagerService,) { }

  getStatus(inscriptionId: number): Observable<any> {
    const requestData = {
      token: this.tokenManager.getToken()
    };
    
    return this.gfcService.post(`/get-paiement-details/${inscriptionId}`,requestData, this.tokenManager.getToken());
  }

  getPayments(inscriptionId: number): Observable<any> {
    const requestData = {
      token: this.tokenManager.getToken()
    };
    return this.gfcService.post(`/get-paiements/${inscriptionId}`,requestData, this.tokenManager.getToken());
  }

  getReclamations(inscriptionId: number): Observable<any> {
    const requestData = {
      token: this.tokenManager.getToken()
    };
    return this.gfcService.post(`/reclamation/${inscriptionId}/inscription`,requestData, this.tokenManager.getToken());
  }
}
