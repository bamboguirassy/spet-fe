import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { GfcWebServiceService } from './gfc-web-service.service'

@Injectable({
  providedIn: 'root'
})
export class PaiementEtudiantService {

  constructor(private gfcService: GfcWebServiceService) { }

  getStatus(inscriptionId: number, token: string): Observable<any> {
    return this.gfcService.post(`/get-paiement-details/${inscriptionId}`,null, token);
  }
}
