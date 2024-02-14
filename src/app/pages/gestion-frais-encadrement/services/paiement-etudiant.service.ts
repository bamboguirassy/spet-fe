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

    return this.gfcService.post(`/get-paiement-details/${inscriptionId}`, requestData, this.tokenManager.getToken());
  }

  getPayments(inscriptionId: number): Observable<any> {
    const requestData = {
      token: this.tokenManager.getToken()
    };
    return this.gfcService.post(`/get-paiements/${inscriptionId}`, requestData, this.tokenManager.getToken());
  }

  getReclamations(inscriptionId: number): Observable<any> {
    const requestData = {
      token: this.tokenManager.getToken()
    };
    return this.gfcService.post(`/reclamation/${inscriptionId}/inscription`, requestData, this.tokenManager.getToken());
  }

  /**
   * Author: Moussa FOFANA
   * Date: 17/08/2023
   */
  initPayment({ inscription_id, montant, token }): Observable<any> {
    const requestData = {
      token: this.tokenManager.getToken(),
      inscription_id,
      montant
    };
    return this.gfcService.post(`/init-payment`, requestData, this.tokenManager.getToken());
  }
  soumettreReclamation(transaction_number: string, motifReclamation: string): Observable<any> {
    console.log('motif:', motifReclamation);
    console.log('transaction_number:', transaction_number);
    const requestData = {
      token: this.tokenManager.getToken(),
      motif_reclamation: motifReclamation
    }
    return this.gfcService.post(`/reclamation/${transaction_number}`, requestData, this.tokenManager.getToken());
  }
}
