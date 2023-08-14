import { Injectable } from '@angular/core';
import { GfcWebServiceService } from './gfc-web-service.service';
import { TokenManagerService } from 'src/app/shared/services/token-manager.service';

@Injectable({
  providedIn: 'root'
})
export class PaiementTemporaireService {


  constructor(private webService: GfcWebServiceService, private tokenManager: TokenManagerService) { }

  public getDetailsTransactionEnCours(numero_transaction: string): Promise<any> {
    const endpoint = `/etudiant/transaction-en-cours/${numero_transaction}`;
    const token = this.tokenManager.getToken();
    const data = { token: token }; 

    return this.webService.post(endpoint, data).toPromise();
  }

}


